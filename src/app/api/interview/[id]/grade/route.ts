import { prisma } from "@/lib/prisma";
import { getQuestion } from "@/lib/questions";
import { gradeSubmission } from "@/lib/grading";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const interview = await prisma.interview.findUnique({ where: { id } });

    if (!interview) {
      return Response.json({ error: "Interview not found" }, { status: 404 });
    }

    if (interview.status !== "submitted" || !interview.repoUrl) {
      return Response.json(
        { error: "Interview has not been submitted yet" },
        { status: 400 }
      );
    }

    const question = getQuestion(interview.questionId);
    if (!question) {
      return Response.json({ error: "Question not found" }, { status: 404 });
    }

    // Clone the repo
    const tmpDir = `/tmp/grading-${id}`;

    // Clean up if exists from previous attempt
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }

    try {
      execSync(`git clone --depth 1 ${interview.repoUrl} ${tmpDir}`, {
        timeout: 30000,
        stdio: "pipe",
      });
    } catch {
      return Response.json(
        { error: "Failed to clone repository. Make sure it is public." },
        { status: 400 }
      );
    }

    // Read all code files
    const EXCLUDE_DIRS = new Set([
      "node_modules",
      ".git",
      ".next",
      ".venv",
      "__pycache__",
      "dist",
      "build",
      ".cache",
    ]);
    const EXCLUDE_FILES = new Set([
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
    ]);
    const EXCLUDE_EXTENSIONS = new Set([".db", ".sqlite", ".lock", ".ico", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".woff", ".woff2", ".ttf", ".eot"]);

    const repoFiles: Record<string, string> = {};

    function readDir(dir: string, relative: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (EXCLUDE_DIRS.has(entry.name)) continue;
        const fullPath = path.join(dir, entry.name);
        const relPath = path.join(relative, entry.name);

        if (entry.isDirectory()) {
          readDir(fullPath, relPath);
        } else if (entry.isFile()) {
          if (EXCLUDE_FILES.has(entry.name)) continue;
          const ext = path.extname(entry.name).toLowerCase();
          if (EXCLUDE_EXTENSIONS.has(ext)) continue;

          try {
            const content = fs.readFileSync(fullPath, "utf-8");
            // Skip binary-looking files
            if (content.includes("\0")) continue;
            // Skip very large files
            if (content.length > 50000) {
              repoFiles[relPath] = content.slice(0, 50000) + "\n... (truncated)";
            } else {
              repoFiles[relPath] = content;
            }
          } catch {
            // Skip files that can't be read as UTF-8
          }
        }
      }
    }

    readDir(tmpDir, "");

    if (Object.keys(repoFiles).length === 0) {
      // Clean up
      fs.rmSync(tmpDir, { recursive: true, force: true });
      return Response.json(
        { error: "No readable code files found in the repository" },
        { status: 400 }
      );
    }

    // Grade with AI
    const result = await gradeSubmission(question.content, repoFiles);

    // Save grade
    const grade = await prisma.grade.create({
      data: {
        interviewId: id,
        functionalityScore: result.functionalityScore,
        codeQualityScore: result.codeQualityScore,
        productSenseScore: result.productSenseScore,
        techChoiceScore: result.techChoiceScore,
        documentationScore: result.documentationScore,
        totalScore: result.totalScore,
        detailedFeedback: result.detailedFeedback,
      },
    });

    // Update interview status
    await prisma.interview.update({
      where: { id },
      data: { status: "graded" },
    });

    // Clean up
    fs.rmSync(tmpDir, { recursive: true, force: true });

    return Response.json(grade);
  } catch (error) {
    console.error("Grading failed:", error);
    // Clean up on error
    const tmpDir = `/tmp/grading-${id}`;
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
    return Response.json({ error: "Grading failed" }, { status: 500 });
  }
}
