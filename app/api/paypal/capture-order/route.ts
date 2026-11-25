import {NextResponse} from "next/server";
import {createClient} from "@supabase/supabase-js";
const base=process.env.PAYPAL_MODE==="live"?"https://api-m.paypal.com":"https://api-m.sandbox.paypal.com";
async function getToken(){const auth=Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64");const r=await fetch(`${base}/v1/oauth2/token`,{method:"POST",headers:{Authorization:`Basic ${auth}`,"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=client_credentials",cache:"no-store"});const j=await r.json();if(!r.ok)throw new Error(j.error_description||"PayPal authentication failed");return j.access_token}
export async function POST(req:Request){try{
 const {orderID}=await req.json();if(!orderID)throw new Error("Missing PayPal order ID.");
 const access=await getToken();const r=await fetch(`${base}/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`,{method:"POST",headers:{Authorization:`Bearer ${access}`,"Content-Type":"application/json"},cache:"no-store"});const result=await r.json();
 if(!r.ok)throw new Error(result.message||"Payment capture failed.");
 const unit=result.purchase_units?.[0];const capture=unit?.payments?.captures?.[0];
 if(result.status!=="COMPLETED"||!capture)throw new Error("PayPal has not confirmed a completed payment.");
 const admin=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!);
 const {error}=await admin.from("orders").insert({customer_email:result.payer?.email_address||null,total:Number(capture.amount.value),currency:capture.amount.currency_code,status:"paid",paypal_order_id:orderID});
 if(error)throw error;
 return NextResponse.json({status:"COMPLETED",email:result.payer?.email_address||null});
 }catch(e:any){return NextResponse.json({error:e.message||"Could not complete payment."},{status:400})}}
