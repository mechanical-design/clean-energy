import Link from "next/link";
import { ENERGY_TOPICS } from "@/app/lib/energy-data";

const cardOrder = ["solar", "wind", "hydro"];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10">
      <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white shadow-lg sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
          Community Center Renewable Energy Hub
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Discover Clean Energy Together</h1>
        <p className="mt-4 max-w-2xl text-emerald-50">
          Learn how solar, wind, and hydro power can help our community reduce emissions,
          improve energy resilience, and create a cleaner future.
        </p>
      </section>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cardOrder.map((type) => {
          const topic = ENERGY_TOPICS[type];
          return (
            <Link
              href={`/energy/${type}`}
              key={type}
              className="group rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-2xl font-semibold text-emerald-950 group-hover:text-emerald-700">
                {topic.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-emerald-800">{topic.summary}</p>
              <span className="mt-5 inline-block text-sm font-medium text-emerald-700">Learn more →</span>
            </Link>
          );
        })}
      </section>

      {/* Rankings card at the bottom */}
      <section className="mt-10 flex justify-center">
        <Link
          href="/rankings"
          className="group w-full max-w-md rounded-2xl border border-emerald-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <h2 className="text-2xl font-semibold text-emerald-950 group-hover:text-emerald-700 mb-2">
            View Rankings
          </h2>
          <p className="text-sm leading-6 text-emerald-800">
            See the top quiz scores and fastest completion times from our community.
          </p>
          <span className="mt-5 inline-block text-sm font-medium text-emerald-700">Go to Rankings →</span>
        </Link>
      </section>
    </main>
  );
}
