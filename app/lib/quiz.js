import { getEnergyTopic } from "@/app/lib/energy-data";

export function evaluateQuiz(energyType, answers) {
  const topic = getEnergyTopic(energyType);

  if (!topic) {
    return { score: 0, total: 0 };
  }

  const score = topic.questions.reduce((currentScore, question) => {
    return answers?.[question.id] === question.correctOption
      ? currentScore + 1
      : currentScore;
  }, 0);

  return { score, total: topic.questions.length };
}
