/* Veliner Content OS — lógica v1 (sin IA real todavía)
- Genera calendario 1 mes (3 posts/semana = 12 posts/mes aprox)
- Genera guiones base (plantillas virales)
- Métricas: checklist + recomendaciones
*/

const $ = (sel) => document.querySelector(sel);

function pad(n){ return String(n).padStart(2,'0'); }

function monthNameES(m){
return ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][m];
}

function weekdayES(d){
return ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"][d];
}

function randPick(arr){
return arr[Math.floor(Math.random()*arr.length)];
}

function slugify(str){
return (str||"").toLowerCase().replace(/[^\w\s-]/g,'').trim().replace(/\s+/g,'-');
}

/* ====== CONTENIDO BASE (editable) ====== */
const HOOKS = [
"Si estás haciendo esto, estás tirando el dinero…",
"Nadie te lo dice, pero esto es lo que convierte de verdad:",
"3 errores que están matando tus ventas en redes (y cómo arreglarlos)",
"Esto es lo que hago para que parezca orgánico (y venda)",
"Si tu contenido no retiene en los primeros 2 segundos, pierde.",
"Lo que haría si empezase desde 0 esta semana:",
];

const FORMATOS = [
"UGC Testimonial (antes/después + prueba real)",
"POV / Situación real + solución",
"Lista rápida (3 tips) con ejemplo",
"Storytime (problema → giro → aprendizaje)",
"Comparativa (A vs B) + por qué",
"Tutorial corto (pasos 1-2-3)",
];

const CTAS = [
"¿Quieres que te lo adapte a tu marca? Escríbeme “VELINER”.",
"Comenta “PLANTILLA” y te paso el guion.",
"Guárdalo para cuando vayas a grabar.",
"Si quieres el calendario completo, dime tu @.",
"¿Lo aplico a tu caso? Deja tu sector abajo.",
];

const PILARES = [
{ key:"ventas", label:"Ventas sin parecer anuncio" },
{ key:"ugc", label:"UGC que genera confianza" },
{ key:"viral", label:"Hooks + formatos virales" },
{ key:"marca", label:"Marca/Posicionamiento" },
];

/* ====== CALENDARIO ====== */
function buildMonthPlan({handle="@velinerugc", postsPerWeek=3}){
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth(); // mes actual
const daysInMonth = new Date(year, month+1, 0).getDate();

// Elegimos 3 días/semana típicos: Lun-Mié-Vie (puedes cambiar)
const targetWeekdays = postsPerWeek === 2 ? [1,4] : postsPerWeek === 4 ? [1,3,5,6] : [1,3,5];

const items = [];
for(let day=1; day<=daysInMonth; day++){
const d = new Date(year, month, day);
const wd = d.getDay();
if(targetWeekdays.includes(wd)){
const pilar = randPick(PILARES);
const formato = randPick(FORMATOS);
const hook = randPick(HOOKS);
const cta = randPick(CTAS);

items.push({
date: `${pad(day)}/${pad(month+1)}/${year}`,
wd: weekdayES(wd),
pilar: pilar.label,
formato,
hook,
cta,
handle
});
}
}

// Ajuste a ~12 posts/mes si se pasó
// (con 3/semana normalmente salen 12-13 según mes)
if(postsPerWeek===3 && items.length>12){
items.length = 12;
}

return {
title: `${monthNameES(month)} ${year}`,
items
};
}

function renderCalendar(plan){
const wrap = $("#calendarWrap");
if(!wrap) return;

wrap.innerHTML = `
<div class="card">
<div class="row-between">
<div>
<div class="chip">📅 Calendario mensual</div>
<h2>${plan.title}</h2>
<p class="muted">Cuenta: <strong>${escapeHtml(plan.items[0]?.handle || "@velinerugc")}</strong> · ${plan.items.length} publicaciones</p>
</div>
<button class="btn btn-soft" id="btnCopyCalendar">Copiar todo</button>
</div>

<div class="table">
<div class="t-head">
<div>Fecha</div><div>Pilar</div><div>Formato</div><div>Hook</div><div>CTA</div>
</div>
${plan.items.map(it=>`
<div class="t-row">
<div><span class="tag">${it.wd}</span> ${it.date}</div>
<div>${escapeHtml(it.pilar)}</div>
<div>${escapeHtml(it.formato)}</div>
<div>${escapeHtml(it.hook)}</div>
<div>${escapeHtml(it.cta)}</div>
</div>
`).join("")}
</div>

<div class="sep"></div>
<div class="hint">
<strong>Tip:</strong> Graba en batch 1 día/semana. 12 vídeos → 12 publicaciones listas.
</div>
</div>
`;

$("#btnCopyCalendar")?.addEventListener("click", ()=>{
const text = plan.items.map(it =>
`${it.date} (${it.wd}) | ${it.pilar} | ${it.formato}\nHOOK: ${it.hook}\nCTA: ${it.cta}\n`
).join("\n");
copy(text);
toast("Calendario copiado ✅");
});
}

/* ====== GUIONES ====== */
function buildScripts({handle="@velinerugc", n=10}){
const scripts = [];
for(let i=0;i<n;i++){
const formato = randPick(FORMATOS);
const hook = randPick(HOOKS);
const cta = randPick(CTAS);
const pilar = randPick(PILARES).label;

scripts.push({
title: `${pilar} · ${formato}`,
hook,
estructura: [
"0-2s: Hook (frase literal en pantalla)",
"2-6s: Problema real (1 frase)",
"6-18s: Solución (2-3 bullets con ejemplo)",
"18-24s: Prueba / razón (por qué funciona)",
"24-30s: CTA (comentario/DM/guardar)"
],
texto: [
`HOOK: "${hook}"`,
`PROBLEMA: "A la gente le gusta tu contenido, pero no te compra porque suena a anuncio."`,
`SOLUCIÓN: "Hazlo en 3 pasos: (1) muestra la situación real, (2) enseña el cambio, (3) remata con una frase de confianza."`,
`PRUEBA: "Cuando enseñas el proceso, sube la retención y la intención de compra."`,
`CTA: "${cta}"`
],
handle
});
}
return scripts;
}

function renderScripts(list){
const wrap = $("#scriptsWrap");
if(!wrap) return;

wrap.innerHTML = `
<div class="card">
<div class="row-between">
<div>
<div class="chip">🎬 Guiones virales</div>
<h2>Guiones listos para grabar</h2>
<p class="muted">Plantillas enfocadas en retención + conversión (sin IA real aún).</p>
</div>
<button class="btn btn-soft" id="btnCopyScripts">Copiar todos</button>
</div>

<div class="grid">
${list.map((s,idx)=>`
<div class="mini">
<div class="mini-top">
<div class="mini-title">${escapeHtml(s.title)}</div>
<button class="btn btn-ghost" data-copy="${idx}">Copiar</button>
</div>

<div class="mini-body">
<div class="tag-row">
<span class="tag">IG</span>
<span class="tag">TikTok</span>
<span class="tag">${escapeHtml(s.handle)}</span>
</div>

<p><strong>Hook:</strong> ${escapeHtml(s.hook)}</p>

<div class="muted" style="margin-top:10px"><strong>Estructura:</strong></div>
<ul>
${s.estructura.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}
</ul>

<div class="muted" style="margin-top:10px"><strong>Texto listo:</strong></div>
<pre class="pre">${escapeHtml(s.texto.join("\n"))}</pre>
</div>
</div>
`).join("")}
</div>
</div>
`;

wrap.querySelectorAll("[data-copy]").forEach(btn=>{
btn.addEventListener("click", ()=>{
const idx = Number(btn.getAttribute("data-copy"));
const s = list[idx];
const text = `${s.title}\n\n${s.texto.join("\n")}\n\nEstructura:\n- ${s.estructura.join("\n- ")}`;
copy(text);
toast("Guion copiado ✅");
});
});

$("#btnCopyScripts")?.addEventListener("click", ()=>{
const text = list.map(s=>`${s.title}\n${s.texto.join("\n")}\n`).join("\n---\n\n");
copy(text);
toast("Guiones copiados ✅");
});
}

/* ====== MÉTRICAS (sin conectar a IG aún) ====== */
function renderMetrics(){
const wrap = $("#metricsWrap");
if(!wrap) return;

wrap.innerHTML = `
<div class="card">
<div class="chip">📈 Métricas</div>
<h2>Checklist semanal (lo que sí importa)</h2>
<p class="muted">Aquí aún no “lee” Instagram/TikTok. Es un panel de control para que tomes decisiones rápidas.</p>

<div class="grid2">
<div class="mini">
<div class="mini-title">Retención (Reels/TikTok)</div>
<ul>
<li>Hook claro en 0-2s</li>
<li>Cortes cada 1.5-2.5s</li>
<li>Texto en pantalla siempre</li>
<li>Final con “micro recompensa”</li>
</ul>
</div>

<div class="mini">
<div class="mini-title">Conversión</div>
<ul>
<li>CTA simple (comenta/DM/guardar)</li>
<li>Oferta clara sin sonar a anuncio</li>
<li>Prueba social (caso/resultado/testimonio)</li>
<li>Link/DM con palabra clave</li>
</ul>
</div>

<div class="mini">
<div class="mini-title">Frecuencia</div>
<ul>
<li>3 posts/semana (mínimo)</li>
<li>Stories casi diario</li>
<li>1 vídeo “hero”/semana</li>
<li>Reutiliza en IG + TikTok</li>
</ul>
</div>

<div class="mini">
<div class="mini-title">Acciones IA (próximo paso)</div>
<ul>
<li>Conectar métricas reales vía API</li>
<li>Detectar tops por retención</li>
<li>Repetir formato ganador</li>
<li>Generar calendario automático</li>
</ul>
</div>
</div>

<div class="sep"></div>
<div class="hint">
<strong>Objetivo:</strong> que cada semana puedas decidir: “repito este formato” o “cambio el hook”.
</div>
</div>
`;
}

/* ====== UTILIDADES ====== */
function escapeHtml(str){
return String(str || "")
.replaceAll("&","&amp;")
.replaceAll("<","&lt;")
.replaceAll(">","&gt;")
.replaceAll('"',"&quot;")
.replaceAll("'","&#039;");
}

function copy(text){
navigator.clipboard?.writeText(text).catch(()=>{
const ta = document.createElement("textarea");
ta.value = text;
document.body.appendChild(ta);
ta.select();
document.execCommand("copy");
ta.remove();
});
}

function toast(msg){
const t = document.createElement("div");
t.className = "toast";
t.textContent = msg;
document.body.appendChild(t);
setTimeout(()=> t.classList.add("show"), 10);
setTimeout(()=> {
t.classList.remove("show");
setTimeout(()=> t.remove(), 250);
}, 1600);
}

/* ====== INIT POR PÁGINA ====== */
document.addEventListener("DOMContentLoaded", ()=>{
const page = document.body.getAttribute("data-page");

// Input común (handle)
const handleInput = $("#handleInput");
if(handleInput && !handleInput.value) handleInput.value = "@velinerugc";

if(page==="home"){
// Home no renderiza nada dinámico, sólo navega
$("#goCalendar")?.addEventListener("click", ()=> location.href="calendar.html");
$("#goScripts")?.addEventListener("click", ()=> location.href="scripts.html");
$("#goMetrics")?.addEventListener("click", ()=> location.href="metrics.html");
}

if(page==="calendar"){
const btn = $("#btnGenerateMonth");
const postsSel = $("#postsPerWeek");
btn?.addEventListener("click", ()=>{
const handle = handleInput?.value?.trim() || "@velinerugc";
const postsPerWeek = Number(postsSel?.value || 3);
const plan = buildMonthPlan({handle, postsPerWeek});
renderCalendar(plan);
});

// Auto render 1 vez
const plan = buildMonthPlan({handle: handleInput?.value?.trim() || "@velinerugc", postsPerWeek: Number(postsSel?.value || 3)});
renderCalendar(plan);
}

if(page==="scripts"){
const btn = $("#btnGenerateScripts");
const qty = $("#scriptsQty");
btn?.addEventListener("click", ()=>{
const handle = handleInput?.value?.trim() || "@velinerugc";
const n = Number(qty?.value || 10);
renderScripts(buildScripts({handle, n}));
});

renderScripts(buildScripts({handle: handleInput?.value?.trim() || "@velinerugc", n: Number(qty?.value || 10)}));
}

if(page==="metrics"){
renderMetrics();
}
});
