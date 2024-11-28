// src/components/FileUpload.tsx
interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept: Record<string, string[]>;
  className?: string;
}

export function FileUpload({ onFileSelect, accept, className }: FileUploadProps) {
  return (
    <div className={`border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center ${className}`}>
      <input
        type="file"
        accept={Object.keys(accept).join(',')}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
      >
        <p>Drag and drop your file here, or click to select</p>
        <p className="text-sm mt-2">
          Supported formats: {Object.values(accept).flat().join(', ')}
        </p>
      </label>
    </div>
  );
}