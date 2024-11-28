import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
return new Date(date).toLocaleDateString();
}

export function calculateAccuracy(correct: number, total: number): number {
if (total === 0) return 0;
return Math.round((correct / total) * 100);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}


export function calculateNextReview(difficulty: 'easy' | 'medium' | 'hard'): Date {
  const now = new Date();
  const intervals = {
    easy: 7,
    medium: 3,
    hard: 1,
  };
  
  return new Date(now.setDate(now.getDate() + intervals[difficulty]));
}

export function validateApiKey(apiKey: string): boolean {
  return /^AIza[0-9A-Za-z-_]{35}$/.test(apiKey);
}

export function sanitizeContent(content: string): string {
  return content.trim().replace(/[<>]/g, '');
}