// src/components/FlashcardGenerator.tsx
import React, { useState } from 'react';
import { useFlashcardGeneration } from '../hooks/useFlashcardGeneration';

export function FlashcardGenerator() {
const [input, setInput] = useState('');
const [cards, setCards] = useState([]);
const { generateFromText, generateFromImage, loading, error } = useFlashcardGeneration();

const handleTextSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const newCards = await generateFromText(input);
    setCards(newCards);
  } catch (err) {
    console.error(err);
  }
};

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    try {
      const newCards = await generateFromImage(file);
      setCards(newCards);
    } catch (err) {
      console.error(err);
    }
  }
};

return (
  <div className="max-w-4xl mx-auto p-4">
    <form onSubmit={handleTextSubmit} className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter text to generate flashcards..."
      />

      <div className="flex gap-4">
        <button 
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer"
        >
          Upload Image
        </label>
      </div>
    </form>

    {error && (
      <div className="text-red-500 mt-4">
        {error}
      </div>
    )}

    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {cards.map((card, index) => (
        <div key={index} className="border p-4 rounded-lg">
          <h3 className="font-bold">{card.question}</h3>
          <p className="mt-2">{card.answer}</p>
        </div>
      ))}
    </div>
  </div>
);
}