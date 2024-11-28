// src/components/ShareDeck.tsx
import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Toggle } from './ui/Toggle';
import { useStore } from '../store/useStore';
import type { Flashcard } from '../types';

interface ShareDeckProps {
selectedCards?: Flashcard[];
}

async function createShareableLink(cards: Flashcard[]) {
// Generate a unique ID for the shared deck
const deckId = crypto.randomUUID();

// In a real app, you would save this to your backend
// For now, we'll save it to localStorage
localStorage.setItem(`shared-deck-${deckId}`, JSON.stringify({
  id: deckId,
  cards,
  createdAt: new Date().toISOString()
}));

return deckId;
}

export function ShareDeck({ selectedCards = [] }: ShareDeckProps) {
const [isPublic, setIsPublic] = useState(false);
const [shareUrl, setShareUrl] = useState('');
const [copying, setCopying] = useState(false);
const flashcards = useStore((state) => state.flashcards);

const cardsToShare = selectedCards.length > 0 ? selectedCards : flashcards;

const handleShare = async () => {
  try {
    const deckId = await createShareableLink(cardsToShare);
    setShareUrl(`${window.location.origin}/deck/${deckId}`);
  } catch (error) {
    console.error('Error creating shareable link:', error);
  }
};

const handleCopy = async () => {
  try {
    setCopying(true);
    await navigator.clipboard.writeText(shareUrl);
    // You might want to add a toast notification here
  } catch (error) {
    console.error('Error copying to clipboard:', error);
  } finally {
    setCopying(false);
  }
};

return (
  <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Share Deck</h3>
        <Toggle
          pressed={isPublic}
          onPressedChange={setIsPublic}
          aria-label="Toggle deck visibility"
        >
          {isPublic ? 'Public' : 'Private'}
        </Toggle>
      </div>

      <div className="flex flex-col space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {cardsToShare.length} cards selected
        </p>
        <Button 
          onClick={handleShare}
          disabled={!isPublic || cardsToShare.length === 0}
        >
          Generate Share Link
        </Button>
      </div>

      {shareUrl && (
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              value={shareUrl}
              readOnly
              className="flex-1"
              onClick={(e) => e.currentTarget.select()}
            />
            <Button 
              onClick={handleCopy}
              variant="secondary"
              disabled={copying}
            >
              {copying ? 'Copying...' : 'Copy'}
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Anyone with this link can view these flashcards
          </p>
        </div>
      )}
    </div>
  </div>
);
}