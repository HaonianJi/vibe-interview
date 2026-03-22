import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Question {
  id: string;
  title: string;
  difficulty: string;
  duration: string;
  description: string;
  content: string;
}

const BASE_DIR = path.join(process.cwd(), "questions");

function questionsDir(lang: string): string {
  if (lang === "zh") return path.join(BASE_DIR, "zh");
  return BASE_DIR;
}

export function getAllQuestions(lang: string = "en"): Question[] {
  const dir = questionsDir(lang);
  if (!fs.existsSync(dir)) return getAllQuestions("en");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      id: file.replace(".md", ""),
      title: data.title || file,
      difficulty: data.difficulty || "medium",
      duration: data.duration || "60 min",
      description: data.description || "",
      content,
    };
  });
}

export function getQuestion(id: string, lang: string = "en"): Question | null {
  const filePath = path.join(questionsDir(lang), `${id}.md`);
  if (!fs.existsSync(filePath)) {
    // fallback to English
    const enPath = path.join(BASE_DIR, `${id}.md`);
    if (!fs.existsSync(enPath)) return null;
    const raw = fs.readFileSync(enPath, "utf-8");
    const { data, content } = matter(raw);
    return { id, title: data.title || id, difficulty: data.difficulty || "medium", duration: data.duration || "60 min", description: data.description || "", content };
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    id,
    title: data.title || id,
    difficulty: data.difficulty || "medium",
    duration: data.duration || "60 min",
    description: data.description || "",
    content,
  };
}

export function getRandomQuestion(excludeIds: string[] = []): Question {
  const all = getAllQuestions("en").filter((q) => !excludeIds.includes(q.id));
  if (all.length === 0) return getAllQuestions("en")[0];
  return all[Math.floor(Math.random() * all.length)];
}
