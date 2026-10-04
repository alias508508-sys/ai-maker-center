import { useEffect, useState } from "react";
import { useRevalidator } from "react-router";
import type { Route } from "./+types/submissions";
import { adminGet } from "../../lib/admin.server";
import { useAdminAction } from "../../features/admin/action";
import { AdminPage, Button, Card, Field, Input, Select, Textarea } from "../../features/admin/ui";

type Row = { id: string; kind: string; title: string; url: string; status: string; result_url: string | null; error: string | null };
export async function loader({ request }: Route.LoaderArgs) { return adminGet<{rows: Row[]}>(request, "/api/admin/submissions"); }
const statuses: Record<string,string> = { queued: "排队中", processing: "采集与整理中", published: "已发布", failed: "未发布，请检查" };

async function photo(file: File): Promise<string> {
  if (!["image/png","image/jpeg","image/webp"].includes(file.type) || file.size > 12 * 1024 * 1024) throw new Error("图片请使用 12MB 以内的 PNG、JPEG 或 WebP");
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close();
  const result = canvas.toDataURL("image/webp", .8);
  if (result.length > 900000) throw new Error("图片压缩后仍过大，请使用较小图片");
  return result;
}
export default function Submissions({ loaderData }: Route.ComponentProps) {
  const { run, busy } = useAdminAction(); const revalidator = useRevalidator();
  const [form, setForm] = useState({kind:"link",url:"",title:"",body:"",category:"auto"});
  const [images,setImages] = useState<string[]>([]); const [error,setError] = useState(""); const [uploading,setUploading] = useState(false);
  useEffect(() => {
    if (!loaderData.rows.some(r => ["queued","processing"].includes(r.status))) return;
    const timer = setInterval(() => { if (document.visibilityState === "visible" && revalidator.state === "idle") revalidator.revalidate(); }, 10000);
    return () => clearInterval(timer);
  }, [loaderData.rows,revalidator]);
  return <AdminPage title="投稿与发布" subtitle="提交链接自动采集，或发布自己的文章。AI 整理摘要与分类；提交即授权直接发布。通常几分钟内完成，不必等每 6 小时采集。">
    <Card title="新增投稿"><form className="grid gap-4" onSubmit={async e => { e.preventDefault(); setError(""); const result = await run("POST","/api/admin/submissions",{...form,images},{success:"已保存投稿，正在排队处理"}); if(result){setForm({...form,url:"",title:"",body:""});setImages([]);} }}>
      <Field label="投稿方式"><Select value={form.kind} onChange={e=>setForm({...form,kind:e.target.value})}><option value="link">链接采集</option><option value="article">自己写文章</option></Select></Field>
      {form.kind === "link" ? <Field label="文章链接"><Input type="url" required value={form.url} onChange={e=>setForm({...form,url:e.target.value})} placeholder="https://…" /></Field> : <><Field label="文章标题"><Input required maxLength={300} value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></Field><Field label="正文" hint="按空行分段，保留你的原文；AI 只生成摘要和分类"><Textarea required minLength={20} maxLength={50000} rows={12} value={form.body} onChange={e=>setForm({...form,body:e.target.value})}/></Field></>}
      <Field label="分类"><Select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option value="auto">AI 自动分类</option><option value="ai-products">设计工具</option><option value="industry">创新案例</option><option value="tip">教育实践</option><option value="opinion">观点</option></Select></Field>
      <Field label="配图（可选，最多 6 张）" hint="第一张作为资讯封面；自己的文章会在正文后显示全部配图。无图片时只显示文字。"><input type="file" accept="image/png,image/jpeg,image/webp" multiple disabled={busy||uploading} onChange={async e=>{setError("");setUploading(true);try{const files=[...e.target.files??[]];if(files.length>6)throw new Error("最多选择 6 张图片");setImages(await Promise.all(files.map(photo)));}catch(x){setError((x as Error).message);}finally{e.target.value="";setUploading(false);}}}/>{images.length>0&&<div className="flex flex-wrap gap-2">{images.map((src,i)=><img key={i} src={src} alt={`配图 ${i+1}`} className="h-20 w-28 object-cover"/>)}<button type="button" onClick={()=>setImages([])}>清除配图</button></div>}</Field>
      {error&&<p role="alert">{error}</p>}<Button type="submit" tone="primary" busy={busy||uploading}>保存并直接发布</Button>
    </form></Card>
    <div className="mt-6"><Card title="最近投稿"><div className="space-y-4">{loaderData.rows.length===0&&<p>暂无投稿。</p>}{loaderData.rows.map(r=><div key={r.id} className="border-b border-line pb-4"><strong className="break-all">{r.title||r.url}</strong><p>{statuses[r.status]||r.status}</p>{r.error&&<p role="alert" className="text-hot">{r.error}</p>}{r.result_url&&<a className="text-accent underline" href={r.result_url} target="_blank" rel="noopener noreferrer">查看已发布内容 ↗</a>}</div>)}</div></Card></div>
  </AdminPage>;
}
