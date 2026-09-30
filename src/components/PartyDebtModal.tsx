import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calculator, Pizza, Flame, Sparkles, Send } from "lucide-react";
import { CuteAlien, CuteTulip, WashiTape } from "./Motifs";
import { sounds } from "../utils/audio";

interface PartyDebtModalProps {
  isOpen: boolean;
  onClose: () => void;
  herName: string;
}

export const PartyDebtModal: React.FC<PartyDebtModalProps> = ({
  isOpen,
  onClose,
  herName,
}) => {
  const [friendshipDays, setFriendshipDays] = useState(730); // default ~2 years
  const [hasAcknowledged, setHasAcknowledged] = useState(false);

  if (!isOpen) return null;

  const pizzasOwed = Math.max(1, Math.round(friendshipDays / 20));
  const momoPlates = Math.max(5, Math.round(friendshipDays / 3.5));
  const reelsSent = friendshipDays * 8;
  const dramaHours = Math.round(friendshipDays * 1.5);

  const handleAcknowledge = () => {
    sounds.playStamp();
    setHasAcknowledged(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-[#FFFDF9] border border-stone-200 rounded-3xl max-w-sm w-full p-5 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-1.5 text-rose-700">
            <Calculator size={16} />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              PARTY DEBT AUDITOR 3000
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-serif-display font-bold text-stone-900">
              The Official Food Liability Audit 🍕
            </h3>
            <p className="text-[11px] font-mono text-stone-500 mt-0.5">
              Subject: {herName} // Status: Heavily in Debt
            </p>
          </div>

          {/* Slider for Days of Friendship */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-stone-500">Days Tolerating Each Other:</span>
              <span className="text-rose-700 font-bold text-sm">{friendshipDays} days</span>
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

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 gap-2 text-left font-mono text-xs">
            <div className="p-2.5 bg-rose-50 border border-rose-200/80 rounded-xl">
              <div className="text-stone-400 text-[10px]">PIZZAS OWED:</div>
              <div className="text-rose-700 font-bold text-base flex items-center gap-1">
                <span>{pizzasOwed} Large</span>
                <span>🍕</span>
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 border border-amber-200/80 rounded-xl">
              <div className="text-stone-400 text-[10px]">MOMOS OWED:</div>
              <div className="text-amber-800 font-bold text-base flex items-center gap-1">
                <span>{momoPlates} Plates</span>
                <span>🥟</span>
              </div>
            </div>

            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
              <div className="text-stone-400 text-[10px]">REELS SENT:</div>
              <div className="text-stone-800 font-bold text-sm">
                {reelsSent.toLocaleString()} (90% unwatched)
              </div>
            </div>

            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
              <div className="text-stone-400 text-[10px]">DRAMA RANTS:</div>
              <div className="text-stone-800 font-bold text-sm">
                {dramaHours} hrs 🗣️
              </div>
            </div>
          </div>

          {/* Grand Total */}
          <div className="p-3 bg-stone-900 text-white rounded-2xl text-center space-y-0.5">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
              FINAL SETTLEMENT VERDICT
            </span>
            <p className="text-sm font-serif-display font-bold text-amber-300">
              "1 Unlimited Buffet Treat + Chocolate Shake"
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-2">
          {!hasAcknowledged ? (
            <button
              onClick={handleAcknowledge}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-mono font-bold rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer shadow-md shadow-rose-600/20"
            >
              <Flame size={14} />
              <span>Acknowledge Debt (No Bargaining)</span>
            </button>
          ) : (
            <div className="py-2.5 px-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-center text-xs font-mono font-bold flex items-center justify-center gap-1.5">
              <span>✅ Debt Legally Admitted. Send treat date! 📲</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
