import { cn } from '../../lib/utils';

interface CardFaceProps {
  className?: string;
  children: React.ReactNode;
  side?: 'front' | 'back';
}

export function CardFace({ className, children, side = 'front' }: CardFaceProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg',
        'border border-gray-200 dark:border-gray-700 backface-hidden',
        'p-6 flex items-center justify-center',
        side === 'back' ? 'rotate-y-180' : '',
        className
      )}
    >
      {children}
    </div>
  );
}