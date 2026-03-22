import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getQuestion } from "@/lib/questions";
import { gradeSubmission } from "@/lib/grading";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

const CODE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".py",
  ".html",
  ".css",
  ".scss",
  ".json",
  ".md",
  ".yaml",
  ".yml",
  ".toml",
  ".sql",
  ".prisma",
  ".svelte",
  ".vue",
  ".go",
  ".rs",
  ".java",
  ".rb",
]);

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".venv",
  "__pycache__",
  ".next",
  "dist",
  "build",
  ".cache",
  ".prisma",
  "venv",
  "env",
]);

function readCodeFiles(
  dir: string,
  base: string = "",
): { path: string; content: string }[] {
  const files: { path: string; content: string }[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    const relPath = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...readCodeFiles(fullPath, relPath));
    } else if (CODE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      try {
        const content = fs.readFileSync(fullPath, "utf-8");
        if (content.length < 100000) {
          files.push({ path: relPath, content });
        }
      } catch {
        // skip unreadable files
      }
    }
  }
  return files;
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const interview = await prisma.interview.findUnique({
    where: { id },
    include: { grade: true },
  });
  if (!interview)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!interview.repoUrl)
    return NextResponse.json({ error: "No repo submitted" }, { status: 400 });
  if (interview.grade)
    return NextResponse.json({ error: "Already graded" }, { status: 400 });

  const question = getQuestion(interview.questionId);
  if (!question)
    return NextResponse.json({ error: "Question not found" }, { status: 400 });

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "vibe-grade-"));
  try {
    execSync(`gh repo clone ${interview.repoUrl} ${tmpDir}/repo -- --depth 1`, {
      timeout: 30000,
      stdio: "pipe",
    });

    const codeFiles = readCodeFiles(path.join(tmpDir, "repo"));
    if (codeFiles.length === 0) {
      return NextResponse.json(
        { error: "No code files found in repo" },
        { status: 400 },
      );
    }

    // Convert array to Record<string, string> for gradeSubmission
    const filesToGrade: Record<string, string> = {};
    for (const f of codeFiles.slice(0, 50)) {
      filesToGrade[f.path] = f.content;
    }

    const result = await gradeSubmission(question.content, filesToGrade);

    const grade = await prisma.grade.create({
      data: {
        interviewId: interview.id,
        ...result,
      },
    });

    await prisma.interview.update({
      where: { id: interview.id },
      data: { status: "graded" },
    });

    return NextResponse.json(grade);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { error: `Grading failed: ${message}` },
      { status: 500 },
    );
  } finally {
    try {
      execSync(`rm -rf ${tmpDir}`);
    } catch {
      // ignore cleanup errors
    }
  }
}
