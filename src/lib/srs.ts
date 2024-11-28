export function calculateNextReview(card: Flashcard, performance: 'easy' | 'medium' | 'hard'): Partial<Flashcard> {
const performanceFactors = {
  easy: 1.3,
  medium: 1.0,
  hard: 0.7,
};

const newEaseFactor = card.easeFactor * performanceFactors[performance];
const newInterval = card.interval * newEaseFactor;

return {
  easeFactor: Math.max(1.3, newEaseFactor),
  interval: Math.max(1, newInterval),
  reviewCount: card.reviewCount + 1,
  nextReviewDate: new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000),
};
}