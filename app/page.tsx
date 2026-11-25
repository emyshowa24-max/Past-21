import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";

export const revalidate = 0;
export default async function Home() {
  const { data } = await supabase.from("products").select("*").eq("is_published", true).order("created_at", { ascending: false });
  const products = (data || []) as Product[];
  return <main className="shell">
    <div className="topline"><span>Past 21 ®</span><span>Independent clothing / Botswana</span><span>Est. 2021</span></div>
    <header className="header"><Link className="wordmark" href="/">PAST 21</Link><nav className="navlinks"><Link href="/#shop">Shop</Link><Link href="/#about">About</Link><Link href="/cart">Bag <span id="cart-count"></span></Link></nav></header>
    <section className="hero"><h1>THE SPACE<br/>TO BECOME.</h1><p className="hero-note">A quiet study of identity, self-forgiveness and everything that comes after.</p></section>
    <div className="sectionhead" id="shop"><span>01 / Latest pieces</span><span>{products.length} pieces</span></div>
    {products.length ? <div className="grid">{products.map(p=><Link href={`/products/${p.slug}`} key={p.id}><div className="product-image">{p.images?.[0] ? <img src={p.images[0]} alt={p.name}/> : <span className="placeholder">Past 21 / Product image</span>}</div><div className="product-meta"><span>{p.name}</span><span className="price">{p.price.toFixed(2)} {process.env.NEXT_PUBLIC_STORE_CURRENCY || "USD"}</span></div></Link>)}</div> : <div className="notice">The collection is being prepared. New pieces will appear here.</div>}
    <section id="about" style={{padding:"90px 0",maxWidth:620}}><div className="eyebrow">02 / About Past 21</div><h2 style={{fontSize:"clamp(32px,6vw,66px)",fontWeight:500,letterSpacing:"-.07em",lineHeight:.98}}>A blank page is not an absence. It is a beginning.</h2><p style={{fontSize:13,lineHeight:1.8,color:"var(--muted)"}}>Past 21 explores the quiet strength found in solitude, becoming and the process of meeting yourself again.</p></section>
    <footer className="footer"><span>© 2026 Past 21 Clothing</span><span>Quietness / Boldness</span><span><a href="https://wa.me/{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}">WhatsApp</a></span></footer>
  </main>;
}
