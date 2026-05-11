import Link from "next/link";
import { fetchLeaderboard } from "@/app/lib/supabase";

export const revalidate = 0;

export default async function RankingsPage() {
  const { entries, error } = await fetchLeaderboard(25);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-950">Community Rankings</h1>
          <p className="mt-2 text-emerald-800">
            Top performers ranked by highest score, then fastest completion time.
          </p>
        </div>
        <Link href="/" className="text-sm font-medium text-emerald-700 hover:text-emerald-900">
          ← Back to homepage
        </Link>
      </div>

      {error ? (
        <p className="mt-5 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </p>
      ) : null}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-emerald-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-emerald-100 text-emerald-900">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Energy Type</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Time (ms)</th>
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((entry, index) => (
                <tr key={`${entry.name}-${entry.energy_type}-${index}`} className="border-t border-emerald-100">
                  <td className="px-4 py-3 font-semibold text-emerald-900">#{index + 1}</td>
                  <td className="px-4 py-3 text-emerald-800">{entry.name}</td>
                  <td className="px-4 py-3 capitalize text-emerald-800">{entry.energy_type}</td>
                  <td className="px-4 py-3 text-emerald-800">
                    {entry.score}/{entry.total_questions}
                  </td>
                  <td className="px-4 py-3 text-emerald-800">{entry.completion_time_ms}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-emerald-700">
                  No leaderboard entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
