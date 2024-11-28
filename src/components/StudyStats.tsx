// src/components/StudyStats.tsx
import { useStore } from '../store/useStore';
import { Card } from './ui/Card';
import { Brain, Clock, Target, TrendingUp } from 'lucide-react';

export default function StudyStats() {
  const flashcards = useStore((state) => state.flashcards);

  // Calculate statistics
  const totalCards = flashcards.length;
  const cardsStudiedToday = flashcards.filter(card => {
    const today = new Date();
    const lastReviewed = new Date(card.updatedAt);
    return (
      lastReviewed.getDate() === today.getDate() &&
      lastReviewed.getMonth() === today.getMonth() &&
      lastReviewed.getFullYear() === today.getFullYear()
    );
  }).length;

  const masteredCards = flashcards.filter(card => 
    card.difficulty === 'easy'
  ).length;

  const stats = [
    {
      title: 'Total Cards',
      value: totalCards,
      icon: Brain,
      color: 'text-blue-500',
    },
    {
      title: 'Studied Today',
      value: cardsStudiedToday,
      icon: Clock,
      color: 'text-green-500',
    },
    {
      title: 'Mastered',
      value: masteredCards,
      icon: Target,
      color: 'text-purple-500',
    },
    {
      title: 'Completion Rate',
      value: totalCards ? `${Math.round((masteredCards / totalCards) * 100)}%` : '0%',
      icon: TrendingUp,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Study Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {flashcards.slice(-5).reverse().map((card) => (
            <div
              key={card.id}
              className="border-b border-gray-200 dark:border-gray-700 pb-4"
            >
              <p className="font-medium">{card.question}</p>
              <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Last reviewed: {new Date(card.updatedAt).toLocaleDateString()}</span>
                <span className="capitalize">Difficulty: {card.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}