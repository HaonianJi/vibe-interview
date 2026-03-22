import { redirect } from "next/navigation";

export default function QuestionsRedirect({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  const lang = searchParams.lang || "en";
  redirect(`/?lang=${lang}`);
}
