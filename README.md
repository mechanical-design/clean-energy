# Community Center Clean Energy Website

Next.js (App Router) + Tailwind CSS site for promoting renewable energy and collecting quiz results.

## Features

- Homepage with clickable Solar, Wind, and Hydro cards
- Dedicated detail page for each energy type
- Quiz form on each detail page capturing:
  - participant name
  - quiz answers
  - completion time
- Supabase leaderboard persistence (`leaderboard` table)
- Rankings page sorted by high score, then fastest completion time

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

If these are missing, quiz submissions still return scores but are not saved.

## Expected Supabase table

Create a `leaderboard` table with these columns:

- `name` (text)
- `energy_type` (text)
- `answers` (jsonb)
- `score` (int)
- `total_questions` (int)
- `completion_time_ms` (int)

The rankings page reads this table and sorts by `score DESC`, then `completion_time_ms ASC`.
