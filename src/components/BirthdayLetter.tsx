import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { StampBadge, CuteTulip, WashiTape } from "./Motifs";
import { BIRTHDAY_DATA } from "../content";
import { sounds } from "../utils/audio";
import {
  pageContainerVariants,
  fadeUpVariant,
  fastStaggerVariants,
  buttonVariant,
  badgeVariant,
} from "../utils/motionVariants";

interface BirthdayLetterProps {
  onNext: () => void;
}

export const BirthdayLetter: React.FC<BirthdayLetterProps> = ({ onNext }) => {
  const [isUnsealed, setIsUnsealed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = BIRTHDAY_DATA.page4.letterPages;
  const totalPages = pages.length;

  const handleUnseal = () => {
    sounds.playPaperRustle();
    setIsUnsealed(true);
  };

  const handleNextPage = () => {
    sounds.playPop();
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const handlePrevPage = () => {
    sounds.playPop();
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col justify-between p-5 max-w-md mx-auto w-full"
    >
      {/* Letter Header */}
      <motion.div variants={badgeVariant} className="flex items-center justify-between pt-1 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
            A Handwritten Note
          </span>
        </div>
        {isUnsealed && (
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
            <span>Part {currentPage + 1}</span>
            <span className="text-stone-300">/</span>
            <span>{totalPages}</span>
          </div>
        )}
      </motion.div>

      {/* Main Container: Envelope vs Unfolded Letter */}
      <div className="relative my-auto py-2">
        <AnimatePresence mode="wait">
          {!isUnsealed ? (
            /* Closed Envelope with 3D Wax Seal */
            <motion.div
              key="sealed-envelope"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative bg-[#F9F5EC] border-2 border-[#E7DFCF] rounded-2xl p-7 shadow-lg shadow-stone-300/40 min-h-[380px] flex flex-col items-center justify-between overflow-hidden cursor-pointer select-none"
              onClick={handleUnseal}
            >
              {/* Envelope flap lines */}
              <div
                className="absolute inset-x-0 top-0 h-40 pointer-events-none opacity-20 border-b border-[#C7BBA3]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(to bottom, #ECE4D3, #DDD2BE)",
                }}
              />

              <div className="text-center pt-2">
                <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">
                  Confidential BFF Dispatch
                </span>
                <p className="text-base font-serif-display font-medium text-stone-800 mt-1">
                  For: Birthday Girl 🌷
                </p>
              </div>

              {/* Glowing 3D Wax Seal with Tulip Emblem */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="relative my-6 flex flex-col items-center"
              >
                {/* Wax seal body */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 via-rose-500 to-rose-700 shadow-md shadow-rose-900/30 flex items-center justify-center border-4 border-rose-300/60 relative">
                  <div className="absolute inset-1.5 rounded-full border border-rose-200/50" />
                  <CuteTulip size={36} />
                </div>

                {/* Subtle pulsing hint */}
                <motion.div
                  animate={{ y: [0, 3, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mt-4 text-center"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs font-handwriting text-sm">
                    ✨ Tap wax seal to open ✨
                  </span>
                </motion.div>
              </motion.div>

              <div className="text-center pb-2">
                <span className="text-[11px] font-mono text-stone-400">
                  October Archives · Private
                </span>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Stationery Letter Sheet */
            <motion.div
              key="unfolded-letter"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Decorative Washi Tape top center */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                <WashiTape
                  color="pink"
                  rotation={-1.5}
                  className="w-24 h-3.5"
                />
              </div>

              <div className="relative bg-[#FFFDF9] border border-[#EDE8DF] rounded-2xl p-5 sm:p-6 shadow-md shadow-stone-200/50 min-h-[380px] flex flex-col justify-between overflow-hidden">
                {/* Subtle lined paper background */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(transparent, transparent 27px, #E5E1D8 28px)",
                    backgroundPosition: "0 22px",
                  }}
                />

                {/* Stamp in upper corner */}
                <div className="absolute top-4 right-4 z-10 hidden sm:block">
                  <StampBadge text="OCTOBER" subtext="BFF MEMORY" />
                </div>

                {/* Animated Page Content */}
                <div className="relative z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      variants={fastStaggerVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3.5"
                    >
                      {pages[currentPage].content
                        .split("\n\n")
                        .map((para, idx) => (
                          <motion.p
                            key={idx}
                            variants={fadeUpVariant}
                            className={`leading-relaxed text-stone-800 ${
                              currentPage === 0 && idx === 0
                                ? "text-base sm:text-lg font-serif-display font-semibold text-rose-900"
                                : "text-xs sm:text-[13px] font-sans"
                            }`}
                          >
                            {para}
                          </motion.p>
                        ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Stationery Details */}
                <div className="relative z-10 pt-4 mt-auto border-t border-stone-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CuteTulip size={20} />
                    <span className="text-[11px] font-handwriting text-stone-500">
                      {currentPage === totalPages - 1
                        ? "love you 🌷"
                        : "reading in progress..."}
                    </span>
                  </div>

                  {/* Quick Part indicators */}
                  <div className="flex items-center gap-1">
                    {pages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          sounds.playPop();
                          setCurrentPage(i);
                        }}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          i === currentPage
                            ? "w-5 bg-rose-500"
                            : "w-1.5 bg-stone-300 hover:bg-stone-400"
                        }`}
                        aria-label={`Jump to page ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <motion.div variants={buttonVariant} className="pt-2 pb-1 space-y-2">
        {isUnsealed ? (
          <div className="flex items-center gap-2">
            {currentPage > 0 && (
              <button
                onClick={handlePrevPage}
                className="h-12 px-4 rounded-xl border border-stone-300 text-stone-700 bg-white hover:bg-stone-50 active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            <button
              onClick={handleNextPage}
              className="flex-1 h-12 bg-stone-900 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md shadow-stone-900/10 cursor-pointer"
            >
              <span>
                {currentPage < totalPages - 1
                  ? "Read next part →"
                  : "There's more →"}
              </span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleUnseal}
            className="w-full h-12 bg-stone-900 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md shadow-stone-900/10 cursor-pointer"
          >
            <span>Break wax seal & read →</span>
          </button>
        )}

        {/* Quick Skip to Next Page */}
        <button
          onClick={onNext}
          className="w-full py-1 text-[11px] font-mono text-stone-400 hover:text-stone-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>Skip to Tulip Bloom 🌷 →</span>
        </button>
      </motion.div>
    </motion.div>
  );
};
