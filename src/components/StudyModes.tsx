// components/StudyModes.tsx
export function StudyModes() {
const [mode, setMode] = useState<'classic' | 'quiz' | 'match' | 'write'>('classic');

const modes = {
  classic: <ClassicFlashcards />,
  quiz: <QuizMode />,
  match: <MatchingGame />,
  write: <WritingPractice />,
};

return (
  <div>
    <div className="flex space-x-4 mb-6">
      {Object.keys(modes).map((m) => (
        <Button
          key={m}
          variant={mode === m ? 'primary' : 'outline'}
          onClick={() => setMode(m as keyof typeof modes)}
        >
          {m.charAt(0).toUpperCase() + m.slice(1)}
        </Button>
      ))}
    </div>
    {modes[mode]}
  </div>
);
}