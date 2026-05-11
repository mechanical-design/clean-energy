import { NextResponse } from "next/server";
import { evaluateQuiz } from "@/app/lib/quiz";
import { saveLeaderboardEntry } from "@/app/lib/supabase";

export async function POST(request) {
  try {
    const payload = await request.json();
    const name = payload?.name?.toString().trim();
    const energyType = payload?.energyType?.toString().toLowerCase();
    const answers = payload?.answers ?? {};
    const completionTimeMs = Number(payload?.completionTimeMs ?? 0);

    if (!name || !energyType || typeof answers !== "object") {
      return NextResponse.json(
        { ok: false, error: "Missing required quiz fields." },
        { status: 400 }
      );
    }

    const { score, total } = evaluateQuiz(energyType, answers);

    if (total === 0) {
      return NextResponse.json(
        { ok: false, error: "Unknown energy type." },
        { status: 400 }
      );
    }

    const saveResult = await saveLeaderboardEntry({
      name,
      energy_type: energyType,
      answers,
      score,
      total_questions: total,
      completion_time_ms: Number.isFinite(completionTimeMs)
        ? Math.max(0, Math.round(completionTimeMs))
        : 0,
    });

    return NextResponse.json({
      ok: true,
      score,
      total,
      saved: saveResult.saved,
      saveError: saveResult.saved ? null : saveResult.error,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
