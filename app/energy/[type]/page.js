import Link from "next/link";
import { notFound } from "next/navigation";
import QuizForm from "@/app/components/QuizForm";
import { getEnergyTopic } from "@/app/lib/energy-data";

export function generateStaticParams() {
  return [{ type: "solar" }, { type: "wind" }, { type: "hydro" }];
}

export default async function EnergyDetailPage({ params }) {
  const resolvedParams = await params;
  const topic = getEnergyTopic(resolvedParams?.type);

  if (!topic) {
    notFound();
  }

  const questions = topic.questions.map(({ id, prompt, options }) => ({
    id,
    prompt,
    options,
  }));

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <Link href="/" className="text-sm font-medium text-emerald-700 hover:text-emerald-900">
        ← Back to homepage
      </Link>

      <section className="mt-6 rounded-2xl bg-emerald-50 p-8">
        <h1 className="text-3xl font-bold text-emerald-950">{topic.title}</h1>
        <p className="mt-4 text-emerald-900">{topic.summary}</p>

        <ul className="mt-6 space-y-3 text-emerald-900">
          {topic.highlights.map((highlight) => (
            <li key={highlight} className="rounded-lg bg-white px-4 py-3 shadow-sm">
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <QuizForm energyType={resolvedParams.type} questions={questions} />
    </main>
  );
}
