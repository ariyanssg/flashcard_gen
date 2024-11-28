import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface FlashcardData {
  question: string;
  answer: string;
}

async function compressImage(imageData: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      let width = img.width;
      let height = img.height;
      const maxDimension = 800;
      
      if (width > height && width > maxDimension) {
        height = (height * maxDimension) / width;
        width = maxDimension;
      } else if (height > maxDimension) {
        width = (width * maxDimension) / height;
        height = maxDimension;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      const compressedData = canvas.toDataURL('image/jpeg', 0.6);
      resolve(compressedData);
    };
    
    img.onerror = () => reject(new Error('Failed to load image for compression'));
    img.src = imageData;
  });
}

export async function generateFlashcards(content: string): Promise<FlashcardData[]> {
  if (!content.trim()) {
    throw new Error('Content cannot be empty');
  }

  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `Create 5 educational flashcards from the following content. 
Return ONLY a JSON array with no additional text, comments, or formatting.
Use this exact format: [{"question": "...", "answer": "..."}]

Each question must:
1. Start with: Define, Explain, Compare, List, Describe, What, How, or Why
2. Be specific and test concrete knowledge
3. Focus on one clear concept

Answers must be:
1. Complete and self-contained
2. Factually accurate
3. Concise but thorough

Content to analyze:
${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    const cleanedText = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .replace(/[\r\n]/g, '')
      .trim();
    
    try {
      const parsedData = JSON.parse(cleanedText);
      
      if (!Array.isArray(parsedData)) {
        throw new Error('Invalid response format: expected an array');
      }

      const validatedData = parsedData.filter((card): card is FlashcardData => {
        return (
          typeof card === 'object' &&
          card !== null &&
          typeof card.question === 'string' &&
          typeof card.answer === 'string' &&
          card.question.trim().length > 0 &&
          card.answer.trim().length > 0 &&
          (card.question.startsWith('Define') ||
            card.question.startsWith('Explain') ||
            card.question.startsWith('Compare') ||
            card.question.startsWith('List') ||
            card.question.startsWith('Describe') ||
            card.question.startsWith('What') ||
            card.question.startsWith('How') ||
            card.question.startsWith('Why'))
        );
      });

      if (validatedData.length === 0) {
        throw new Error('No valid flashcards could be generated from the content');
      }

      return validatedData.map(card => ({
        question: card.question.trim(),
        answer: card.answer.trim()
      }));
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      throw new Error('Failed to parse the generated flashcards');
    }
  } catch (error) {
    console.error('Error generating flashcards:', error);
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Invalid or missing API key. Please check your configuration.');
      }
      if (error.message.includes('parse')) {
        throw new Error('Failed to parse the generated flashcards. Please try again.');
      }
    }
    throw new Error('Failed to generate flashcards. Please try again with different content.');
  }
}

export async function extractTextFromImage(imageData: string): Promise<string> {
  if (!imageData) {
    throw new Error('No image data provided');
  }

  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const compressedImageData = await compressImage(imageData);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const parts = [
      {
        text: `Extract and analyze all visible text and content from this image. Include:
1. Main topic or subject
2. Key points and concepts
3. Any specific details or data
4. Important relationships
5. All visible text in its original structure

Format the response in clear, organized sections.`
      },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: compressedImageData.split(',')[1]
        }
      }
    ];

    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text().trim();

    if (!text) {
      throw new Error('No content could be extracted from the image');
    }

    return text;
  } catch (error) {
    console.error('Error extracting text from image:', error);
    if (error instanceof Error) {
      if (error.message.includes('token count')) {
        throw new Error('Image is too complex. Please try a simpler or smaller image.');
      }
      if (error.message.includes('API key')) {
        throw new Error('Invalid or missing API key. Please check your configuration.');
      }
      if (error.message.includes('PERMISSION_DENIED')) {
        throw new Error('Access to the Gemini API was denied. Please check your API key.');
      }
    }
    throw new Error('Failed to process the image. Please try a different image or format.');
  }
}
