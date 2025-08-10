import { fetchAiData } from './ai.service.js';

export const getAiInsight = async (req, res) => {
  try {
    // In a real app, you might pass user-specific data to the AI service
    const userInput = `Analyze project for user: ${req.user.email}`;
    const insight = await fetchAiData(userInput);
    res.json(insight);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching AI insight' });
  }
};