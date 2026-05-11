import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function saveLeaderboardEntry(entry) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      saved: false,
      error:
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  const { error } = await supabase.from("leaderboard").insert(entry);

  if (error) {
    return { saved: false, error: error.message };
  }

  return { saved: true };
}

export async function fetchLeaderboard(limit = 20) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      entries: [],
      error:
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  const { data, error } = await supabase
    .from("leaderboard")
    .select("name, energy_type, score, total_questions, completion_time_ms")
    .order("score", { ascending: false })
    .order("completion_time_ms", { ascending: true })
    .limit(limit);

  if (error) {
    return { entries: [], error: error.message };
  }

  return { entries: data ?? [], error: null };
}
