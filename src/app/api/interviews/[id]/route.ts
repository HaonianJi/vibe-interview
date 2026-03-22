import { NextRequest, NextResponse } from "next/server";
import { getInterviewById } from "@/lib/notion";
import { getQuestion } from "@/lib/questions";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const interview = await getInterviewById(id);

  if (!interview) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const question = getQuestion(interview.questionId);

  return NextResponse.json({
    ...interview,
    question: question
      ? {
          title: question.title,
          difficulty: question.difficulty,
          duration: question.duration,
          content: question.content,
        }
      : null,
  });
}
