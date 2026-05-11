export const ENERGY_TOPICS = {
  solar: {
    title: "Solar Energy",
    summary:
      "Solar panels capture sunlight and convert it into clean electricity for homes, schools, and community spaces.",
    highlights: [
      "Reduces electricity costs over time",
      "Works well on rooftops and open parking structures",
      "Produces zero emissions while generating power",
    ],
    questions: [
      {
        id: "q1",
        prompt: "What does a solar panel convert into electricity?",
        options: [
          { value: "wind", label: "Wind" },
          { value: "sunlight", label: "Sunlight" },
          { value: "water", label: "Water flow" },
        ],
        correctOption: "sunlight",
      },
      {
        id: "q2",
        prompt: "Which location is commonly used for community solar installations?",
        options: [
          { value: "rooftops", label: "Rooftops" },
          { value: "caves", label: "Underground caves" },
          { value: "tunnels", label: "Road tunnels" },
        ],
        correctOption: "rooftops",
      },
        {
          id: "q3",
          prompt: "What is the main benefit of solar energy for the environment?",
          options: [
            { value: "emissions", label: "Reduces greenhouse gas emissions" },
            { value: "noise", label: "Increases noise pollution" },
            { value: "waste", label: "Produces hazardous waste" },
          ],
          correctOption: "emissions",
        },
        {
          id: "q4",
          prompt: "Which device is used to convert DC from solar panels to AC for home use?",
          options: [
            { value: "inverter", label: "Inverter" },
            { value: "transformer", label: "Transformer" },
            { value: "generator", label: "Generator" },
          ],
          correctOption: "inverter",
        },
        {
          id: "q5",
          prompt: "Solar panels work best when they are...",
          options: [
            { value: "shaded", label: "Shaded" },
            { value: "clean", label: "Clean and unobstructed" },
            { value: "wet", label: "Wet" },
          ],
          correctOption: "clean",
        },
        {
          id: "q6",
          prompt: "What is a common material used in solar cells?",
          options: [
            { value: "silicon", label: "Silicon" },
            { value: "plastic", label: "Plastic" },
            { value: "wood", label: "Wood" },
          ],
          correctOption: "silicon",
        },
        {
          id: "q7",
          prompt: "Which factor does NOT affect solar panel output?",
          options: [
            { value: "sunlight", label: "Amount of sunlight" },
            { value: "panelAngle", label: "Panel angle" },
            { value: "color", label: "Color of nearby cars" },
          ],
          correctOption: "color",
        },
        {
          id: "q8",
          prompt: "What happens to solar panel output on a cloudy day?",
          options: [
            { value: "decreases", label: "It decreases" },
            { value: "increases", label: "It increases" },
            { value: "same", label: "It stays the same" },
          ],
          correctOption: "decreases",
        },
        {
          id: "q9",
          prompt: "What is the typical lifespan of a solar panel?",
          options: [
            { value: "25years", label: "About 25 years or more" },
            { value: "5years", label: "About 5 years" },
            { value: "100years", label: "About 100 years" },
          ],
          correctOption: "25years",
        },
        {
          id: "q10",
          prompt: "Which of these is a limitation of solar energy?",
          options: [
            { value: "night", label: "No power generation at night" },
            { value: "pollution", label: "Causes air pollution" },
            { value: "fuel", label: "Requires fossil fuel input" },
          ],
          correctOption: "night",
        },
    ],
  },
  wind: {
    title: "Wind Energy",
    summary:
      "Wind turbines use moving air to spin blades and generate renewable electricity for local grids.",
    highlights: [
      "Strong output in windy regions",
      "Pairs well with solar for balanced generation",
      "Land around turbines can still be used for farming",
    ],
    questions: [
      {
        id: "q1",
        prompt: "What drives a wind turbine to produce electricity?",
        options: [
          { value: "rain", label: "Rainfall" },
          { value: "wind", label: "Moving air" },
          { value: "steam", label: "Steam pressure" },
        ],
        correctOption: "wind",
      },
      {
        id: "q2",
        prompt: "Why can wind energy complement solar energy?",
        options: [
          { value: "night", label: "Wind can generate at different times, including at night" },
          { value: "noise", label: "Wind turbines remove all noise pollution" },
          { value: "fuel", label: "Wind turbines require fossil fuel backup to spin" },
        ],
        correctOption: "night",
      },
    ],
  },
  hydro: {
    title: "Hydro Energy",
    summary:
      "Hydropower captures the movement of flowing water to spin turbines and generate consistent clean power.",
    highlights: [
      "Reliable generation when water flow is steady",
      "Can support grid stability with predictable output",
      "Uses a renewable natural water cycle",
    ],
    questions: [
      {
        id: "q1",
        prompt: "Hydropower systems primarily rely on which natural resource?",
        options: [
          { value: "water", label: "Flowing water" },
          { value: "coal", label: "Coal" },
          { value: "gas", label: "Natural gas" },
        ],
        correctOption: "water",
      },
      {
        id: "q2",
        prompt: "What is one advantage of hydro energy for the grid?",
        options: [
          { value: "predictable", label: "Predictable output" },
          { value: "infinite", label: "Infinite power from any puddle" },
          { value: "portable", label: "Portable dam equipment" },
        ],
        correctOption: "predictable",
      },
    ],
  },
};

export function getEnergyTopic(type) {
  if (!type) {
    return null;
  }

  return ENERGY_TOPICS[type.toLowerCase()] ?? null;
}
