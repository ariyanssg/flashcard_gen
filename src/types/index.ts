// src/types/index.ts

// Flashcard related types
export interface Flashcard {
id: string;
question: string;
answer: string;
difficulty: 'easy' | 'medium' | 'hard';
tags: string[];
createdAt: string;
updatedAt: string;
reviewCount: number;
easeFactor: number;
interval: number;
nextReviewDate: string;
tags: string[];
deckId?: string;
lastReviewed?: string;
correctCount: number;
incorrectCount: number;
}

// Deck related types
export interface Deck {
id: string;
name: string;
description: string;
createdAt: string;
updatedAt: string;
cardCount: number;
tags: string[];
isPublic: boolean;
ownerId: string;
}
export interface WeeklyProgress {
week: string;
cardsStudied: number;
accuracy: number;
}

// Store related types
export interface AppState {
// State
flashcards: Flashcard[];
decks: Deck[];
theme: 'light' | 'dark';
currentDeck: string | null;
loading: boolean;
error: string | null;
userPreferences: UserPreferences;
studyStats: StudyStats;

// Flashcard actions
addFlashcard: (flashcard: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt' | 'reviewCount' | 'easeFactor' | 'interval' | 'nextReviewDate' | 'correctCount' | 'incorrectCount'>) => void;
updateFlashcard: (id: string, updates: Partial<Flashcard>) => void;
deleteFlashcard: (id: string) => void;

// Deck actions
addDeck: (deck: Omit<Deck, 'id' | 'createdAt' | 'updatedAt' | 'cardCount'>) => void;
updateDeck: (id: string, updates: Partial<Deck>) => void;
deleteDeck: (id: string) => void;

// App state actions
setTheme: (theme: 'light' | 'dark') => void;
setCurrentDeck: (deckId: string | null) => void;
setLoading: (loading: boolean) => void;
setError: (error: string | null) => void;
updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
updateStudyStats: (stats: Partial<StudyStats>) => void;
}

// Study related types
export interface StudySession {
id: string;
startTime: string;
endTime: string;
cardsReviewed: number;
correctAnswers: number;
incorrectAnswers: number;
deckId: string;
}

export interface StudyStats {
totalCards: number;
masteredCards: number;
studyStreak: number;
lastStudied: string;
totalStudyTime: number;
averageAccuracy: number;
sessions: StudySession[];
weeklyProgress: {
  date: string;
  cardsStudied: number;
  accuracy: number;
}[];
}

// File processing types
export interface FileUploadResponse {
text: string;
type: 'text' | 'image' | 'pdf' | 'doc';
success: boolean;
error?: string;
metadata?: {
  fileName: string;
  fileSize: number;
  fileType: string;
  pageCount?: number;
};
}

// Theme types
export interface ThemeConfig {
primary: string;
secondary: string;
accent: string;
background: string;
text: string;
error: string;
success: string;
warning: string;
info: string;
}

// API Response types
export interface GenerateFlashcardsResponse {
flashcards: Array<{
  question: string;
  answer: string;
  tags?: string[];
}>;
success: boolean;
error?: string;
metadata?: {
  sourceText: string;
  generatedAt: string;
  modelUsed: string;
};
}

// User Preferences
export interface UserPreferences {
theme: 'light' | 'dark';
cardFlipAnimation: boolean;
showProgress: boolean;
autoAdvance: boolean;
customTheme?: ThemeConfig;
studySessionDuration: number;
cardsPerSession: number;
notificationsEnabled: boolean;
soundEffects: boolean;
language: string;
timezone: string;
}

// Study Mode types
export type StudyMode = 'classic' | 'quiz' | 'match' | 'write' | 'spaced';

// Error types
export interface AppError {
code: string;
message: string;
details?: unknown;
timestamp: string;
handled: boolean;
}

// Filter and Sort types
export interface FilterOptions {
difficulty?: 'easy' | 'medium' | 'hard';
tags?: string[];
dateRange?: {
  start: string;
  end: string;
};
deckId?: string;
searchQuery?: string;
status?: 'all' | 'due' | 'overdue' | 'mastered';
}

export interface SortOptions {
field: 'createdAt' | 'updatedAt' | 'difficulty' | 'reviewCount' | 'nextReviewDate';
direction: 'asc' | 'desc';
}

// Analytics types
export interface StudyAnalytics {
dailyStats: {
  date: string;
  cardsStudied: number;
  timeSpent: number;
  accuracy: number;
}[];
weeklyStats: {
  week: string;
  cardsStudied: number;
  timeSpent: number;
  accuracy: number;
}[];
monthlyStats: {
  month: string;
  cardsStudied: number;
  timeSpent: number;
  accuracy: number;
}[];
}

// Export all types
export type {
Flashcard,
Deck,
AppState,
StudySession,
StudyStats,
FileUploadResponse,
ThemeConfig,
GenerateFlashcardsResponse,
UserPreferences,
StudyMode,
AppError,
FilterOptions,
SortOptions,
StudyAnalytics,
};