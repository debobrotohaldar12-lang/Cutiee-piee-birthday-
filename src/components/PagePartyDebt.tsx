import React, { useState } from "react";
import { motion } from "motion/react";
import { Calculator, Flame, CheckCircle2, ChevronRight } from "lucide-react";
import { CuteAlien, CuteTulip, WashiTape, StampBadge } from "./Motifs";
import { sounds } from "../utils/audio";
import {
  pageContainerVariants,
  fadeUpVariant,
  headingVariant,
  badgeVariant,
  cardVariant,
  buttonVariant,
} from "../utils/motionVariants";

interface PagePartyDebtProps {
  herName: string;
  onNext: () => void;
}

export const PagePartyDebt: React.FC<PagePartyDebtProps> = ({ herName, onNext }) => {
  const [friendshipDays, setFriendshipDays] = useState(730);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);

  const pizzasOwed = Math.max(1, Math.round(friendshipDays / 20));
  const momoPlates = Math.max(5, Math.round(friendshipDays / 3.5));
  const reelsSent = friendshipDays * 8;
  const dramaHours = Math.round(friendshipDays * 1.5);

  const handleAcknowledge = () => {
    sounds.playStamp();
    setHasAcknowledged(true);
  };

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col justify-between p-5 max-w-md mx-auto w-full select-none"
    >
      {/* Top Header Badge */}
      <div className="pt-2 text-center">
        <motion.div
          variants={badgeVariant}
          className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-mono font-bold tracking-wider uppercase mb-1"
        >
          <Calculator size={11} className="text-amber-600" />
          <span>OFFICIAL LIABILITY AUDIT // 2026</span>
        </motion.div>
        <motion.h2
          variants={headingVariant}
          className="text-xl sm:text-2xl font-serif-display font-semibold text-stone-900"
        >
          Party Debt Auditor 3000 🍕
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-xs text-stone-500 font-body mt-0.5">
          Subject: <span className="font-semibold text-rose-600">{herName} (Chudail)</span> — Food Bill Pending
        </motion.p>
      </div>

      {/* Main Interactive Card */}
      <motion.div variants={cardVariant} className="my-auto py-2">
        <div className="bg-white border-2 border-stone-200 rounded-3xl p-5 shadow-xs relative overflow-hidden text-center space-y-4">
          {/* Subtle Washi Tape */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 pointer-events-none">
            <WashiTape color="cream" rotation={1} className="w-24 h-3.5" />
          </div>

          {/* Interactive Slider */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 space-y-2 text-left">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-stone-500">Days Tolerating Each Other:</span>
              <span className="text-rose-700 font-bold text-sm bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                {friendshipDays} days
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="2500"
              step="30"
              value={friendshipDays}
              onChange={(e) => {
                setFriendshipDays(Number(e.target.value));
                setHasAcknowledged(false);
              }}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-400">
              <span>Fresh Besties (100d)</span>
              <span>Dinosaur Era (2500d)</span>
            </div>
          </div>

          {/* Dynamic Debt Breakdown Grid */}
          <div className="grid grid-cols-2 gap-2 text-left font-mono text-xs">
            <div className="p-3 bg-rose-50/80 border border-rose-200 rounded-2xl">
              <div className="text-stone-400 text-[10px]">PIZZAS OWED:</div>
              <div className="text-rose-700 font-bold text-base flex items-center gap-1 mt-0.5">
                <span>{pizzasOwed} Large</span>
                <span>🍕</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl">
              <div className="text-stone-400 text-[10px]">MOMOS OWED:</div>
              <div className="text-amber-800 font-bold text-base flex items-center gap-1 mt-0.5">
                <span>{momoPlates} Plates</span>
                <span>🥟</span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl">
              <div className="text-stone-400 text-[10px]">REELS SENT:</div>
              <div className="text-stone-800 font-bold text-sm mt-0.5">
                {reelsSent.toLocaleString()}
              </div>
              <div className="text-[9px] text-stone-400 font-body">90% unwatched 💀</div>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl">
              <div className="text-stone-400 text-[10px]">DRAMA SESSIONS:</div>
              <div className="text-stone-800 font-bold text-sm mt-0.5">
                {dramaHours} hrs 🗣️
              </div>
              <div className="text-[9px] text-stone-400 font-body">Non-stop rants</div>
            </div>
          </div>

          {/* Final Settlement Verdict */}
          <div className="p-3.5 bg-stone-900 text-white rounded-2xl text-center space-y-1">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">
              FINAL SETTLEMENT VERDICT
            </span>
            <p className="text-sm font-serif-display font-bold text-amber-300">
              "1 Unlimited Buffet Treat + Chocolate Shake"
            </p>
          </div>

          {/* Acknowledge Button */}
          <div>
            {!hasAcknowledged ? (
              <button
                onClick={handleAcknowledge}
                className="w-full py-2.5 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 text-xs font-mono font-bold rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer shadow-2xs"
              >
                <Flame size={14} />
                <span>Acknowledge Debt (No Bargaining) ✍️</span>
              </button>
            ) : (
              <div className="py-2 px-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-center text-xs font-mono font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Debt Legally Admitted. Proceed to Biometric Sign!</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Primary Action Button */}
      <motion.div variants={buttonVariant} className="pb-3">
        <button
          onClick={onNext}
          className="w-full h-12 bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md shadow-stone-900/10 cursor-pointer"
        >
          <span>Proceed To Biometric Treaty 📜 →</span>
        </button>
      </motion.div>
    </motion.div>
  );
};
