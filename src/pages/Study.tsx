import { useState } from 'react';
import { useStore } from '../store/useStore';

export default function Study() {
  const flashcards = useStore((state) => state.flashcards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcards[currentCardIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No flashcards yet!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Create some flashcards to start studying.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Study Session</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Card {currentCardIndex + 1} of {flashcards.length}
        </p>
      </div>

      <div 
        className="relative h-[400px] w-full cursor-pointer perspective-1000 mb-8"
        onClick={handleFlip}
      >
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front of card */}
          <div className="absolute inset-0 w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 backface-hidden">
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-xl font-semibold mb-6">Question</h2>
              <p className="text-lg text-center">
                {currentCard?.question}
              </p>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute inset-0 w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 backface-hidden rotate-y-180">
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-xl font-semibold mb-6">Answer</h2>
              <p className="text-lg text-center">
                {currentCard?.answer}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center space-x-4">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleFlip}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isFlipped ? "Show Question" : "Show Answer"}
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}