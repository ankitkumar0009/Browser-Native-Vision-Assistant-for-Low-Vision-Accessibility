import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '../UI/Button';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  previewUrl: string | null;
  onClear: () => void;
}

export function ImageUploader({ onImageSelected, previewUrl, onClear }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelected(file);
      }
    }
  };

  if (previewUrl) {
    return (
      <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden border-4 border-[var(--primary)] shadow-lg bg-[var(--secondary)]">
        <img src={previewUrl} alt="Selected preview" className="w-full h-auto object-contain max-h-[50vh]" />
        <Button 
          variant="destructive" 
          size="icon" 
          className="absolute top-4 right-4 rounded-full"
          onClick={onClear}
          aria-label="Remove image"
        >
          <X size={24} />
        </Button>
      </div>
    );
  }

  return (
    <div 
      className={`w-full max-w-2xl mx-auto border-4 border-dashed rounded-2xl p-12 text-center transition-colors
        ${isDragging ? 'border-[var(--primary)] bg-[var(--primary)]/10' : 'border-[var(--accent)] hover:border-[var(--primary)]'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        aria-label="Upload an image"
      />
      <div className="flex flex-col items-center gap-6">
        <div className="bg-[var(--secondary)] p-6 rounded-full text-[var(--primary)]">
          <Upload size={48} />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">Upload an Image</h3>
          <p className="text-lg text-[var(--secondary-foreground)]">Drag and drop, or click to browse</p>
        </div>
        <Button onClick={() => fileInputRef.current?.click()} size="lg" aria-label="Browse files to upload">
          Browse Files
        </Button>
      </div>
    </div>
  );
}
