/**
 * Cloudflare Worker: Notion Registration Proxy
 *
 * Deploy to Cloudflare Workers (free tier).
 * Set these environment variables in Cloudflare dashboard:
 *   NOTION_TOKEN  - Notion integration token (secret_xxx)
 *   NOTION_DB_ID  - Notion database ID
 *
 * Notion database should have these properties:
 *   Name       (title)
 *   Email      (email)
 *   Field      (rich_text)
 *   Track      (select: "basic" / "advanced")
 *   GitHub     (rich_text)
 *   Time       (date)
 *   Status     (select: "registered" / "assigned" / "submitted")
 */

export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const data = await request.json();
      const { name, email, field, track, github, time } = data;

      if (!name || !email) {
        return new Response(JSON.stringify({ error: "Name and email required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const notionRes = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parent: { database_id: env.NOTION_DB_ID },
          properties: {
            "Name": { title: [{ text: { content: name } }] },
            "Email": { email: email },
            "Field": { rich_text: [{ text: { content: field || "" } }] },
            "Track": { select: { name: track === "basic" ? "basic" : "advanced" } },
            "GitHub": { rich_text: [{ text: { content: github || "" } }] },
            "Time": { date: { start: time || new Date().toISOString() } },
            "Status": { select: { name: "registered" } },
          },
        }),
      });

      if (!notionRes.ok) {
        const err = await notionRes.text();
        console.error("Notion error:", err);
        return new Response(JSON.stringify({ error: "Failed to save" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
