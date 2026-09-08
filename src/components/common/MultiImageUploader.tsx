import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, Link as LinkIcon, Plus, Check, Star, RefreshCw } from 'lucide-react';
import { compressImageFile } from './ImageUploader';

interface MultiImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  helperText?: string;
  id?: string;
  compact?: boolean;
}

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  images,
  onChange,
  label = 'Product Photos (उत्पाद की तस्वीरें) - Multi-Image Upload',
  helperText = 'Upload multiple photos (front view, side view, on model). First photo will be the main display cover.',
  id,
  compact = false,
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (fileList: FileList | File[]) => {
    const validFiles = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      alert('Please select valid image files (JPG, PNG, WebP).');
      return;
    }

    setIsProcessing(true);
    try {
      const compressedUrls: string[] = [];
      for (const file of validFiles) {
        const dataUrl = await compressImageFile(file, 1000, 0.85);
        compressedUrls.push(dataUrl);
      }
      onChange([...images, ...compressedUrls]);
    } catch (err) {
      console.error('Failed to process images', err);
      alert('Error processing one or more images.');
    } finally {
      setIsProcessing(false);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    // reset input so same file can be chosen again if needed
    e.target.value = '';
  };

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      onChange([...images, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    onChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const rest = images.filter((_, idx) => idx !== index);
    onChange([selected, ...rest]);
  };

  return (
    <div className={compact ? 'space-y-2' : 'space-y-3'} id={id}>
      {/* Label and Mode Switcher */}
      <div className="flex items-center justify-between">
        <div>
          <label className={`block font-bold text-[#2A1810] ${compact ? 'text-[11px]' : 'text-xs'}`}>
            {label}
          </label>
          <span className="text-[9px] text-[#7A6855]">
            {images.length} photo{images.length === 1 ? '' : 's'} added
          </span>
        </div>
        <div className="flex items-center gap-1 bg-[#FAF6EE] p-0.5 rounded-lg border border-[#E8DFC8]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all flex items-center gap-1 ${
              mode === 'upload'
                ? 'bg-[#720917] text-white shadow-xs'
                : 'text-[#5C4D44] hover:text-[#2A1810]'
            }`}
          >
            <UploadCloud className="w-2.5 h-2.5" />
            <span>Upload Photos</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all flex items-center gap-1 ${
              mode === 'url'
                ? 'bg-[#720917] text-white shadow-xs'
                : 'text-[#5C4D44] hover:text-[#2A1810]'
            }`}
          >
            <LinkIcon className="w-2.5 h-2.5" />
            <span>Link</span>
          </button>
        </div>
      </div>

      {/* Hidden native multiple file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onFileInputChange}
        className="hidden"
      />

      {/* Upload Box / Dropzone */}
      {mode === 'upload' ? (
        images.length === 0 ? (
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-2 text-center cursor-pointer transition-all flex items-center justify-center gap-2.5 ${
              isDragging
                ? 'border-[#720917] bg-[#FAF0D7]/40 ring-2 ring-[#720917]/20 scale-[1.01]'
                : 'border-[#D8CEBE] bg-[#FAF8F5] hover:border-[#720917] hover:bg-white'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-[#FAF0D7] border border-[#E5C158] flex items-center justify-center text-[#720917] shadow-xs shrink-0">
              {isProcessing ? (
                <RefreshCw className="w-3 h-3 animate-spin text-[#720917]" />
              ) : (
                <UploadCloud className="w-3 h-3" />
              )}
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="font-bold text-[11px] text-[#2A1810] truncate">
                {isProcessing ? 'Processing & Compressing...' : 'Upload Photos (Gallery / Camera)'}
              </p>
              <p className="text-[9px] text-[#7A6855] truncate">
                Select multiple photos (1st photo = main cover)
              </p>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded bg-[#4A0E17] text-white text-[9px] font-bold shadow-xs hover:bg-[#681420]">
              Browse
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between p-1.5 rounded-lg border border-dashed border-[#D8CEBE] bg-[#FAF8F5]">
            <div className="flex items-center gap-1.5 text-xs min-w-0">
              <UploadCloud className="w-3 h-3 text-[#720917] shrink-0" />
              <span className="text-[10px] font-medium text-[#5C4D44] truncate">
                {images.length} photo{images.length > 1 ? 's' : ''} added
              </span>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 px-2 py-0.5 rounded bg-[#4A0E17] text-white text-[9px] font-bold hover:bg-[#681420] flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-2.5 h-2.5" />
              <span>Add More</span>
            </button>
          </div>
        )
      ) : (
        <div className="flex gap-1.5 p-1.5 rounded-lg border border-[#D8CEBE] bg-[#FAF8F5]">
          <input
            type="url"
            placeholder="https://... image link"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 px-2 py-0.5 border border-[#D8CEBE] rounded text-[11px] font-mono bg-white focus:outline-none focus:border-[#720917]"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-2.5 py-0.5 rounded bg-[#720917] text-white font-bold text-[10px] hover:bg-[#8C1B2B] shrink-0"
          >
            Add
          </button>
        </div>
      )}

      {/* Uploaded Image Thumbnails Grid */}
      {images.length > 0 && (
        <div>
          <div className={`grid ${compact ? 'grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1.5' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5'}`}>
            {images.map((imgUrl, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-lg overflow-hidden border border-[#D8CEBE] bg-[#FAF6EE] shadow-xs"
              >
                <img
                  src={imgUrl}
                  alt={`Product photo ${index + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Main Cover Tag on first image */}
                {index === 0 ? (
                  <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-[#D4AF37] text-[#2A1810] text-[8px] font-bold flex items-center gap-0.5 shadow-xs">
                    <Star className="w-2 h-2 fill-current" />
                    Cover
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetCover(index)}
                    className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity px-1 py-0.5 rounded bg-black/75 text-white text-[8px] font-medium hover:bg-[#D4AF37] hover:text-[#2A1810]"
                    title="Make this photo the main cover"
                  >
                    Set Cover
                  </button>
                )}

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-xs"
                  title="Remove this photo"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>

                <div className="absolute bottom-0.5 right-0.5 px-0.5 rounded bg-black/60 text-white text-[7px] font-mono">
                  #{index + 1}
                </div>
              </div>
            ))}

            {/* Quick Add Button in thumbnail grid */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-[#D8CEBE] bg-[#FAF8F5] hover:border-[#720917] hover:bg-[#FAF0D7]/30 flex flex-col items-center justify-center text-[#720917] gap-0.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="text-[9px] font-bold">Add</span>
            </button>
          </div>
        </div>
      )}

      {helperText && !compact && (
        <p className="text-[10px] text-[#7A6855] italic">
          {helperText}
        </p>
      )}
    </div>
  );
};
