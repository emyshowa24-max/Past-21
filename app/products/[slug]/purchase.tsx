 "use client";
import {useState} from "react";
export default function AddToCart({product}:{product:any}) {
 const [size,setSize]=useState(product.sizes?.[0]||"One size");
 const [qty,setQty]=useState(1);
 function add(){const cart=JSON.parse(localStorage.getItem("p21-cart")||"[]");const found=cart.find((x:any)=>x.id===product.id&&x.size===size);if(found)found.qty+=qty;else cart.push({...product,size,qty});localStorage.setItem("p21-cart",JSON.stringify(cart));alert("Added to your bag.");}
 return <div style={{display:"grid",gap:14,marginTop:28}}>{product.sizes?.length>0&&<label className="field">Select size<select value={size} onChange={e=>setSize(e.target.value)}>{product.sizes.map((s:string)=><option key={s}>{s}</option>)}</select></label>}<label className="field">Quantity<input type="number" min="1" max={Math.max(1,product.stock)} value={qty} onChange={e=>setQty(Math.max(1,Math.min(product.stock,Number(e.target.value))))}/></label><button className="btn" onClick={add} disabled={product.stock<1}>{product.stock>0?"Add to bag":"Sold out"}</button></div>;
}
