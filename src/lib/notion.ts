const NOTION_TOKEN = process.env.NOTION_TOKEN!;
const NOTION_DB_ID = process.env.NOTION_DB_ID!;
const NOTION_VERSION = "2022-06-28";

interface NotionPage {
  id: string;
  properties: Record<string, unknown>;
  created_time: string;
}

function extractText(prop: unknown): string {
  const p = prop as { type: string; title?: { plain_text: string }[]; rich_text?: { plain_text: string }[]; email?: string; select?: { name: string }; date?: { start: string } };
  if (p.type === "title") return p.title?.map(t => t.plain_text).join("") || "";
  if (p.type === "rich_text") return p.rich_text?.map(t => t.plain_text).join("") || "";
  if (p.type === "email") return (p.email as string) || "";
  if (p.type === "select") return p.select?.name || "";
  if (p.type === "date") return p.date?.start || "";
  return "";
}

export interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  questionId: string;
  mode: string;
  status: string;
  repoUrl: string;
  timeLimitMin: number;
  createdAt: string;
  token: string;
  startedAt: string;
  submittedAt: string;
}

function pageToInterview(page: NotionPage): Interview {
  const p = page.properties;
  return {
    id: page.id,
    candidateName: extractText(p["Name"]),
    candidateEmail: extractText(p["Email"]),
    questionId: extractText(p["QuestionId"]),
    mode: extractText(p["Track"]),
    status: extractText(p["Status"]),
    repoUrl: extractText(p["RepoUrl"]),
    timeLimitMin: 480,
    createdAt: extractText(p["Time"]) || page.created_time,
    token: extractText(p["Token"]),
    startedAt: extractText(p["StartedAt"]),
    submittedAt: extractText(p["SubmittedAt"]),
  };
}

async function notionFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API error: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getAllInterviews(): Promise<Interview[]> {
  const data = await notionFetch(`/databases/${NOTION_DB_ID}/query`, {
    method: "POST",
    body: JSON.stringify({ sorts: [{ timestamp: "created_time", direction: "descending" }] }),
  });
  return data.results.map(pageToInterview);
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  try {
    const page = await notionFetch(`/pages/${id}`);
    return pageToInterview(page);
  } catch {
    return null;
  }
}

export async function getInterviewByToken(token: string): Promise<Interview | null> {
  const data = await notionFetch(`/databases/${NOTION_DB_ID}/query`, {
    method: "POST",
    body: JSON.stringify({
      filter: { property: "Token", rich_text: { equals: token } },
    }),
  });
  if (data.results.length === 0) return null;
  return pageToInterview(data.results[0]);
}

export async function createInterview(fields: {
  name: string;
  email: string;
  field: string;
  track: string;
  github: string;
  questionId: string;
  token: string;
}): Promise<Interview> {
  const page = await notionFetch("/pages", {
    method: "POST",
    body: JSON.stringify({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        "Name": { title: [{ text: { content: fields.name } }] },
        "Email": { email: fields.email },
        "Field": { rich_text: [{ text: { content: fields.field } }] },
        "Track": { select: { name: fields.track } },
        "GitHub": { rich_text: [{ text: { content: fields.github } }] },
        "QuestionId": { rich_text: [{ text: { content: fields.questionId } }] },
        "Token": { rich_text: [{ text: { content: fields.token } }] },
        "Time": { date: { start: new Date().toISOString() } },
        "Status": { select: { name: "registered" } },
      },
    }),
  });
  return pageToInterview(page);
}

export async function updateInterview(id: string, fields: Record<string, unknown>): Promise<void> {
  const properties: Record<string, unknown> = {};
  if (fields.status) properties["Status"] = { select: { name: fields.status } };
  if (fields.repoUrl) properties["RepoUrl"] = { rich_text: [{ text: { content: fields.repoUrl } }] };
  if (fields.startedAt) properties["StartedAt"] = { date: { start: fields.startedAt } };
  if (fields.submittedAt) properties["SubmittedAt"] = { date: { start: fields.submittedAt } };

  await notionFetch(`/pages/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ properties }),
  });
}
