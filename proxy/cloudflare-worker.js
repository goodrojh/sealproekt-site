// Прокси для заявок с сайта → Битрикс24 (crm.lead.add). Вебхук хранится только здесь, в секрете воркера.
//
// Развёртывание (бесплатный тариф Cloudflare Workers):
//   1. dash.cloudflare.com → Workers & Pages → Create → Worker → вставить этот код → Deploy.
//   2. Settings → Variables → Secret: BITRIX_WEBHOOK = https://<портал>.bitrix24.ru/rest/<user>/<key>/
//   3. Адрес воркера (https://<имя>.<аккаунт>.workers.dev) указать в сайте как NEXT_PUBLIC_LEAD_ENDPOINT.

const ALLOWED_ORIGINS = ["https://goodrojh.github.io", "https://sealproekt-remont.ru", "https://www.sealproekt-remont.ru"];
// Разрешённые поля лида — всё остальное отбрасывается
const ALLOWED_FIELDS = [
  "TITLE", "NAME", "PHONE", "SOURCE_ID", "SOURCE_DESCRIPTION", "COMMENTS",
  "UF_CRM_1776744278", "UF_CRM_VOPROS", "UF_CRM_1745307554870", "UF_CRM_FORMNAME", "UF_CRM_1787727805", "UF_CRM_1779938102",
  "UTM_SOURCE", "UTM_MEDIUM", "UTM_CAMPAIGN", "UTM_CONTENT", "UTM_TERM",
];

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    if (request.method !== "POST" || !ALLOWED_ORIGINS.includes(origin)) return new Response('{"error":"forbidden"}', { status: 403, headers: cors(origin) });

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('{"error":"bad_json"}', { status: 400, headers: cors(origin) });
    }
    const src = (body && body.fields) || {};
    const phone = String(src.PHONE?.[0]?.VALUE || "").replace(/\D/g, "");
    if (phone.length !== 11) return new Response('{"error":"bad_phone"}', { status: 400, headers: cors(origin) });

    const fields = {};
    for (const k of ALLOWED_FIELDS) if (src[k] !== undefined) fields[k] = typeof src[k] === "string" ? src[k].slice(0, 2000) : src[k];

    const r = await fetch(env.BITRIX_WEBHOOK.replace(/\/?$/, "/") + "crm.lead.add.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields, params: { REGISTER_SONET_EVENT: "Y" } }),
    });
    const data = await r.json().catch(() => ({}));
    const ok = r.ok && data.result;
    return new Response(JSON.stringify(ok ? { result: data.result } : { error: "bitrix_error" }), { status: ok ? 200 : 502, headers: cors(origin) });
  },
};
