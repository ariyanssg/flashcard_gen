import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isFlipped?: boolean;
  onFlip?: () => void;
  question: string;
  answer: string;
  template?: {
    backgroundColor?: string;
    textColor?: string;
    borderStyle?: string;
    fontFamily?: string;
  };
}

export function Card({ 
  className, 
  isFlipped, 
  onFlip, 
  template, 
  question,
  answer,
  ...props 
}: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative w-full h-[400px] cursor-pointer perspective-1000',
        className
      )}
      onClick={onFlip}
      {...props}
    >
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          backgroundColor: template?.backgroundColor || 'white',
          color: template?.textColor || 'black',
          border: template?.borderStyle || '1px solid #e5e7eb',
          fontFamily: template?.fontFamily || 'Arial, sans-serif',
        }}
      >
        {/* Front face */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="flex flex-col items-center justify-center h-full p-6">
            <h3 className="text-xl font-semibold mb-4">Question</h3>
            <p className="text-lg text-center">{question}</p>
          </div>
        </div>

        {/* Back face */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="flex flex-col items-center justify-center h-full p-6">
            <h3 className="text-xl font-semibold mb-4">Answer</h3>
            <p className="text-lg text-center">{answer}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}