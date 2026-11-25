import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AddToCart from "./purchase";
export const revalidate = 0;
export default async function ProductPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const {data:p}=await supabase.from("products").select("*").eq("slug",slug).eq("is_published",true).single();
  if(!p) notFound();
  return <main className="shell"><header className="header"><a className="wordmark" href="/">PAST 21</a><nav className="navlinks"><a href="/#shop">Shop</a><a href="/cart">Bag</a></nav></header><div className="page product-detail"><div className="gallery">{(p.images?.length?p.images:[null]).map((src:string|null,i:number)=>src?<img key={i} src={src} alt={p.name}/>:<div className="product-image" key={i}><span className="placeholder">Product image</span></div>)}</div><div className="detail-copy"><div className="eyebrow">Past 21 / {p.category||"Collection"}</div><h1>{p.name}</h1><p className="price">{Number(p.price).toFixed(2)} {process.env.NEXT_PUBLIC_STORE_CURRENCY||"USD"}</p><p style={{fontSize:13,lineHeight:1.8,color:"var(--muted)"}}>{p.description}</p><AddToCart product={{id:p.id,name:p.name,price:Number(p.price),image:p.images?.[0]||"",sizes:p.sizes||[],stock:p.stock}}/><p className="small" style={{color:"var(--muted)",marginTop:24}}>Orders and enquiries via WhatsApp. Payment options shown at checkout.</p></div></div></main>;
}
