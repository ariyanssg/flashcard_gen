// src/pages/SharedDeck.tsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Flashcard } from '../types';

export default function SharedDeck() {
const { deckId } = useParams();
const [deck, setDeck] = useState<{ cards: Flashcard[] } | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  try {
    const sharedDeck = localStorage.getItem(`shared-deck-${deckId}`);
    if (sharedDeck) {
      setDeck(JSON.parse(sharedDeck));
    } else {
      setError('Deck not found');
    }
  } catch (err) {
    setError('Error loading deck');
  } finally {
    setLoading(false);
  }
}, [deckId]);

if (loading) {
  return <div>Loading...</div>;
}

if (error || !deck) {
  return <div>Error: {error}</div>;
}

return (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-4">Shared Flashcards</h1>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {deck.cards.map((card) => (
        <div key={card.id} className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Question:</h3>
          <p className="mb-4">{card.question}</p>
          <h3 className="font-medium mb-2">Answer:</h3>
          <p>{card.answer}</p>
        </div>
      ))}
    </div>
  </div>
);
}