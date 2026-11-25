 "use client";
import {useEffect,useState} from "react";
declare global{interface Window{paypal:any}}
export default function CartClient(){
 const [items,setItems]=useState<any[]>([]);const [ready,setReady]=useState(false);
 useEffect(()=>{setItems(JSON.parse(localStorage.getItem("p21-cart")||"[]"));setReady(true)},[]);
 const total=items.reduce((s,x)=>s+x.price*x.qty,0);
 function save(next:any[]){setItems(next);localStorage.setItem("p21-cart",JSON.stringify(next))}
 const whatsapp=()=>{const n=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;const msg="Hello Past 21, I'd like to order:\\n"+items.map(x=>`${x.name} / ${x.size} x${x.qty} — ${x.price*x.qty}`).join("\\n")+`\\nTotal: ${total.toFixed(2)} ${process.env.NEXT_PUBLIC_STORE_CURRENCY||"USD"}`;window.open(`https://wa.me/${n}?text=${encodeURIComponent(msg)}`,"_blank")};
 async function paypal(){const r=await fetch("/api/paypal/create-order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:items.map(x=>({id:x.id,qty:x.qty,size:x.size}))})});const d=await r.json();if(d.url)window.location.href=d.url;else alert(d.error||"PayPal could not start.")}
 return <section className="page"><div className="eyebrow">Your selection</div><h1 style={{fontSize:48,letterSpacing:"-.08em",fontWeight:500}}>Shopping bag</h1>{!ready?<p>Loading bag…</p>:items.length===0?<div className="notice">Your bag is empty. <a href="/#shop">Explore the collection.</a></div>:<>{items.map((x,i)=><div className="cartline" key={i}><span>{x.name} / {x.size} × {x.qty}</span><span>{(x.price*x.qty).toFixed(2)}</span><button className="small" onClick={()=>save(items.filter((_,j)=>j!==i))}>Remove</button></div>)}<h2 className="price" style={{textAlign:"right",marginTop:28}}>Total: {total.toFixed(2)} {process.env.NEXT_PUBLIC_STORE_CURRENCY||"USD"}</h2><div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:24}}><button className="btn" onClick={whatsapp}>Order via WhatsApp</button><button className="btn orange" onClick={paypal}>Pay with PayPal</button></div><p className="small" style={{color:"var(--muted)"}}>PayPal checkout requires your PayPal business credentials and must be tested before going live.</p></>}</section>
}
