// This is your swappable AI engine.
// In a real hackathon, you would replace this mock logic
// with a call to an external AI API (like OpenAI, Claude, etc.).

export const fetchAiData = async (userInput) => {
  // MOCK AI LOGIC: Simulate an API call
  console.log(`Simulating AI call with input: ${userInput}`);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        insight: "Based on your project data, the key risk is 'scope creep'.",
        recommendation: "Prioritize core MVP features and move 'nice-to-haves' to a post-hackathon list.",
        confidenceScore: 0.92,
      });
    }, 500); // Simulate network delay
  });
};