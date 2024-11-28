// lib/studyRecommendations.ts
export async function generateStudyPlan(flashcards: Flashcard[]): Promise<StudyPlan> {
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const cardData = flashcards.map(card => ({
  topic: card.tags[0],
  performance: card.easeFactor,
  lastReviewed: card.lastReviewed,
}));

const prompt = `Analyze this study data and create a personalized study plan: ${JSON.stringify(cardData)}`;

const result = await model.generateContent(prompt);
return JSON.parse(result.response.text());
}