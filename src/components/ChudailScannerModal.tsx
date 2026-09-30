import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Fingerprint, Flame, ShieldAlert, Sparkles, Check, AlertTriangle } from "lucide-react";
import { CuteAlien, CuteTulip, StampBadge } from "./Motifs";
import { sounds } from "../utils/audio";

interface ChudailScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  herName: string;
}

export const ChudailScannerModal: React.FC<ChudailScannerModalProps> = ({
  isOpen,
  onClose,
  herName,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<number | null>(null);

  if (!isOpen) return null;

  const startScan = () => {
    if (isComplete) return;
    setIsScanning(true);
    sounds.playPop();

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsScanning(false);
          setIsComplete(true);
          sounds.playStamp();
          return 100;
        }
        return prev + 6;
      });
    }, 40);
  };

  const cancelScan = () => {
    if (isComplete) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setIsScanning(false);
    setProgress(0);
  };

  const handleReset = () => {
    setIsComplete(false);
    setProgress(0);
    setIsScanning(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-[#FFFDF9] border-2 border-rose-300 rounded-3xl max-w-sm w-full p-5 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-1.5 text-rose-600 font-mono text-xs font-bold">
            <ShieldAlert size={16} />
            <span>CHUDAIL DIAGNOSTIC LAB 🧪</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 text-center">
          {!isComplete ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-serif-display font-bold text-stone-900">
                  Drama-o-Meter Scanner 🚨
                </h3>
                <p className="text-xs text-stone-500 font-mono mt-1">
                  Subject: {herName} // DNA Analysis
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 text-left font-mono text-xs space-y-1 text-stone-600">
                <p>• Scanning for excessive attitude...</p>
                <p>• Measuring overthinking capacity...</p>
                <p>• Detecting unhinged 2 AM reel habits...</p>
              </div>

              {/* Sensor Pad */}
              <div className="pt-2">
                <div
                  onMouseDown={startScan}
                  onMouseUp={cancelScan}
                  onMouseLeave={cancelScan}
                  onTouchStart={startScan}
                  onTouchEnd={cancelScan}
                  className={`relative w-28 h-28 mx-auto rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isScanning
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-600/40 scale-105"
                      : "bg-rose-50 hover:bg-rose-100 text-rose-600 border-2 border-dashed border-rose-300"
                  }`}
                >
                  {isScanning && (
                    <motion.div
                      animate={{ y: [-36, 36, -36] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="absolute inset-x-2 h-1 bg-amber-300 shadow-[0_0_8px_#FCD34D] rounded-full"
                    />
                  )}
                  <Fingerprint size={48} className={isScanning ? "animate-pulse" : ""} />
                  <span className="text-[10px] font-mono mt-1 font-bold">
                    {isScanning ? `${progress}% SCANNING` : "HOLD THUMB"}
                  </span>
                </div>

                <p className="text-[11px] font-mono text-stone-400 mt-2">
                  Hold thumb to measure diagnostic levels
                </p>

                <div className="pt-2">
                  <button
                    onClick={startScan}
                    className="py-1 px-3 bg-stone-100 hover:bg-stone-200 text-stone-600 text-[11px] font-mono rounded-lg transition-colors cursor-pointer"
                  >
                    ⚡ Or Tap For Quick Scan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Diagnostic Result */
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-4"
            >
              {/* Stamp */}
              <motion.div
                initial={{ scale: 2.5, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: -3, opacity: 1 }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                className="p-3 border-4 border-dashed border-rose-600 rounded-2xl bg-rose-50 text-rose-800 inline-block shadow-sm"
              >
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <AlertTriangle size={18} className="text-rose-600" />
                  <span className="text-xs font-mono font-black tracking-wider">
                    CRITICAL POSITIVE
                  </span>
                </div>
                <p className="text-sm font-serif-display font-bold text-rose-900">
                  100% CERTIFIED CHUDAIL 🧙‍♀️🚨
                </p>
              </motion.div>

              {/* Lab Results Table */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 text-left text-xs font-mono space-y-1.5 text-stone-700">
                <div className="flex justify-between">
                  <span className="text-stone-400">Drama Queen Index:</span>
                  <span className="text-rose-600 font-bold">99.8% (Off the charts)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Overthinking Capacity:</span>
                  <span className="text-amber-700 font-bold">Infinite Gigabytes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Gossip Speed:</span>
                  <span className="text-stone-900 font-bold">420 words/minute</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-1.5">
                  <span className="text-stone-400">Prescription:</span>
                  <span className="text-emerald-700 font-bold">1 Cheese Pizza & 2h Call</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-stone-500 font-handwriting text-sm">
                <CuteAlien size={24} />
                <span>"Par meri favorite chudail ho tum" 🌷</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono transition-colors cursor-pointer"
                >
                  Scan Again 🔄
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  Accept Fate ✅
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
