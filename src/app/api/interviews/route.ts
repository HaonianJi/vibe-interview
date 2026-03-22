import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRandomQuestion } from "@/lib/questions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { candidateName, candidateEmail, mode, timeLimitMin } = body;

    if (!candidateName || !candidateEmail) {
      return NextResponse.json(
        { error: "candidateName and candidateEmail are required" },
        { status: 400 },
      );
    }

    const question = getRandomQuestion();

    const interview = await prisma.interview.create({
      data: {
        candidateName,
        candidateEmail,
        mode: mode || "sync",
        timeLimitMin: timeLimitMin || 90,
        questionId: question.id,
      },
    });

    return NextResponse.json(interview, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
