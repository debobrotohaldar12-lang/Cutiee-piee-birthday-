import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Upload, X, ZoomIn, Sparkles } from "lucide-react";
import { WashiTape, CuteTulip } from "./Motifs";
import { sounds } from "../utils/audio";
import { compressImageFile } from "../utils/imageHelper";
import {
  pageContainerVariants,
  fadeUpVariant,
  headingVariant,
  badgeVariant,
  cardVariant,
  buttonVariant,
  fastStaggerVariants,
} from "../utils/motionVariants";

export interface PhotoData {
  id: number;
  caption: string;
  url: string;
  rotation: number;
  tapeColor: "pink" | "green" | "cream";
}

interface PhotoCollageProps {
  photos: PhotoData[];
  onUpdatePhoto: (id: number, newUrl: string) => void;
  onNext: () => void;
}

export const PhotoCollage: React.FC<PhotoCollageProps> = ({
  photos,
  onUpdatePhoto,
  onNext,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const compressedUrl = await compressImageFile(file);
        if (compressedUrl) {
          onUpdatePhoto(id, compressedUrl);
          setEditingPhotoId(null);
          setSelectedPhoto((prev) => (prev && prev.id === id ? { ...prev, url: compressedUrl } : prev));
        }
      } catch (err) {
        console.error("Error processing photo:", err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col justify-between p-5 max-w-md mx-auto w-full"
    >
      {/* Header section */}
      <div className="text-center pt-2 pb-3">
        <motion.div
          variants={badgeVariant}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-xs font-mono mb-2"
        >
          <span>MEMORIES ARCHIVE</span>
          <span className="text-rose-500">●</span>
          <span>4 EXHIBITS</span>
        </motion.div>
        <motion.h2
          variants={headingVariant}
          className="text-2xl font-serif-display font-semibold text-stone-900 tracking-tight"
        >
          Strictly Unfiltered Evidence
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-xs text-stone-500 mt-1">
          Tap any polaroid to enlarge or replace with your picture
        </motion.p>
      </div>

      {/* 2x2 Polaroid Grid with slight organic tilt */}
      <motion.div
        variants={fastStaggerVariants}
        className="grid grid-cols-2 gap-3.5 my-auto py-2"
      >
        {photos.map((item, index) => (
          <motion.div
            key={item.id}
            variants={cardVariant}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.16}
            whileHover={{ scale: 1.03, rotate: 0 }}
            whileTap={{ scale: 0.98 }}
            style={{ transform: `rotate(${item.rotation}deg)` }}
            className="group relative bg-white p-2.5 pt-3 pb-3 rounded-md shadow-md border border-stone-200/80 cursor-pointer transition-shadow hover:shadow-lg touch-none"
            onClick={() => {
              sounds.playPop();
              setSelectedPhoto(item);
            }}
          >
            {/* Washi tape header */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
              <WashiTape color={item.tapeColor} rotation={index % 2 === 0 ? -2 : 3} className="w-16 h-3" />
            </div>

            {/* Photo container */}
            <div className="relative aspect-[4/5] bg-stone-100 rounded-sm overflow-hidden border border-stone-200/50 flex items-center justify-center">
              {item.url ? (
                <img
                  src={item.url}
                  alt={`Memory ${item.id}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const fallbackUrls: Record<number, string> = {
                      1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
                      2: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
                      3: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=80",
                      4: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
                    };
                    const fallback = fallbackUrls[item.id];
                    if (fallback && e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              ) : (
                /* Styled fallback Polaroid slot */
                <div className="w-full h-full p-3 flex flex-col items-center justify-center text-center bg-gradient-to-b from-stone-50 to-stone-100 text-stone-400">
                  <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-stone-200 flex items-center justify-center mb-2 text-rose-400 group-hover:scale-110 transition-transform">
                    <Camera size={18} />
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">Exhibit #{item.id}</span>
                  <span className="text-[10px] text-stone-400 mt-1 font-handwriting text-sm">
                    Tap to view / upload
                  </span>
                </div>
              )}

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <span className="bg-white/90 text-stone-800 p-1.5 rounded-full shadow-xs">
                  <ZoomIn size={14} />
                </span>
              </div>
            </div>

            {/* Handwritten Caption */}
            <div className="mt-2.5 px-0.5 text-center min-h-[44px] flex items-center justify-center">
              <p className="text-xs sm:text-sm font-handwriting text-stone-800 leading-snug line-clamp-2">
                {item.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* After Photos Callout */}
      <motion.div
        variants={fadeUpVariant}
        className="my-3 p-3.5 bg-rose-50/70 border border-rose-200/60 rounded-xl text-center shadow-xs"
      >
        <p className="text-xs text-stone-600 font-medium">
          Waise photos toh kaafi hain... bas ek cheez missing hai.
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-1.5 text-stone-900 font-medium text-xs sm:text-sm">
          <span>I am still waiting... jb ham saath mein photo lenge</span>
          <span className="text-base leading-none">🫠🌷</span>
        </div>
      </motion.div>

      {/* Primary Action Button */}
      <motion.div variants={buttonVariant} className="pt-2 pb-1">
        <button
          onClick={onNext}
          className="w-full h-12 bg-stone-900 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md shadow-stone-900/10 cursor-pointer"
        >
          <span>Keep going</span>
          <span aria-hidden="true">→</span>
        </button>
      </motion.div>

      {/* Modal / Lightbox for viewing & quick replacing photo */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-4 max-w-sm w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200"
              >
                <X size={18} />
              </button>

              <div className="aspect-[4/5] bg-stone-100 rounded-lg overflow-hidden border border-stone-200 mb-3 flex items-center justify-center">
                {selectedPhoto.url ? (
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6 text-stone-400">
                    <Camera size={36} className="mx-auto mb-2 text-stone-300" />
                    <p className="text-sm font-medium text-stone-600">No Photo Uploaded Yet</p>
                    <p className="text-xs text-stone-400 mt-1">Upload her photo for this memory below</p>
                  </div>
                )}
              </div>

              <div className="text-center mb-4">
                <p className="font-handwriting text-lg text-stone-800">
                  {selectedPhoto.caption}
                </p>
              </div>

              <div className="border-t border-stone-100 pt-3 flex items-center gap-2">
                <label className="flex-1 h-10 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                  <Upload size={14} />
                  <span>
                    {isUploading
                      ? "Uploading..."
                      : selectedPhoto.url
                      ? "Replace Photo"
                      : "Upload Her Photo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                    onChange={(e) => handleFileUpload(selectedPhoto.id, e)}
                  />
                </label>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="h-10 px-4 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
