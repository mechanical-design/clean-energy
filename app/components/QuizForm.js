"use client";

import { useMemo, useState } from "react";

const initialState = {
  status: "idle",
  message: "",
};

export default function QuizForm({ energyType, questions }) {
  const [startedAt] = useState(() => Date.now());
  const [result, setResult] = useState(initialState);

  const questionCount = useMemo(() => questions.length, [questions]);

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userName = formData.get("name")?.toString().trim();

    if (!userName) {
      setResult({ status: "error", message: "Please enter your name." });
      return;
    }

    const answers = {};
    for (const question of questions) {
      const value = formData.get(question.id)?.toString();
      if (!value) {
        setResult({
          status: "error",
          message: `Please answer all ${questionCount} questions before submitting.`,
        });
        return;
      }

      answers[question.id] = value;
    }

    setResult({ status: "submitting", message: "Submitting quiz result..." });

    const response = await fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        energyType,
        answers,
        completionTimeMs: Math.max(0, Date.now() - startedAt),
      }),
    });

    if (!response.ok) {
      setResult({
        status: "error",
        message: "Unable to submit quiz right now. Please try again.",
      });
      return;
    }

    const payload = await response.json();

    if (!payload.ok) {
      setResult({
        status: "error",
        message: payload.error ?? "Unable to submit quiz right now. Please try again.",
      });
      return;
    }

    const saveStatus = payload.saved
      ? "Saved to leaderboard."
      : `Not saved to leaderboard: ${payload.saveError}`;

    setResult({
      status: "success",
      message: `Great work, ${userName}! You scored ${payload.score}/${payload.total}. ${saveStatus}`,
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-semibold text-emerald-900">Quick Quiz</h2>
      <p className="mt-2 text-sm text-emerald-700">
        Share your name, answer all questions, and submit your score.
      </p>

      <label className="mt-5 block text-sm font-medium text-emerald-900" htmlFor="name">
        Your Name
      </label>
      <input
        id="name"
        name="name"
        required
        className="mt-2 w-full rounded-lg border border-emerald-200 px-3 py-2 text-emerald-950 outline-none ring-emerald-500 focus:ring"
        placeholder="Alex Rivera"
      />

      {questions.map((question) => (
        <fieldset key={question.id} className="mt-5 border-t border-emerald-100 pt-4">
          <legend className="text-sm font-semibold text-emerald-900">{question.prompt}</legend>
          <div className="mt-3 space-y-2">
            {question.options.map((option) => (
              <label key={option.value} className="flex items-start gap-2 text-sm text-emerald-800">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  className="mt-0.5 accent-emerald-600"
                  required
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <button
        type="submit"
        className="mt-6 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700"
      >
        Submit Quiz
      </button>

      {result.status !== "idle" ? (
        <p
          className={`mt-4 text-sm ${
            result.status === "success" ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {result.message}
        </p>
      ) : null}
    </form>
  );
}
