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

const QUESTIONS_DIR = path.join(process.cwd(), "questions");

export function getAllQuestions(): Question[] {
  const files = fs.readdirSync(QUESTIONS_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(QUESTIONS_DIR, file), "utf-8");
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

export function getQuestion(id: string): Question | null {
  const filePath = path.join(QUESTIONS_DIR, `${id}.md`);
  if (!fs.existsSync(filePath)) return null;
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
  const all = getAllQuestions().filter((q) => !excludeIds.includes(q.id));
  if (all.length === 0) return getAllQuestions()[0];
  return all[Math.floor(Math.random() * all.length)];
}
