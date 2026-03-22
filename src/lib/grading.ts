import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || "" });

export interface GradeResult {
  functionalityScore: number;
  codeQualityScore: number;
  productSenseScore: number;
  techChoiceScore: number;
  documentationScore: number;
  totalScore: number;
  detailedFeedback: string;
}

export async function gradeSubmission(
  questionContent: string,
  repoFiles: Record<string, string>,
): Promise<GradeResult> {
  const fileList = Object.entries(repoFiles)
    .map(([path, content]) => `--- ${path} ---\n${content}`)
    .join("\n\n");

  const prompt = `You are an expert coding interview evaluator. A candidate was given a vibe coding challenge and submitted a GitHub repo. Grade their submission.

## The Challenge
${questionContent}

## Submitted Code
${fileList}

## Grading Rubric (each dimension scored 1-5)

1. **Functionality (35% weight)**: Does it work? Are all requirements met?
   - 1-2: Core features missing or broken
   - 3-4: Core features work with minor gaps
   - 5: All requirements fully implemented

2. **Code Quality (25% weight)**: Is the code clean and well-structured?
   - 1-2: Messy, lots of errors
   - 3-4: Reasonable structure, minor issues
   - 5: Clean, well-organized, no obvious issues

3. **Product Sense (20% weight)**: Is the UI/UX thoughtful?
   - 1-2: No UI consideration
   - 3-4: Usable but basic
   - 5: Polished, handles edge cases

4. **Tech Choice (10% weight)**: Are the technology choices appropriate?
   - 1-2: Unreasonable choices
   - 3-4: Reasonable but generic
   - 5: Smart, efficient choices

5. **Documentation (10% weight)**: Can someone else run this?
   - 1-2: No README, won't run
   - 3-4: Some instructions, incomplete
   - 5: Clear README, easy to start

## Response Format
Respond with ONLY a JSON object (no markdown, no backticks):
{
  "functionality": <1-5>,
  "codeQuality": <1-5>,
  "productSense": <1-5>,
  "techChoice": <1-5>,
  "documentation": <1-5>,
  "feedback": "<detailed feedback covering strengths, weaknesses, and specific observations for each dimension. 3-5 paragraphs.>"
}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = (message.content[0] as { type: string; text: string }).text.trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}") + 1;
  const parsed = JSON.parse(text.slice(start, end));

  const f = parsed.functionality;
  const c = parsed.codeQuality;
  const p = parsed.productSense;
  const t = parsed.techChoice;
  const d = parsed.documentation;
  const total = f * 0.35 + c * 0.25 + p * 0.20 + t * 0.10 + d * 0.10;

  return {
    functionalityScore: f,
    codeQualityScore: c,
    productSenseScore: p,
    techChoiceScore: t,
    documentationScore: d,
    totalScore: Math.round(total * 100) / 100,
    detailedFeedback: parsed.feedback,
  };
}
