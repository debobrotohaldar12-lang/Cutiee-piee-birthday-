import React, { useState } from "react";
import { X, Upload, RotateCcw, Check, Sparkles, Image as ImageIcon } from "lucide-react";
import { PhotoData } from "./PhotoCollage";
import { compressImageFile } from "../utils/imageHelper";

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  herName: string;
  onUpdateName: (name: string) => void;
  photos: PhotoData[];
  onUpdatePhoto: (id: number, url: string) => void;
  onResetPhotos: () => void;
  currentPage: number;
  onJumpToPage: (page: number) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  herName,
  onUpdateName,
  photos,
  onUpdatePhoto,
  onResetPhotos,
  currentPage,
  onJumpToPage,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImageFile(file);
      if (compressed) {
        onUpdatePhoto(id, compressed);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-rose-500" />
            <h3 className="font-serif-display font-semibold text-stone-900 text-base">
              Personalize Website 👽🌷
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-5 text-left">
          {/* Her Name Input */}
          <div>
            <label className="block text-xs font-mono font-medium text-stone-700 mb-1">
              HER NAME (Page 11 Finale)
            </label>
            <input
              type="text"
              value={herName}
              onChange={(e) => onUpdateName(e.target.value)}
              placeholder="e.g. Sneha"
              className="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900"
            />
            <p className="text-[11px] text-stone-400 mt-1">
              Tip: You can also edit <code className="bg-stone-100 px-1 py-0.5 rounded">HER_NAME</code> in <code className="bg-stone-100 px-1 py-0.5 rounded">src/content.ts</code>
            </p>
          </div>

          {/* 4 Photos Upload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-medium text-stone-700">
                HER 4 PHOTOS (Page 3 Collage)
              </label>
              <button
                onClick={onResetPhotos}
                className="text-[11px] text-stone-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={11} />
                <span>Reset</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="border border-stone-200 rounded-xl p-2 bg-stone-50 flex flex-col justify-between"
                >
                  <div className="aspect-[4/5] bg-stone-200/70 rounded-lg overflow-hidden mb-2 relative flex items-center justify-center">
                    {photo.url ? (
                      <img
                        src={photo.url}
                        alt={`Photo ${photo.id}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={20} className="text-stone-400" />
                    )}
                  </div>
                  <p className="text-[10px] text-stone-600 line-clamp-1 mb-1 font-medium">
                    #{photo.id}: {photo.caption}
                  </p>
                  <label className="w-full py-1 px-2 bg-white hover:bg-stone-100 border border-stone-200 rounded-md text-[10px] text-center font-medium text-stone-700 flex items-center justify-center gap-1 cursor-pointer">
                    <Upload size={10} />
                    <span>{photo.url ? "Change" : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(photo.id, e)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Page Preview / Jump */}
          <div>
            <label className="block text-xs font-mono font-medium text-stone-700 mb-1.5">
              TEST / JUMP TO PAGE (1 - 14)
            </label>
            <div className="grid grid-cols-7 gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    onJumpToPage(p);
                    onClose();
                  }}
                  className={`py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                    currentPage === p
                      ? "bg-stone-900 text-white font-bold"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.set("name", herName.trim());
              url.searchParams.delete("page"); // Recipient starts at beginning (Page 1)
              navigator.clipboard?.writeText(url.toString());
              setCopied(true);
              setTimeout(() => setCopied(false), 2200);
            }}
            className="px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <span>✅ Link Copied!</span> : <span>🔗 Copy Share Link</span>}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-medium hover:bg-stone-800 cursor-pointer"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
