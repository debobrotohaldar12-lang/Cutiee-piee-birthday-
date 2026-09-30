import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Wind, ChevronRight, Check, Gift } from "lucide-react";
import { CuteAlien, CuteTulip } from "./Motifs";
import { sounds } from "../utils/audio";
import {
  pageContainerVariants,
  fadeUpVariant,
  headingVariant,
  badgeVariant,
  cardVariant,
  buttonVariant,
} from "../utils/motionVariants";

interface BirthdayCakeCeremonyProps {
  herName: string;
  onNext: () => void;
}

export const BirthdayCakeCeremony: React.FC<BirthdayCakeCeremonyProps> = ({
  herName,
  onNext,
}) => {
  const [candleLit, setCandleLit] = useState(true);
  const [isSliced, setIsSliced] = useState(false);
  const [sliceProgress, setSliceProgress] = useState(0); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);

  const cakeAreaRef = useRef<HTMLDivElement>(null);

  // Single-tap blow out
  const handleBlowCandle = () => {
    if (!candleLit) return;
    sounds.playBlowCandle();
    setCandleLit(false);
  };

  // Complete the slice
  const completeSlice = useCallback(() => {
    if (isSliced) return;
    setIsSliced(true);
    setIsDragging(false);
    setSliceProgress(100);
    sounds.playCakeSlice();
  }, [isSliced]);

  // Handle pointer down (touch or mouse)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (candleLit || isSliced) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    updateProgress(e.clientY);
  };

  // Handle pointer drag
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isSliced) return;
    updateProgress(e.clientY);
  };

  // Handle pointer release
  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (sliceProgress >= 60) {
      completeSlice();
    } else {
      setSliceProgress(0);
    }
  };

  const updateProgress = (clientY: number) => {
    if (!cakeAreaRef.current) return;
    const rect = cakeAreaRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const progress = Math.max(0, Math.min(100, (relativeY / rect.height) * 100));
    setSliceProgress(progress);

    if (progress >= 85) {
      completeSlice();
    }
  };

  // Full SVG cake illustration elements
  const renderCakeGraphics = () => (
    <g>
      {/* 1. Cake Stand / Plate */}
      <ellipse cx="150" cy="180" rx="125" ry="18" fill="#E2E8F0" />
      <ellipse cx="150" cy="178" rx="120" ry="15" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M110 182 L105 200 L195 200 L190 182 Z" fill="#E2E8F0" />
      <ellipse cx="150" cy="200" rx="45" ry="7" fill="#CBD5E1" />

      {/* 2. Bottom Tier - Chocolate & Strawberry Cream Sponge */}
      {/* Base shadow */}
      <ellipse cx="150" cy="165" rx="100" ry="14" fill="#451A03" opacity="0.2" />

      {/* Bottom sponge body */}
      <path
        d="M50 120 C50 120 50 155 50 155 C50 168 95 178 150 178 C205 178 250 168 250 155 C250 155 250 120 250 120 Z"
        fill="#5C2C16"
      />
      {/* Cream Layer Inside Bottom Sponge */}
      <path
        d="M50 138 C50 148 95 158 150 158 C205 158 250 148 250 138 L250 144 C250 154 205 164 150 164 C95 164 50 154 50 144 Z"
        fill="#F472B6"
      />
      <path
        d="M50 147 C50 155 95 163 150 163 C205 163 250 155 250 147 L250 150 C250 158 205 166 150 166 C95 166 50 158 50 150 Z"
        fill="#FEF08A"
      />

      {/* Bottom tier top surface */}
      <ellipse cx="150" cy="120" rx="100" ry="15" fill="#78350F" />
      <ellipse cx="150" cy="119" rx="98" ry="14" fill="#FDE68A" opacity="0.6" />

      {/* 3. Top Tier - Vanilla Birthday Sponge with Pink Glaze */}
      <path
        d="M75 75 C75 75 75 115 75 115 C75 126 108 134 150 134 C192 134 225 126 225 115 C225 115 225 75 225 75 Z"
        fill="#D97706"
      />
      {/* Vanilla Cream center */}
      <path
        d="M75 92 C75 101 108 109 150 109 C192 109 225 101 225 92 L225 97 C225 106 192 114 150 114 C108 114 75 106 75 97 Z"
        fill="#FEF9C3"
      />

      {/* Top Tier Glossy Vanilla Icing Drips */}
      <path
        d="M75 75 
           Q85 92 95 76 
           Q105 95 115 78 
           Q130 98 145 78 
           Q160 98 175 78 
           Q190 95 205 76 
           Q215 90 225 75 
           C225 62 192 52 150 52 
           C108 52 75 62 75 75 Z"
        fill="#FFF1F2"
        stroke="#FBCFE8"
        strokeWidth="1.5"
      />

      {/* Frosting Scallop Details */}
      <ellipse cx="150" cy="65" rx="72" ry="13" fill="#FFF7ED" />

      {/* 4. Strawberries on Top */}
      {/* Strawberry 1 (Left) */}
      <g transform="translate(95, 52)">
        <path d="M0 6 C-3 0 0 -8 7 -8 C14 -8 17 0 14 6 C11 12 3 14 0 6 Z" fill="#EF4444" />
        <ellipse cx="4" cy="-1" rx="1" ry="1.5" fill="#FEE2E2" />
        <path d="M4 -7 L7 -10 L10 -7" stroke="#16A34A" strokeWidth="1.5" fill="none" />
      </g>

      {/* Strawberry 2 (Center Left) */}
      <g transform="translate(122, 56)">
        <path d="M0 7 C-3 0 0 -9 8 -9 C16 -9 19 0 16 7 C13 14 3 16 0 7 Z" fill="#DC2626" />
        <ellipse cx="5" cy="0" rx="1.2" ry="2" fill="#FEE2E2" />
        <path d="M5 -8 L8 -12 L11 -8" stroke="#16A34A" strokeWidth="2" fill="none" />
      </g>

      {/* Strawberry 3 (Center Right) */}
      <g transform="translate(155, 56)">
        <path d="M0 7 C-3 0 0 -9 8 -9 C16 -9 19 0 16 7 C13 14 3 16 0 7 Z" fill="#DC2626" />
        <ellipse cx="5" cy="0" rx="1.2" ry="2" fill="#FEE2E2" />
        <path d="M5 -8 L8 -12 L11 -8" stroke="#16A34A" strokeWidth="2" fill="none" />
      </g>

      {/* Strawberry 4 (Right) */}
      <g transform="translate(185, 52)">
        <path d="M0 6 C-3 0 0 -8 7 -8 C14 -8 17 0 14 6 C11 12 3 14 0 6 Z" fill="#EF4444" />
        <ellipse cx="4" cy="-1" rx="1" ry="1.5" fill="#FEE2E2" />
        <path d="M4 -7 L7 -10 L10 -7" stroke="#16A34A" strokeWidth="1.5" fill="none" />
      </g>

      {/* Sprinkles & Pearls */}
      <circle cx="112" cy="68" r="2" fill="#F43F5E" />
      <circle cx="138" cy="71" r="2" fill="#EAB308" />
      <circle cx="170" cy="71" r="2" fill="#F43F5E" />
      <circle cx="180" cy="67" r="2" fill="#3B82F6" />
    </g>
  );

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col justify-between p-5 max-w-md mx-auto w-full text-center select-none"
    >
      {/* Header */}
      <div className="pt-2 flex items-center justify-between">
        <motion.div
          variants={badgeVariant}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono font-semibold"
        >
          <span>THE SACRED RITUAL 🎂</span>
        </motion.div>

        {/* Skip to Finale */}
        <button
          onClick={onNext}
          className="text-[11px] font-mono text-stone-400 hover:text-stone-800 flex items-center gap-0.5 cursor-pointer py-1 px-2 rounded-md hover:bg-stone-100 transition-colors"
        >
          <span>Skip to Finale</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Main Cake Stage */}
      <div className="my-auto py-2 space-y-2">
        <div className="space-y-1">
          <motion.h2
            variants={headingVariant}
            className="text-2xl sm:text-3xl font-serif-display font-semibold text-stone-900"
          >
            {candleLit
              ? "Make A Birthday Wish ✨"
              : isSliced
              ? "Surprise Inside Unlocked! 🎉"
              : "Drag Knife To Slice Cake 🔪"}
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-xs sm:text-sm text-stone-600 font-body max-w-xs mx-auto"
          >
            {candleLit
              ? "Aankhein band karke ek wish maango, aur candle pe tap karo!"
              : isSliced
              ? `Happy Birthday ${herName}! Bestie specimen revealed inside! 👽`
              : "Center line pe ungli se knife ko neeche drag karo cake kaatne ke liye!"}
          </motion.p>
        </div>

        {/* High-Fidelity Interactive Drag-to-Slice Cake Canvas */}
        <motion.div
          variants={cardVariant}
          className="relative bg-gradient-to-b from-[#FFFDF9] to-[#FBF8F2] border border-stone-200/90 rounded-3xl p-4 shadow-sm max-w-[340px] mx-auto overflow-hidden"
        >
          {/* Interactive Cake Area (Touch & Mouse Drag Container) */}
          <div
            ref={cakeAreaRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className={`relative w-[300px] h-[220px] mx-auto touch-none select-none ${
              !candleLit && !isSliced ? "cursor-ns-resize" : "cursor-default"
            }`}
          >
            {/* Candle on Top */}
            <div
              onClick={handleBlowCandle}
              className="absolute top-1 left-1/2 -translate-x-1/2 z-30 cursor-pointer flex flex-col items-center group"
              title="Click to blow candle"
            >
              {candleLit ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="absolute -top-2 w-8 h-8 rounded-full bg-amber-300 blur-sm pointer-events-none"
                  />
                  <motion.svg
                    animate={{ scaleY: [1, 1.15, 0.95, 1], rotate: [-2, 3, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
                    width="18"
                    height="24"
                    viewBox="0 0 18 24"
                    className="filter drop-shadow-[0_2px_4px_rgba(245,158,11,0.6)]"
                  >
                    <path
                      d="M9 0C9 0 18 8 18 15C18 19.9706 13.9706 24 9 24C4.02944 24 0 19.9706 0 15C0 8 9 0 9 0Z"
                      fill="url(#candle_fire)"
                    />
                    <path
                      d="M9 7C9 7 13 12 13 16C13 18.2 11.2 20 9 20C6.8 20 5 18.2 5 16C5 12 9 7 9 7Z"
                      fill="#FEF9C3"
                    />
                    <defs>
                      <linearGradient id="candle_fire" x1="9" y1="0" x2="9" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F59E0B" />
                        <stop offset="0.6" stopColor="#EF4444" />
                        <stop offset="1" stopColor="#B91C1C" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.9, 0], y: [-2, -20] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.5 }}
                  className="h-6 text-stone-400 font-mono text-[11px] font-bold"
                >
                  ~ 💨 ~
                </motion.div>
              )}

              {/* Candle Body */}
              <div className="w-3 h-8 bg-gradient-to-r from-rose-300 via-rose-100 to-rose-300 rounded-t-sm border border-rose-400/60 shadow-xs relative">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #F43F5E 0, #F43F5E 2px, transparent 2px, transparent 5px)",
                  }}
                />
              </div>
            </div>

            {/* HIDDEN SURPRISE REVEALED IN THE GAP WHEN SLICED */}
            <AnimatePresence>
              {isSliced && (
                <motion.div
                  initial={{ scale: 0.1, y: 25, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 18, delay: 0.1 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
                >
                  <div className="p-3 bg-white/95 backdrop-blur-xs border-2 border-rose-400 rounded-2xl shadow-xl max-w-[210px] text-center pointer-events-auto">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <CuteAlien size={34} />
                      <span className="text-xl">🎉</span>
                      <CuteTulip size={28} />
                    </div>
                    <span className="text-[10px] font-mono font-black text-rose-700 uppercase tracking-wider block">
                      SECRET SURPRISE UNLOCKED!
                    </span>
                    <p className="text-[11px] font-body text-stone-800 mt-0.5 leading-snug">
                      "Aadha cake mera, aur treat ka pehla bill tumhara! 😋"
                    </p>
                    <div className="mt-1.5 inline-flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[10px] font-mono font-bold text-amber-800">
                      <Gift size={11} />
                      <span>Permanent Bestie Pass 🎟️</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* HIGH-FIDELITY SPLIT SVG CAKE USING PRECISE SVG CLIPPING */}
            <svg viewBox="0 0 300 220" className="w-full h-full">
              <defs>
                {/* Left Clip: x from 0 to 150 */}
                <clipPath id="leftCakeHalf">
                  <rect x="0" y="0" width="150" height="220" />
                </clipPath>
                {/* Right Clip: x from 150 to 300 */}
                <clipPath id="rightCakeHalf">
                  <rect x="150" y="0" width="150" height="220" />
                </clipPath>
              </defs>

              {/* LEFT HALF OF CAKE */}
              <motion.g
                clipPath="url(#leftCakeHalf)"
                animate={
                  isSliced
                    ? { x: -36, rotate: -4, originX: "75px", originY: "180px" }
                    : { x: 0, rotate: 0 }
                }
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                {renderCakeGraphics()}
              </motion.g>

              {/* RIGHT HALF OF CAKE */}
              <motion.g
                clipPath="url(#rightCakeHalf)"
                animate={
                  isSliced
                    ? { x: 36, rotate: 4, originX: "225px", originY: "180px" }
                    : { x: 0, rotate: 0 }
                }
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                {renderCakeGraphics()}
              </motion.g>
            </svg>

            {/* DRAGGABLE KNIFE & SLICE GUIDELINE (ACTIVE AFTER CANDLE BLOWN) */}
            {!candleLit && !isSliced && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                {/* Dotted Center Incision Line */}
                <div className="h-36 w-0.5 border-l-2 border-dashed border-rose-400 relative">
                  {/* Glowing cut progress bar */}
                  <div
                    className="absolute top-0 inset-x-0 w-1 bg-gradient-to-b from-rose-500 to-amber-400 rounded-full shadow-[0_0_8px_#F43F5E] transition-all"
                    style={{ height: `${sliceProgress}%` }}
                  />
                </div>

                {/* Animated Silver Chef Knife */}
                <motion.div
                  className="absolute pointer-events-none flex items-center justify-center drop-shadow-md"
                  style={{
                    top: `${Math.max(12, Math.min(80, sliceProgress))}%`,
                    transform: "translateY(-50%)",
                  }}
                  animate={
                    !isDragging
                      ? { y: [-5, 5, -5] }
                      : { scale: 1.1 }
                  }
                  transition={
                    !isDragging
                      ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                      : { duration: 0.1 }
                  }
                >
                  <svg width="68" height="30" viewBox="0 0 68 30" fill="none">
                    {/* Knife Blade */}
                    <path
                      d="M18 11 L62 6 C65 11 62 21 52 22 L18 16 Z"
                      fill="#E2E8F0"
                      stroke="#94A3B8"
                      strokeWidth="1.2"
                    />
                    {/* Silver Glint */}
                    <path d="M20 12 L58 8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
                    {/* Ergonomic Handle */}
                    <rect x="0" y="9" width="18" height="9" rx="3" fill="#78350F" />
                    <circle cx="5" cy="13.5" r="1.2" fill="#D97706" />
                    <circle cx="13" cy="13.5" r="1.2" fill="#D97706" />
                  </svg>
                </motion.div>

                {/* Draggable Callout Badge */}
                <div className="absolute bottom-2 bg-stone-900/90 text-white px-3 py-1 rounded-full text-[10px] font-mono tracking-wider shadow-md">
                  <span>👇 Drag knife down to slice!</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Fallback & Interactive Action Buttons */}
          <div className="mt-2 pt-3 border-t border-stone-100 space-y-2">
            {candleLit ? (
              <button
                onClick={handleBlowCandle}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-mono flex items-center justify-center gap-2 font-bold transition-all active:scale-98 cursor-pointer shadow-xs"
              >
                <Wind size={15} className="text-amber-600" />
                <span>Blow Out Candle 🕯️ (Click Here)</span>
              </button>
            ) : !isSliced ? (
              <button
                onClick={completeSlice}
                className="w-full py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-mono flex items-center justify-center gap-2 font-bold transition-all active:scale-98 cursor-pointer shadow-xs"
              >
                <span>🔪 Tap To Slice Cake (Or Drag Down)</span>
              </button>
            ) : (
              <div className="py-1 px-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5 text-emerald-800 text-xs font-mono font-bold">
                <Check size={14} className="text-emerald-600" />
                <span>Cake Sliced in Half & Surprise Revealed! 🎉</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Primary Action Button */}
      <motion.div variants={buttonVariant} className="pb-3">
        <button
          onClick={() => {
            if (candleLit) {
              handleBlowCandle();
            } else if (!isSliced) {
              completeSlice();
            } else {
              onNext();
            }
          }}
          className="w-full h-12 bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md shadow-stone-900/10 cursor-pointer"
        >
          {candleLit ? (
            <span>Blow Candle First 🕯️</span>
          ) : !isSliced ? (
            <span>Slice Cake In Half 🔪</span>
          ) : (
            <span className="font-bold">The Grand Finale →</span>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
};
