import { useState } from 'react';
import { FileText, Image, Type } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { FileUpload } from '../components/FileUpload';
import { ProcessingStatus } from '../components/ProcessingStatus';
import { generateFlashcards, extractTextFromImage } from '../lib/gemini';
import mammoth from 'mammoth';

type InputMode = 'text' | 'image' | 'document';
type ProcessingState = {
  status: 'idle' | 'processing' | 'success' | 'error';
  message: string;
};

export default function Create() {
  const addFlashcard = useStore((state) => state.addFlashcard);
  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<ProcessingState>({
    status: 'idle',
    message: '',
  });

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setProcessing({ status: 'processing', message: 'Processing your file...' });

    try {
      let extractedText = '';

      if (inputMode === 'image') {
        const base64 = await fileToBase64(selectedFile);
        extractedText = await extractTextFromImage(base64);
      } else if (inputMode === 'document') {
        if (selectedFile.name.endsWith('.docx')) {
          const arrayBuffer = await selectedFile.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          extractedText = result.value;
        } else if (selectedFile.name.endsWith('.txt')) {
          extractedText = await selectedFile.text();
        }
      }

      setContent(extractedText);
      setProcessing({ status: 'success', message: 'File processed successfully!' });

      if (extractedText.trim()) {
        await handleGenerateFlashcards(extractedText);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      setProcessing({
        status: 'error',
        message: error instanceof Error ? error.message : 'Error processing file. Please try again.',
      });
    }
  };

  const handleGenerateFlashcards = async (text: string) => {
    if (!text.trim()) return;

    setProcessing({ status: 'processing', message: 'Generating flashcards...' });

    try {
      const flashcards = await generateFlashcards(text);
      flashcards.forEach(card => addFlashcard(card));
      setProcessing({ status: 'success', message: 'Flashcards generated successfully!' });
    } catch (error) {
      console.error('Error generating flashcards:', error);
      setProcessing({
        status: 'error',
        message: error instanceof Error ? error.message : 'Error generating flashcards. Please try again.',
      });
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Create Flashcards
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload content or enter text to automatically generate flashcards
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Button
          variant={inputMode === 'text' ? 'primary' : 'outline'}
          onClick={() => setInputMode('text')}
        >
          <Type className="w-4 h-4 mr-2" />
          Text
        </Button>
        <Button
          variant={inputMode === 'image' ? 'primary' : 'outline'}
          onClick={() => setInputMode('image')}
        >
          <Image className="w-4 h-4 mr-2" />
          Image
        </Button>
        <Button
          variant={inputMode === 'document' ? 'primary' : 'outline'}
          onClick={() => setInputMode('document')}
        >
          <FileText className="w-4 h-4 mr-2" />
          Document
        </Button>
      </div>

      {inputMode === 'text' ? (
        <div className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 rounded-lg border border-gray-300 
              dark:border-gray-700 p-4 focus:ring-2 
              focus:ring-blue-500 focus:border-transparent 
              dark:bg-gray-800 dark:text-white"
            placeholder="Enter your text content here..."
          />
        </div>
      ) : (
        <FileUpload
          onFileSelect={handleFileSelect}
          accept={
            inputMode === 'image'
              ? { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }
              : {
                  'text/plain': ['.txt'],
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                }
          }
          className="mb-4"
        />
      )}

      {file && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Selected file: {file.name}
        </p>
      )}

      {processing.status !== 'idle' && (
        <ProcessingStatus
          status={processing.status}
          message={processing.message}
        />
      )}

      {inputMode === 'text' && (
        <Button
          className="w-full mt-6"
          onClick={() => handleGenerateFlashcards(content)}
          disabled={!content.trim() || processing.status === 'processing'}
        >
          Generate Flashcards
        </Button>
      )}
    </div>
  );
}