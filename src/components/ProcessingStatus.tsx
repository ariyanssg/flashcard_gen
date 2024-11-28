// src/components/ProcessingStatus.tsx
interface ProcessingStatusProps {
  status: 'idle' | 'processing' | 'success' | 'error';
  message: string;
}

export function ProcessingStatus({ status, message }: ProcessingStatusProps) {
  const statusStyles = {
    processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    error: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <div className={`mt-4 p-4 rounded-lg ${statusStyles[status]}`}>
      {message}
    </div>
  );
}