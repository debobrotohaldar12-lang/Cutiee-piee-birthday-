import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Fingerprint, Sparkles, ShieldAlert, Check, FileCheck, Share2 } from "lucide-react";
import { CuteAlien, CuteTulip, StampBadge, WashiTape } from "./Motifs";
import { sounds } from "../utils/audio";

interface PartyContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  herName: string;
}

export const PartyContractModal: React.FC<PartyContractModalProps> = ({
  isOpen,
  onClose,
  herName,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isRatified, setIsRatified] = useState(false);
  const scanIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsScanning(false);
      setScanProgress(0);
    }
  }, [isOpen]);

  const startScan = () => {
    if (isRatified) return;
    setIsScanning(true);
    sounds.playPop();

    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    scanIntervalRef.current = window.setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
          setIsScanning(false);
          setIsRatified(true);
          sounds.playStamp();
          return 100;
        }
        return prev + 5;
      });
    }, 45);
  };

  const triggerAutoScan = () => {
    if (isRatified) return;
    startScan();
  };

  const cancelScan = () => {
    if (isRatified) return;
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    setIsScanning(false);
    setScanProgress(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-[#FFFDF9] border border-stone-200 rounded-3xl max-w-sm w-full p-5 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider text-stone-600 font-bold uppercase">
              LEGAL CLAUSE 302-B
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 text-center">
          {!isRatified ? (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-500 shadow-xs">
                <ShieldAlert size={24} />
              </div>

              <div>
                <h3 className="text-xl font-serif-display font-bold text-stone-900">
                  The Official Party Treaty 🍕
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  "Birthday girl ko party deni hi padegi. Aise bilkul nahi chalega."
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 text-left space-y-1.5 text-xs text-stone-700 font-mono">
                <div className="flex justify-between">
                  <span className="text-stone-400">Debtor:</span>
                  <span className="text-rose-700 font-bold">{herName} (Chudail)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Creditor:</span>
                  <span className="text-stone-900 font-medium">Your Bestesttttt Friend 👽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Payable:</span>
                  <span className="text-emerald-700 font-medium">Momos / Pizza / Treat</span>
                </div>
              </div>

              {/* Biometric Thumbprint Scanner */}
              <div className="pt-2">
                <div
                  onMouseDown={startScan}
                  onMouseUp={cancelScan}
                  onMouseLeave={cancelScan}
                  onTouchStart={startScan}
                  onTouchEnd={cancelScan}
                  className={`relative w-28 h-28 mx-auto rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all select-none ${
                    isScanning
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105"
                      : "bg-stone-100 hover:bg-stone-200/80 text-stone-500 border-2 border-dashed border-stone-300"
                  }`}
                >
                  {/* Laser scan line */}
                  {isScanning && (
                    <motion.div
                      animate={{ y: [-38, 38, -38] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="absolute inset-x-2 h-1 bg-emerald-300 shadow-[0_0_8px_#86EFAC] rounded-full pointer-events-none"
                    />
                  )}

                  <Fingerprint size={48} className={isScanning ? "animate-pulse" : ""} />

                  <span className="text-[10px] font-mono mt-1 font-bold">
                    {isScanning ? `${scanProgress}% SCANNING...` : "HOLD THUMB"}
                  </span>
                </div>

                <p className="text-[11px] font-mono text-stone-400 mt-2">
                  Press and hold for 2 seconds to officially sign
                </p>

                <div className="pt-2">
                  <button
                    onClick={triggerAutoScan}
                    className="py-1.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 text-[11px] font-mono transition-colors cursor-pointer"
                  >
                    ⚡ Fast Biometric Scan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Ratified Certificate */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-4"
            >
              {/* Dynamic Stamped Seal */}
              <motion.div
                initial={{ scale: 2.2, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: -4, opacity: 1 }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                className="p-3 border-4 border-dashed border-rose-600 rounded-2xl bg-rose-50/70 inline-block text-rose-800 shadow-sm"
              >
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Check size={16} className="text-emerald-600 stroke-[3]" />
                  <span className="text-[11px] font-mono font-black tracking-widest">
                    TREATY OFFICIALLY RATIFIED
                  </span>
                </div>
                <p className="text-xs font-mono font-bold text-rose-700">
                  PARTY OBLIGATION: NON-REFUNDABLE 🍕
                </p>
              </motion.div>

              <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 text-left text-xs font-mono space-y-2 text-stone-700">
                <p className="text-stone-800 font-bold border-b border-stone-200 pb-1">
                  INTERGALACTIC ACCORD #2026-BFF
                </p>
                <p className="leading-relaxed">
                  The subject <strong>{herName}</strong> has voluntarily provided her biometric signature confirming full liability for all birthday food expenses.
                </p>
                <div className="pt-1 text-[10px] text-stone-500">
                  ⚠️ Breach Penalty: 500 unhinged reels delivered between 2:00 AM & 4:00 AM.
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                <CuteAlien size={32} />
                <span className="text-xs font-handwriting text-rose-600 text-sm">
                  witnessed by alien embassy 👽🌷
                </span>
                <CuteTulip size={28} />
              </div>

              <button
                onClick={onClose}
                className="w-full h-11 bg-stone-900 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-stone-800 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
              >
                <FileCheck size={14} />
                <span>Agreement Accepted, Boss 😌</span>
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
