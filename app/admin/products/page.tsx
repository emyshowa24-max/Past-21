 "use client";
import {useEffect,useState} from "react";import {supabase} from "@/lib/supabase";
export default function ProductsAdmin(){const [rows,setRows]=useState<any[]>([]);const [msg,setMsg]=useState("");
 async function load(){const {data,error}=await supabase.from("products").select("*").order("created_at",{ascending:false});if(error)setMsg(error.message);else setRows(data||[])}
 useEffect(()=>{load()},[]);
 async function remove(id:string){if(!confirm("Delete this product?"))return;const {error}=await supabase.from("products").delete().eq("id",id);setMsg(error?.message||"Product deleted");load()}
 return <main className="shell"><header className="header"><a className="wordmark" href="/">PAST 21</a><a className="navlinks" href="/admin">Admin</a></header><section className="page"><div className="sectionhead"><span>Product catalogue</span><a className="btn" href="/admin/products/new">Add product +</a></div>{msg&&<p className="notice">{msg}</p>}<table className="table"><thead><tr><th>Product</th><th>Price</th><th>Stock</th><th>Status</th><th></th></tr></thead><tbody>{rows.map(p=><tr key={p.id}><td>{p.name}</td><td>{p.price}</td><td>{p.stock}</td><td>{p.is_published?"Published":"Draft"}</td><td><a href={`/admin/products/${p.id}`}>Edit</a> · <button onClick={()=>remove(p.id)}>Delete</button></td></tr>)}</tbody></table></section></main>
}
