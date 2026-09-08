import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, Link as LinkIcon, Check, Sparkles, RefreshCw } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: 'square' | 'wide' | 'banner' | 'auto';
  presets?: { label: string; url: string }[];
  id?: string;
}

/**
 * Utility to compress and resize an uploaded image file using HTML5 canvas
 * Keeps file size lightweight (~100-200KB) to safely persist in browser localStorage
 */
export async function compressImageFile(file: File, maxDimension = 1000, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Draw and compress to JPEG or WebP
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Upload Image / इमेज अपलोड करें',
  helperText = 'Upload from your device (phone gallery, desktop) or paste a link',
  aspectRatio = 'square',
  presets,
  id,
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, etc.).');
      return;
    }

    setIsProcessing(true);
    try {
      const maxDim = aspectRatio === 'banner' ? 1400 : 1000;
      const compressedDataUrl = await compressImageFile(file, maxDim, 0.85);
      onChange(compressedDataUrl);
    } catch (err) {
      console.error('Failed to process image', err);
      alert('Could not read image file. Please try another image.');
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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'banner':
        return 'aspect-[21/9] sm:aspect-[3/1] max-h-48';
      case 'wide':
        return 'aspect-[16/9] max-h-52';
      case 'square':
        return 'aspect-square max-h-48';
      default:
        return 'h-40';
    }
  };

  return (
    <div className="space-y-2 text-xs" id={id}>
      {/* Label and Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className="block font-bold text-[#2A1810]">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-[#FAF6EE] p-0.5 rounded-lg border border-[#E8DFC8]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all flex items-center gap-1 ${
              mode === 'upload'
                ? 'bg-[#720917] text-white shadow-xs'
                : 'text-[#5C4D44] hover:text-[#2A1810]'
            }`}
          >
            <UploadCloud className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all flex items-center gap-1 ${
              mode === 'url'
                ? 'bg-[#720917] text-white shadow-xs'
                : 'text-[#5C4D44] hover:text-[#2A1810]'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Web Link</span>
          </button>
        </div>
      </div>

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileInputChange}
        className="hidden"
      />

      {/* When an image is already selected/uploaded */}
      {value ? (
        <div className="relative rounded-xl border border-[#D8CEBE] overflow-hidden bg-[#FAF6EE] group shadow-xs">
          <div className={`w-full flex items-center justify-center bg-[#1A1A1A] ${getAspectClass()}`}>
            <img
              src={value}
              alt="Uploaded Preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80';
              }}
            />
          </div>

          {/* Floating Actions on Preview */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-[#2A1810] font-bold text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#720917]" />
              <span>Change Image</span>
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>

          {/* Active indicator badge */}
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10px] font-medium flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Image Attached</span>
          </div>
        </div>
      ) : (
        /* Dropzone / Upload Box */
        <>
          {mode === 'upload' ? (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                isDragging
                  ? 'border-[#720917] bg-[#FAF0D7]/40 ring-2 ring-[#720917]/20 scale-[1.01]'
                  : 'border-[#D8CEBE] bg-[#FAF8F5] hover:border-[#720917] hover:bg-white'
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-[#FAF0D7] border border-[#E5C158] flex items-center justify-center text-[#720917] shadow-xs">
                {isProcessing ? (
                  <RefreshCw className="w-5 h-5 animate-spin text-[#720917]" />
                ) : (
                  <UploadCloud className="w-5 h-5" />
                )}
              </div>

              <div>
                <p className="font-bold text-xs text-[#2A1810]">
                  {isProcessing ? 'Processing Image...' : 'Click to Upload or Drag & Drop'}
                </p>
                <p className="text-[10px] text-[#7A6855] mt-0.5">
                  Direct upload from phone gallery or computer (JPG, PNG, WebP)
                </p>
              </div>

              <span className="inline-block mt-1 px-3 py-1 rounded-lg bg-[#4A0E17] text-white text-[11px] font-bold shadow-xs hover:bg-[#681420]">
                Browse Files
              </span>
            </div>
          ) : (
            /* Paste URL Mode */
            <div className="space-y-2 p-3.5 rounded-xl border border-[#D8CEBE] bg-[#FAF8F5]">
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or paste image web link"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-[#D8CEBE] rounded-lg text-xs font-mono bg-white focus:outline-none focus:border-[#720917]"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-3.5 py-2 rounded-lg bg-[#720917] text-white font-bold text-xs hover:bg-[#8C1B2B] shrink-0"
                >
                  Apply
                </button>
              </div>
              <p className="text-[10px] text-[#7A6855]">
                Paste direct URL to a jewellery photo hosted online.
              </p>
            </div>
          )}
        </>
      )}

      {/* Presets if provided */}
      {presets && presets.length > 0 && (
        <div className="pt-1">
          <span className="block text-[10px] font-bold text-[#7A6855] mb-1">
            Quick Presets / तैयार टेम्पलेट्स:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange(preset.url)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors ${
                  value === preset.url
                    ? 'bg-[#720917] text-white border-[#720917]'
                    : 'bg-white text-[#5C4D44] border-[#E8DFC8] hover:bg-[#FAF6EE]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {helperText && (
        <p className="text-[10px] text-[#7A6855] italic">
          {helperText}
        </p>
      )}
    </div>
  );
};
