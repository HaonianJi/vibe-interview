import { NextRequest, NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN!;
const NOTION_DB_ID = process.env.NOTION_DB_ID!;

export async function POST(req: NextRequest) {
  try {
    const { name, email, field, github, repoUrl, question, notes } = await req.json();

    if (!name || !email || !repoUrl || !question) {
      return NextResponse.json(
        { error: "Name, email, repo URL, and question are required" },
        { status: 400 },
      );
    }

    const githubRepoRegex = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(\.git)?$/;
    if (!githubRepoRegex.test(repoUrl)) {
      return NextResponse.json(
        { error: "Please enter a valid GitHub repository URL" },
        { status: 400 },
      );
    }

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB_ID },
        properties: {
          "Name": { title: [{ text: { content: name } }] },
          "Email": { email: email },
          "Field": { rich_text: [{ text: { content: field || "" } }] },
          "GitHub": { rich_text: [{ text: { content: github || "" } }] },
          "RepoUrl": { rich_text: [{ text: { content: repoUrl } }] },
          "QuestionId": { rich_text: [{ text: { content: question } }] },
          "Track": { select: { name: question === "16-research-field-navigator" ? "advanced" : "basic" } },
          "Status": { select: { name: "submitted" } },
          "Time": { date: { start: new Date().toISOString() } },
          "Token": { rich_text: [{ text: { content: notes || "" } }] },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Notion error:", err);
      return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Internal error" },
      { status: 500 },
    );
  }
}
