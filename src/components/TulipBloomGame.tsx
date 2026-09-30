import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, RotateCcw, Flame } from "lucide-react";
import { sounds } from "../utils/audio";
import confetti from "canvas-confetti";

interface TulipBloomGameProps {
  herName: string;
  onNext: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const TulipBloomGame: React.FC<TulipBloomGameProps> = ({ herName, onNext }) => {
  const [growth, setGrowth] = useState<number>(10);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [hasBloomed, setHasBloomed] = useState<boolean>(false);
  const [tapSpeed, setTapSpeed] = useState<number>(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapTimeRef = useRef<number>(Date.now());
  const particleIdRef = useRef<number>(0);

  // Spawn floating particle near the sprout
  const spawnParticle = () => {
    const emojis = ["✨", "🌷", "💖", "🌸", "⭐", "🌱"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const newParticle: Particle = {
      id: particleIdRef.current++,
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 40,
      emoji: randomEmoji,
    };
    setParticles((prev) => [...prev.slice(-12), newParticle]);
  };

  // Handle single tap
  const handleTap = (e?: React.MouseEvent | React.TouchEvent) => {
    const now = Date.now();
    const timeDiff = Math.max(50, now - lastTapTimeRef.current);
    lastTapTimeRef.current = now;

    // Faster taps give higher speed multiplier!
    const speedBoost = Math.min(10, Math.max(1, Math.round(1000 / timeDiff)));
    setTapSpeed(speedBoost);

    sounds.playPop();
    spawnParticle();

    setGrowth((prev) => {
      const next = Math.min(100, prev + 5 + speedBoost * 0.8);
      if (next >= 100 && !hasBloomed) {
        triggerBloomCelebration();
      }
      return next;
    });
  };

  // Handle start hold
  const handleHoldStart = () => {
    setIsHolding(true);
    handleTap();

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    holdIntervalRef.current = setInterval(() => {
      spawnParticle();
      sounds.playChime();
      setGrowth((prev) => {
        const next = Math.min(100, prev + 3);
        if (next >= 100) {
          triggerBloomCelebration();
          if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        }
        return next;
      });
    }, 60);
  };

  // Handle end hold
  const handleHoldEnd = () => {
    setIsHolding(false);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  const triggerBloomCelebration = () => {
    setHasBloomed(true);
    sounds.playChime();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.55 },
      colors: ["#fda4af", "#f43f5e", "#fbbf24", "#34d399", "#c084fc"],
    });
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playPop();
    setGrowth(10);
    setHasBloomed(false);
    setTapSpeed(0);
  };

  // Calculate dynamic colors and scale based on growth (strictly bounded inside frame)
  const scale = 0.7 + (growth / 100) * 0.35; // scales from 0.7x up to 1.05x max
  const stemHeight = 16 + (growth / 100) * 42; // stem grows from 16px to 58px

  // Dynamic petal color interpolations
  const getPetalGradient = () => {
    if (growth < 30) return "url(#earlySproutGrad)";
    if (growth < 70) return "url(#midBloomGrad)";
    return "url(#giantBloomGrad)";
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 max-w-md mx-auto w-full select-none text-center">
      {/* Top Header */}
      <div className="pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-mono font-bold tracking-wider uppercase mb-1">
          <Sparkles size={11} className="text-rose-500" />
          <span>MINI-GAME // NURTURE THE TULIP</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif-display font-semibold text-stone-900">
          Make The Tulip Bloom 🌷
        </h2>
        <p className="text-xs text-stone-500 font-body mt-0.5">
          Tap or hold the sprout repeatedly to grow a giant flower for {herName}!
        </p>
      </div>

      {/* Main Interactive Terrarium Stage */}
      <div className="my-auto py-1 flex flex-col items-center">
        {/* Bloom Meter Indicator */}
        <div className="w-full max-w-[260px] mb-2.5">
          <div className="flex justify-between items-center text-[10px] font-mono text-stone-500 mb-1">
            <span className="flex items-center gap-1">
              <span>GROWTH:</span>
              <strong className="text-stone-800">{Math.round(growth)}%</strong>
            </span>
            {tapSpeed > 3 && (
              <span className="text-rose-600 font-bold flex items-center gap-0.5 animate-pulse">
                <Flame size={10} /> Fast Tap! 🔥
              </span>
            )}
            {hasBloomed && (
              <span className="text-emerald-600 font-bold">MAX BLOOM 🌸</span>
            )}
          </div>
          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden p-0.5">
            <motion.div
              className={`h-full rounded-full transition-all duration-150 ${
                growth >= 100
                  ? "bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400"
                  : "bg-rose-500"
              }`}
              style={{ width: `${growth}%` }}
            />
          </div>
        </div>

        {/* Sprout & Terrarium Box (Tappable Area - perfectly framed) */}
        <div
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
          className={`w-full max-w-[270px] h-[270px] rounded-3xl border-2 flex flex-col items-center justify-end pb-3 relative cursor-pointer shadow-sm transition-all duration-300 overflow-hidden ${
            hasBloomed
              ? "bg-gradient-to-b from-rose-50/60 via-amber-50/40 to-stone-100 border-rose-300 shadow-rose-200/50"
              : isHolding
              ? "bg-rose-50/40 border-rose-300 scale-[1.01]"
              : "bg-white border-stone-200 hover:border-stone-300 active:scale-[0.99]"
          }`}
        >
          {/* Subtle Glow Aura behind giant flower */}
          {growth > 60 && (
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-radial from-rose-200/50 to-transparent pointer-events-none rounded-3xl"
            />
          )}

          {/* Floating Sprout Particles */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <AnimatePresence>
              {particles.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 1, scale: 0.8, x: p.x, y: 0 }}
                  animate={{ opacity: 0, scale: 1.4, y: -75 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute text-base select-none"
                >
                  {p.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Plant SVG Assembly */}
          <div
            className="flex flex-col items-center relative transition-transform duration-100"
            style={{ transform: `scale(${scale})`, transformOrigin: "bottom center" }}
          >
            {/* SVG Definitions for dynamic bloom gradients */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="earlySproutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
                <linearGradient id="midBloomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fda4af" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
                <linearGradient id="giantBloomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="50%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>

            {/* The Flower Head / Petals */}
            <div className="relative z-10 -mb-1">
              {growth < 25 ? (
                // Tiny Sprout Leaf pair
                <motion.svg
                  width="30"
                  height="22"
                  viewBox="0 0 36 28"
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <path
                    d="M18 24 C14 16, 6 14, 4 8 C12 6, 16 14, 18 24 Z"
                    fill="#4ade80"
                  />
                  <path
                    d="M18 24 C22 16, 30 14, 32 8 C24 6, 20 14, 18 24 Z"
                    fill="#22c55e"
                  />
                </motion.svg>
              ) : (
                // Blooming Tulip Head
                <motion.svg
                  width={growth >= 80 ? "54" : "44"}
                  height={growth >= 80 ? "50" : "40"}
                  viewBox="0 0 54 50"
                  animate={
                    hasBloomed
                      ? { scale: [1, 1.04, 1], rotate: [-1, 1, -1] }
                      : { scale: [0.98, 1.02, 0.98] }
                  }
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  {/* Outer Left Petal */}
                  <path
                    d="M27 46 C15 46, 6 34, 8 20 C10 8, 22 12, 27 26 Z"
                    fill={getPetalGradient()}
                    opacity="0.9"
                  />
                  {/* Outer Right Petal */}
                  <path
                    d="M27 46 C39 46, 48 34, 46 20 C44 8, 32 12, 27 26 Z"
                    fill={getPetalGradient()}
                    opacity="0.9"
                  />
                  {/* Center Crown Petal */}
                  <path
                    d="M27 46 C21 34, 17 18, 27 6 C37 18, 33 34, 27 46 Z"
                    fill={getPetalGradient()}
                  />
                  {/* Cute blush or highlight when fully bloomed */}
                  {growth >= 80 && (
                    <circle cx="27" cy="24" r="5" fill="#fef08a" opacity="0.6" />
                  )}
                </motion.svg>
              )}
            </div>

            {/* The Stem */}
            <svg width="24" height={stemHeight} className="overflow-visible">
              <path
                d={`M12 0 Q${12 + (growth > 50 ? 2 : -1)} ${stemHeight / 2} 12 ${stemHeight}`}
                stroke="#15803d"
                strokeWidth={growth > 60 ? "4.5" : "3.5"}
                strokeLinecap="round"
                fill="none"
              />
              {/* Stem Leaves */}
              {growth > 30 && (
                <path
                  d="M12 20 Q3 12 1 6 Q7 11 12 16"
                  fill="#22c55e"
                  opacity="0.9"
                />
              )}
              {growth > 55 && (
                <path
                  d="M12 32 Q20 24 22 18 Q15 22 12 28"
                  fill="#16a34a"
                  opacity="0.9"
                />
              )}
            </svg>

            {/* Soil Mound */}
            <div className="w-14 h-3 bg-stone-700 rounded-full -mt-0.5 shadow-inner relative">
              <div className="absolute inset-x-2 top-0.5 h-0.5 bg-stone-800 rounded-full opacity-60" />
            </div>
          </div>

          {/* Clay Flower Pot */}
          <div className="w-20 h-9 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 rounded-b-xl border-t-4 border-amber-600 shadow-md relative flex flex-col items-center justify-center">
            <span className="text-[9px] font-mono font-bold text-amber-200/90 tracking-wider">
              {herName.split(" ")[0]} 🌷
            </span>
          </div>

          {/* Tap Prompt Overlay */}
          {!hasBloomed && (
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-2xs px-3 py-1 rounded-full border border-stone-200 text-[10px] font-mono text-stone-600 shadow-2xs pointer-events-none whitespace-nowrap">
              {isHolding ? "Growing fast! 🌱..." : "Tap & Hold here 👆"}
            </div>
          )}

          {/* Bloomed Success Badge */}
          {hasBloomed && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-2.5 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-3 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-md shadow-rose-500/30 flex items-center gap-1 whitespace-nowrap z-20"
            >
              <span>🌸 MAXIMUM BLOOM UNLOCKED 🌸</span>
            </motion.div>
          )}
        </div>

        {/* Small Reset Button */}
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={handleReset}
            className="text-[10px] font-mono text-stone-400 hover:text-stone-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw size={10} />
            <span>Reset Sprout</span>
          </button>
        </div>
      </div>

      {/* Dynamic Celebration Note when bloomed */}
      {hasBloomed ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-left mb-3 shadow-2xs"
        >
          <div className="flex items-center gap-2 text-rose-700 text-xs font-mono font-bold">
            <Heart size={14} className="fill-rose-500 text-rose-500" />
            <span>Ceremony Complete!</span>
          </div>
          <p className="text-xs text-stone-700 font-body leading-relaxed mt-1">
            "A flower grown entirely with {herName} ki chaotic energy & pure bestie love! Now take this bloom forward." 🌷
          </p>
        </motion.div>
      ) : (
        <div className="text-[11px] text-stone-400 font-mono mb-3">
          Tip: Tap quickly with multiple fingers or hold down to speed up! ⚡
        </div>
      )}

      {/* Continue Button */}
      <div className="pb-3">
        <button
          onClick={onNext}
          className={`w-full h-12 font-medium text-sm rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-md ${
            hasBloomed
              ? "bg-gradient-to-r from-rose-500 to-amber-500 hover:opacity-95 text-white shadow-rose-500/20 font-bold"
              : "bg-stone-900 hover:bg-stone-800 text-white shadow-stone-900/10"
          }`}
        >
          <span>
            {hasBloomed ? "Take Your Bloomed Flower Forward 🌷 →" : "Skip To Next Chapter →"}
          </span>
        </button>
      </div>
    </div>
  );
};
