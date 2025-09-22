import { useCallback, useEffect, useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InitProps {
  onImageUpload: (src: string) => void;
}

const supportImg = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

const Init = ({ onImageUpload }: InitProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (file && supportImg.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            onImageUpload(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      } else {
        // TODO: Add a toast notification for unsupported file types
        console.error('Unsupported file type');
      }
    },
    [onImageUpload]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      const file = event.dataTransfer.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const file = event.clipboardData?.files?.[0];
      if (file) {
        handleFile(file);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [handleFile]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg gap-4 select-none">
      <div
        className={cn(
          'flex flex-col items-center justify-center w-full p-10 border-2 border-dashed rounded-lg cursor-pointer bg-card text-card-foreground transition-colors',
          isDragging ? 'border-primary' : 'border-border'
        )}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <ImagePlus className="w-12 h-12 text-muted-foreground" />
        <h1 className="mt-4 text-lg font-semibold">Click or Drag Image to This Area</h1>
        <p className="text-sm text-muted-foreground">Or paste an image from your clipboard</p>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept={supportImg.join(',')} className="hidden" />
      </div>
    </div>
  );
};

export default Init;
