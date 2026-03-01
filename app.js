// Veliner Content OS — Fase 1 (sin IA real aún)
// Genera calendario 4 semanas (3 posts/semana) + guiones + “métricas tipo”

function sanitizeHandle(v){
  v = (v || "").trim();
  if(!v) return "velinerugc";
  v = v.replace(/^@/,"");
  v = v.replace(/\s+/g,"");
  return v.toLowerCase();
}

function buildStrategy({type, goal}){
  // Base por tipo (marca / creador UGC)
  const base = (type === "creator")
    ? {
        pillars: ["Portafolio/Prueba social", "Educativo (cómo grabar / cómo cobrar)", "Viral (hooks + tendencias)", "Conversión (CTA a marcas)"],
        angle: "creador UGC"
      }
    : {
        pillars: ["Autoridad (marketing/UGC)", "Educativo (tips aplicables)", "Viral (ideas + formatos)", "Conversión (captación de leads)"],
        angle: "marca/estudio"
      };

  const goalTweaks = {
    grow:  {cta:"Sígueme / guarda esto", focus:"alcance y guardados"},
    sell:  {cta:"DM / link / agenda llamada", focus:"leads y conversión"},
    auth:  {cta:"Comenta tu caso", focus:"autoridad y comunidad"}
  };

  return { ...base, ...goalTweaks[goal] };
}

function monthPlan(handle, type, goal){
  const s = buildStrategy({type, goal});

  // 4 semanas x 3 posts
  const weeks = [];
  const templates = [
    {kind:"Educativo", format:"Reel", hook:"Si estás haciendo contenido y no te trae resultados, esto es lo primero que miraría…"},
    {kind:"Viral", format:"Reel", hook:"Nadie te cuenta esto (y por eso tu contenido no despega)"},
    {kind:"Conversión", format:"Reel", hook:"Si quieres resultados en redes sin parecer anuncio, haz esto:"}
  ];

  for(let w=1; w<=4; w++){
    const items = templates.map((t, idx) => {
      const pillar = s.pillars[Math.min(idx, s.pillars.length-1)];
      return {
        title: `${t.kind}: ${pillar}`,
        platform: "Instagram + TikTok",
        format: t.format,
        hook: t.hook,
        cta: s.cta,
        why: `Enfoque ${s.focus}. Estructura simple + hook fuerte para retención.`
      };
    });
    weeks.push({week:w, items});
  }

  return {handle, type, goal, strategy:s, weeks};
}

function scriptPack(handle, type, goal){
  const s = buildStrategy({type, goal});

  const scripts = [
    {
      title: "Guión 1 — Hook de dolor + solución",
      hook: "Si estás publicando y no vendes, este es el motivo real (y cómo arreglarlo).",
      body: [
        "1) Contexto (2–3s): “Yo también estaba ahí: subiendo contenido sin resultados.”",
        "2) Dolor (3–6s): “El problema NO es tu producto: es que tu contenido parece anuncio.”",
        "3) Giro (6–10s): “Lo que funciona es: prueba social + historia corta + CTA claro.”",
        "4) Mini ejemplo (10–18s): “Antes/Después + una frase de cliente.”",
        `5) CTA (18–22s): “${s.cta} y te paso la plantilla.”`
      ],
      why: "Hook directo + promesa concreta + ejemplo = retención y guardados."
    },
    {
      title: "Guión 2 — Lista rápida (formato viral)",
      hook: "3 cosas que haría HOY para crecer en Instagram/TikTok sin gastar en anuncios:",
      body: [
        "1) Repetir un formato que ya te funcionó (misma idea, nuevo ejemplo).",
        "2) Abrir con una frase polémica suave (sin ser agresivo).",
        "3) Cerrar con CTA de comentario (sube engagement).",
        `Final: “${s.cta} y te doy 12 ideas para tu cuenta.”`
      ],
      why: "Listas = consumo rápido. CTA a comentario = más distribución."
    },
    {
      title: "Guión 3 — Caso real / demostración",
      hook: "Te enseño cómo haría un vídeo UGC que vende sin parecer anuncio (en 20s).",
      body: [
        "1) Situación (0–3s): “Esto es lo que me llegó (brief).”",
        "2) Problema (3–6s): “Quieren vender, pero no quieren anuncio.”",
        "3) Solución (6–15s): “Hook + beneficio + prueba + CTA.”",
        `4) CTA (15–20s): “${s.cta} y te mando el guión exacto.”`
      ],
      why: "Demostración + velocidad = sensación de valor real."
    }
  ];

  return {handle, scripts, note:`Pack pensado para @${handle} (${type === "creator" ? "Creador UGC" : "Marca/Estudio"}).`};
}

function metricsAdvice(type, goal){
  const base = [
    {k:"Retención", v:"Si el vídeo cae en los primeros 2 segundos, cambia el hook."},
    {k:"Guardados", v:"Los educativos con checklists suelen guardar más."},
    {k:"Comentarios", v:"Preguntas cerradas y CTA a opinar suben interacción."},
    {k:"Conversión", v:"CTA simple: DM con palabra clave (ej: “UGC”)."}
  ];

  if(type === "creator"){
    base.push({k:"Portfolio", v:"Publica 1 caso/semana: problema → vídeo → resultado esperado."});
  } else {
    base.push({k:"Leads", v:"1 post/semana con oferta clara: auditoría / llamada / brief."});
  }

  if(goal === "sell"){
    base.push({k:"Foco ventas", v:"Prioriza conversión: casos, resultados, CTA a DM o link."});
  }

  return base;
}

// RENDER helpers
function el(q){return document.querySelector(q);}
function escapeHtml(s){
  return (s||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

window.VelinerOS = {
  sanitizeHandle, monthPlan, scriptPack, metricsAdvice
};
