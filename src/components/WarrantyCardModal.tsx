import React from "react";
import { motion } from "motion/react";
import { X, Award, ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { CuteAlien, CuteTulip, StampBadge } from "./Motifs";

interface WarrantyCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  herName: string;
}

export const WarrantyCardModal: React.FC<WarrantyCardModalProps> = ({
  isOpen,
  onClose,
  herName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 20 }}
        className="bg-[#FFFDF9] border-2 border-amber-300 rounded-3xl max-w-sm w-full p-5 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top close */}
        <div className="flex items-center justify-between pb-2 border-b border-stone-200">
          <div className="flex items-center gap-1.5 text-amber-700 font-mono text-xs font-bold">
            <ShieldCheck size={16} />
            <span>CERTIFIED FRIENDSHIP WARRANTY</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Certificate Card Container */}
        <div className="py-4 space-y-3 text-center">
          {/* Header Seal */}
          <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-600 shadow-xs">
            <Award size={28} />
          </div>

          <div>
            <h3 className="text-xl font-serif-display font-black text-stone-900">
              LIFETIME BESTIE WARRANTY
            </h3>
            <p className="text-[10px] font-mono text-amber-700 font-bold uppercase tracking-wider mt-0.5">
              Govt. of Intergalactic Friendship // Certified
            </p>
          </div>

          {/* Details Box */}
          <div className="bg-gradient-to-br from-amber-50/60 to-rose-50/60 border border-amber-200 rounded-2xl p-3.5 text-left text-xs font-mono space-y-2 text-stone-700">
            <div className="flex justify-between border-b border-amber-200/60 pb-1">
              <span className="text-stone-400">BENEFICIARY:</span>
              <span className="font-bold text-rose-700">{herName} (Chudail)</span>
            </div>
            <div className="flex justify-between border-b border-amber-200/60 pb-1">
              <span className="text-stone-400">EXPIRY DATE:</span>
              <span className="font-bold text-emerald-700">NEVER (Non-Cancellable)</span>
            </div>
            <div className="flex justify-between border-b border-amber-200/60 pb-1">
              <span className="text-stone-400">POLICY TIER:</span>
              <span className="font-bold text-stone-900">VIP Unlimited Emotional Support</span>
            </div>

            <div className="pt-1 text-[11px] font-body text-stone-600 space-y-1">
              <p className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                <span>Covers 3:00 AM crisis calls & panic sessions.</span>
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                <span>Includes free food theft from each other's plates.</span>
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                <span>Zero judgment for sending 50 unhinged reels.</span>
              </p>
            </div>
          </div>

          {/* Barcode & Alien Signature */}
          <div className="pt-1 flex items-center justify-between px-2">
            <div className="flex items-center gap-1">
              <CuteAlien size={26} />
              <CuteTulip size={20} />
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono tracking-widest text-stone-400 font-bold">
                |||||| | |||| ||||||
              </div>
              <span className="text-[9px] font-mono text-stone-400">ID: BFF-2026-FOREVER</span>
            </div>
          </div>
        </div>

        {/* Close / Screenshot Notice */}
        <div className="pt-1">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-mono text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Take Screenshot & Save Certificate 📸
          </button>
        </div>
      </motion.div>
    </div>
  );
};
