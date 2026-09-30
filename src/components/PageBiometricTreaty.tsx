import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Fingerprint, Check, ShieldAlert, Sparkles, FileText } from "lucide-react";
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

interface PageBiometricTreatyProps {
  herName: string;
  onNext: () => void;
}

export const PageBiometricTreaty: React.FC<PageBiometricTreatyProps> = ({
  herName,
  onNext,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isRatified, setIsRatified] = useState(false);
  const scanIntervalRef = useRef<number | null>(null);

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

  const cancelScan = () => {
    if (isRatified) return;
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    setIsScanning(false);
    setScanProgress(0);
  };

  const triggerFastScan = () => {
    if (isRatified) return;
    startScan();
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
          className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-mono font-bold tracking-wider uppercase mb-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span>INTERGALACTIC ACCORD // CLAUSE 302-B</span>
        </motion.div>
        <motion.h2
          variants={headingVariant}
          className="text-xl sm:text-2xl font-serif-display font-semibold text-stone-900"
        >
          The Mandatory Party Treaty 🍕
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-xs text-stone-500 font-body mt-0.5">
          "Birthday girl ko party deni hi padegi. Aise bilkul nahi chalega."
        </motion.p>
      </div>

      {/* Main Interactive Contract Card */}
      <motion.div variants={cardVariant} className="my-auto py-2">
        <div className="bg-white border-2 border-stone-200 rounded-3xl p-5 shadow-xs relative overflow-hidden text-center">
          {/* Subtle Washi Tape decoration */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 pointer-events-none">
            <WashiTape color="pink" rotation={-1} className="w-24 h-3.5" />
          </div>

          {!isRatified ? (
            <div className="space-y-4 pt-1">
              {/* Contract Terms Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 text-left text-xs font-mono space-y-1.5 text-stone-700">
                <div className="flex justify-between border-b border-stone-200/80 pb-1 font-bold text-stone-800">
                  <span>LEGAL DEBTOR:</span>
                  <span className="text-rose-600">{herName} (Chudail)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">CREDITOR:</span>
                  <span className="text-stone-900 font-semibold">Bestesttttt Friend 👽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">PAYABLE:</span>
                  <span className="text-emerald-700 font-semibold">Momos / Pizza / Treat</span>
                </div>
                <div className="flex justify-between text-[10px] pt-1 text-stone-400">
                  <span>INTEREST RATE:</span>
                  <span>0% (Just unconditional food)</span>
                </div>
              </div>

              {/* Biometric Thumbprint Pad */}
              <div className="py-1">
                <div
                  onMouseDown={startScan}
                  onMouseUp={cancelScan}
                  onMouseLeave={cancelScan}
                  onTouchStart={startScan}
                  onTouchEnd={cancelScan}
                  className={`relative w-28 h-28 mx-auto rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isScanning
                      ? "bg-rose-500 text-white shadow-xl shadow-rose-500/30 scale-105"
                      : "bg-stone-100 hover:bg-rose-50 text-stone-500 hover:text-rose-600 border-2 border-dashed border-stone-300 hover:border-rose-300"
                  }`}
                >
                  {/* Glowing Laser Scan Bar */}
                  {isScanning && (
                    <motion.div
                      animate={{ y: [-38, 38, -38] }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                      className="absolute inset-x-2 h-1 bg-emerald-300 shadow-[0_0_10px_#86EFAC] rounded-full pointer-events-none"
                    />
                  )}

                  <Fingerprint size={48} className={isScanning ? "animate-pulse" : ""} />

                  <span className="text-[10px] font-mono mt-1 font-bold">
                    {isScanning ? `${scanProgress}% SCANNING...` : "HOLD THUMB"}
                  </span>
                </div>

                <p className="text-[11px] font-mono text-stone-400 mt-2">
                  Press and hold thumb for 2 seconds to ratify
                </p>

                {/* Instant Tap Fast Scan Fallback */}
                <div className="pt-2">
                  <button
                    onClick={triggerFastScan}
                    className="py-1.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 text-[11px] font-mono transition-colors cursor-pointer"
                  >
                    ⚡ Or Tap For Fast Scan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Officially Stamped & Ratified Document */
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="space-y-4 py-2"
            >
              {/* Massive Stamp Effect */}
              <motion.div
                initial={{ scale: 2.2, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: -3, opacity: 1 }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                className="p-3 border-4 border-dashed border-rose-600 rounded-2xl bg-rose-50 inline-block text-rose-800 shadow-xs"
              >
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <Check size={18} className="text-emerald-600 stroke-[3]" />
                  <span className="text-xs font-mono font-black tracking-widest uppercase">
                    TREATY OFFICIALLY RATIFIED
                  </span>
                </div>
                <p className="text-xs font-mono font-bold text-rose-700">
                  PARTY OBLIGATION: 100% NON-REFUNDABLE 🍕
                </p>
              </motion.div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 text-left text-xs font-mono space-y-2 text-stone-700">
                <p className="text-stone-900 font-bold border-b border-stone-200 pb-1">
                  INTERGALACTIC CERTIFICATE #2026-BFF
                </p>
                <p className="leading-relaxed">
                  The subject <strong>{herName}</strong> has voluntarily provided her biometric signature confirming full liability for all birthday food expenses.
                </p>
                <div className="pt-1 text-[10px] text-stone-500">
                  ⚠️ Breach Penalty: 500 unhinged reels delivered between 2:00 AM & 4:00 AM.
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1 text-xs font-handwriting text-rose-600 text-sm">
                <CuteAlien size={28} />
                <span>sealed by alien bestie embassy 👽🌷</span>
                <CuteTulip size={24} />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Primary Action Button */}
      <motion.div variants={buttonVariant} className="pb-3">
        <button
          onClick={() => {
            if (!isRatified) {
              triggerFastScan();
            } else {
              onNext();
            }
          }}
          className="w-full h-12 bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md shadow-stone-900/10 cursor-pointer"
        >
          {isRatified ? (
            <span className="font-bold">Treaty Ratified, Continue →</span>
          ) : (
            <span>Scan Thumbprint To Continue 📜</span>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
};
