import { NextRequest, NextResponse } from "next/server";
import { createInterview } from "@/lib/notion";
import { getRandomQuestion } from "@/lib/questions";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { candidateName, candidateEmail, field, track, github } = body;

    if (!candidateName || !candidateEmail) {
      return NextResponse.json(
        { error: "candidateName and candidateEmail are required" },
        { status: 400 },
      );
    }

    const question = getRandomQuestion();
    const token = randomUUID().replace(/-/g, "").slice(0, 16);

    const interview = await createInterview({
      name: candidateName,
      email: candidateEmail,
      field: field || "",
      track: track || "advanced",
      github: github || "",
      questionId: question.id,
      token,
    });

    return NextResponse.json(interview, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
