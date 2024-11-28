// src/store/useStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Flashcard, User, StudyStats } from '../types';

interface AppState {
version: number;
user: User | null;
flashcards: Flashcard[];
theme: 'light' | 'dark';
studyStats: StudyStats;
loading: boolean;
error: string | null;

// Actions
setTheme: (theme: 'light' | 'dark') => void;
addFlashcard: (flashcard: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>) => void;
updateFlashcard: (id: string, updates: Partial<Flashcard>) => void;
deleteFlashcard: (id: string) => void;
setUser: (user: User | null) => void;
updateStudyStats: (stats: Partial<StudyStats>) => void;
setLoading: (loading: boolean) => void;
setError: (error: string | null) => void;
}

const initialStudyStats: StudyStats = {
totalCards: 0,
masteredCards: 0,
studyStreak: 0,
lastStudied: new Date().toISOString(),
totalStudyTime: 0,
averageAccuracy: 0,
sessions: [],
weeklyProgress: []
};

export const useStore = create<AppState>()(
persist(
  (set) => ({
    // Initial state
    version: 1, // Add version to state
    user: null,
    flashcards: [],
    theme: 'light',
    studyStats: initialStudyStats,
    loading: false,
    error: null,

    // Actions
    setTheme: (theme) => set({ theme }),

    setUser: (user) => set({ user }),

    addFlashcard: (flashcard) =>
      set((state) => ({
        flashcards: [
          ...state.flashcards,
          {
            ...flashcard,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            reviewCount: 0,
            correctCount: 0,
            incorrectCount: 0,
            tags: flashcard.tags || []
          },
        ],
        studyStats: {
          ...state.studyStats,
          totalCards: state.studyStats.totalCards + 1
        }
      })),

    updateFlashcard: (id, updates) =>
      set((state) => ({
        flashcards: state.flashcards.map((card) =>
          card.id === id
            ? {
                ...card,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : card
        ),
      })),

    deleteFlashcard: (id) =>
      set((state) => ({
        flashcards: state.flashcards.filter((card) => card.id !== id),
        studyStats: {
          ...state.studyStats,
          totalCards: state.studyStats.totalCards - 1
        }
      })),

    updateStudyStats: (stats) =>
      set((state) => ({
        studyStats: {
          ...state.studyStats,
          ...stats,
        },
      })),

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
  }),
  {
    name: 'flashcard-store',
    version: 1, // Add version to storage
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      // Only persist these fields
      user: state.user,
      flashcards: state.flashcards,
      theme: state.theme,
      studyStats: state.studyStats,
      version: state.version
    }),
    migrate: (persistedState: any, version: number) => {
      if (version === 0) {
        // Migration from version 0 to 1
        return {
          ...persistedState,
          version: 1,
          studyStats: initialStudyStats,
          // Add any new fields or transform existing ones
          flashcards: persistedState.flashcards.map((card: any) => ({
            ...card,
            reviewCount: card.reviewCount || 0,
            correctCount: card.correctCount || 0,
            incorrectCount: card.incorrectCount || 0,
            tags: card.tags || []
          }))
        };
      }
      return persistedState;
    }
  }
)
);