import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getQuestion } from "@/lib/questions";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  const interview = await prisma.interview.findUnique({ where: { token } });
  if (!interview) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const question = getQuestion(interview.questionId);

  let timeRemainingSeconds: number | null = null;
  if (interview.startedAt) {
    const elapsed = (Date.now() - interview.startedAt.getTime()) / 1000;
    timeRemainingSeconds = Math.max(
      0,
      Math.floor(interview.timeLimitMin * 60 - elapsed),
    );
  }

  return NextResponse.json({
    id: interview.id,
    candidateName: interview.candidateName,
    status: interview.status,
    timeLimitMin: interview.timeLimitMin,
    startedAt: interview.startedAt,
    submittedAt: interview.submittedAt,
    question: question
      ? {
          title: question.title,
          difficulty: question.difficulty,
          duration: question.duration,
          content: question.content,
        }
      : null,
    timeRemainingSeconds,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const body = await req.json();

  const interview = await prisma.interview.findUnique({ where: { token } });
  if (!interview) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (body.action === "start") {
    if (interview.status !== "pending") {
      return NextResponse.json(
        { error: "Exam already started" },
        { status: 400 },
      );
    }

    const updated = await prisma.interview.update({
      where: { token },
      data: {
        status: "in_progress",
        startedAt: new Date(),
      },
    });

    return NextResponse.json({ status: updated.status });
  }

  if (body.action === "submit") {
    if (interview.status !== "in_progress") {
      return NextResponse.json(
        { error: "Exam not in progress" },
        { status: 400 },
      );
    }

    if (!body.repoUrl || typeof body.repoUrl !== "string") {
      return NextResponse.json(
        { error: "repoUrl is required" },
        { status: 400 },
      );
    }

    const githubRepoRegex =
      /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(\.git)?$/;
    if (!githubRepoRegex.test(body.repoUrl)) {
      return NextResponse.json(
        { error: "repoUrl must be a valid GitHub repository URL" },
        { status: 400 },
      );
    }

    const updated = await prisma.interview.update({
      where: { token },
      data: {
        status: "submitted",
        repoUrl: body.repoUrl,
        submittedAt: new Date(),
      },
    });

    return NextResponse.json({ status: updated.status });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
