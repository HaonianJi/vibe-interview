export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, field, track, github, time } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  try {
    const notionRes = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_DB_ID },
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
      return res.status(500).json({ error: "Failed to save to Notion" });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({ error: e.message });
  }
}
