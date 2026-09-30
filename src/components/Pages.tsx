import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  CuteAlien,
  CuteTulip,
  AlienPresentingTulip,
  WashiTape,
  StampBadge,
} from "./Motifs";
import { BIRTHDAY_DATA } from "../content";
import { sounds } from "../utils/audio";
import { Sparkles, CheckCircle2, Fingerprint, Gift, Award, Flame, Zap, ShieldAlert } from "lucide-react";
import {
  pageContainerVariants,
  fadeUpVariant,
  headingVariant,
  badgeVariant,
  cardVariant,
  buttonVariant,
  fastStaggerVariants,
} from "../utils/motionVariants";

/**
 * PAGE 1: OPENING
 */
export const PageOpening: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col justify-between p-6 max-w-md mx-auto w-full text-center"
    >
      <motion.div variants={badgeVariant} className="pt-6">
        <span className="text-[11px] font-mono tracking-widest text-stone-400 uppercase">
          A Private Dispatch
        </span>
      </motion.div>

      <div className="my-auto py-8 space-y-6">
        {/* Cute alien + tulip emblem */}
        <motion.div
          variants={cardVariant}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <motion.div
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <CuteAlien size={56} />
          </motion.div>
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <CuteTulip size={48} />
          </motion.div>
        </motion.div>

        <div className="space-y-3">
          <motion.h1
            variants={headingVariant}
            className="text-3xl sm:text-4xl font-serif-display font-medium text-stone-900 tracking-tight"
          >
            {BIRTHDAY_DATA.page1.greeting}
          </motion.h1>
          <motion.p
            variants={fadeUpVariant}
            className="text-stone-600 text-sm sm:text-base font-body font-normal"
          >
            {BIRTHDAY_DATA.page1.subtitle}
          </motion.p>
        </div>

        <motion.div variants={fadeUpVariant} className="pt-2">
          <span className="inline-block text-xs font-handwriting text-rose-500/90 text-base">
            (put on your reading glasses & turn off your attitude 🙄)
          </span>
        </motion.div>
      </div>

      <motion.div variants={buttonVariant} className="pb-4">
        <button
          onClick={onNext}
          className="w-full h-12 bg-stone-900 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md shadow-stone-900/10 cursor-pointer"
        >
          <span>{BIRTHDAY_DATA.page1.buttonText}</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

/**
 * PAGE 2: BIRTHDAY TRANSMISSION
 */
export const PageTransmission: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col justify-between p-6 max-w-md mx-auto w-full"
    >
      <motion.div variants={badgeVariant} className="pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono tracking-widest text-stone-600">
            FREQ: 10.26 MHZ
          </span>
        </div>
        <StampBadge text="SIGNAL" subtext="AUTHENTIC" />
      </motion.div>

      <motion.div variants={cardVariant} className="my-auto py-6">
        <div className="relative bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
          {/* Header tape */}
          <div className="absolute -top-2.5 left-8">
            <WashiTape color="green" rotation={-1} className="w-20 h-3.5" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-mono text-xs font-semibold tracking-wider pb-2 border-b border-stone-100">
              <CuteAlien size={24} />
              <span>TRANSMISSION RECEIVED 👽</span>
            </div>

            <div className="bg-stone-50 rounded-lg p-3 space-y-1.5 font-mono text-xs text-stone-600">
              <div className="flex justify-between">
                <span className="text-stone-400">Origin:</span>
                <span className="text-stone-800 font-medium">Earth (Coords: Somewhere Annoying)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Recipient:</span>
                <span className="text-rose-600 font-medium">Birthday Girl 🌷</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Classification:</span>
                <span className="text-emerald-700 font-medium">Top Secret BFF Tier</span>
              </div>
            </div>

            <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-serif-display font-medium pt-1 text-center">
              "A very important birthday message has arrived."
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={buttonVariant} className="pb-4">
        <button
          onClick={onNext}
          className="w-full h-12 bg-stone-900 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md shadow-stone-900/10 cursor-pointer"
        >
          <span>Receive message →</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

/**
 * PAGE 5: LITTLE SURPRISE (Interactive Cards)
 */
export const PageSurprise: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [openedCards, setOpenedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    sounds.playPop();
    setOpenedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col justify-between p-6 max-w-md mx-auto w-full"
    >
      <div className="pt-2 text-center">
        <motion.h2
          variants={headingVariant}
          className="text-2xl font-serif-display font-semibold text-stone-900"
        >
          A few things you should know 👽
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-xs text-stone-500 mt-1">
          Tap each card to open secret notes
        </motion.p>
      </div>

      <motion.div variants={fastStaggerVariants} className="my-auto py-3 space-y-2.5">
        {BIRTHDAY_DATA.page5.cards.map((card) => {
          const isOpen = !!openedCards[card.id];
          return (
            <motion.div
              key={card.id}
              variants={cardVariant}
              whileTap={{ scale: 0.99 }}
              onClick={() => toggleCard(card.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                isOpen
                  ? "bg-rose-50/70 border-rose-200/80 shadow-xs"
                  : "bg-white border-stone-200/80 hover:border-stone-300 shadow-2xs"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{card.icon}</span>
                  <span className="font-serif-display font-medium text-sm text-stone-900">
                    {card.label}
                  </span>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  {isOpen ? "Hide" : "Tap"}
                </span>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed pt-2.5 mt-2 border-t border-rose-200/50 font-body">
                      {card.reveal}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div variants={buttonVariant} className="pb-4">
        <button
          onClick={onNext}
          className="w-full h-12 bg-stone-900 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md shadow-stone-900/10 cursor-pointer"
        >
          <span>Continue →</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

/**
 * PAGE 6: FAKE ENDING
 */
export const PageFakeEnding: React.FC<{ onFakeClose: () => void }> = ({
  onFakeClose,
}) => {
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col justify-between p-6 max-w-md mx-auto w-full text-center"
    >
      <motion.div variants={badgeVariant} className="pt-6">
        <CuteTulip size={32} />
      </motion.div>

      <div className="my-auto py-8 space-y-6">
        <div className="space-y-3">
          <motion.h2
            variants={headingVariant}
            className="text-2xl sm:text-3xl font-serif-display font-medium text-stone-900"
          >
            {BIRTHDAY_DATA.page6.line1}
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-sm sm:text-base text-stone-600 font-body"
          >
            {BIRTHDAY_DATA.page6.line2}
          </motion.p>
        </div>

        <motion.div variants={fadeUpVariant} className="pt-6">
          <span className="font-serif-display text-lg text-stone-400 italic">
            {BIRTHDAY_DATA.page6.theEnd}
          </span>
        </motion.div>
      </div>

      <motion.div variants={buttonVariant} className="pb-4">
        <button
          onClick={onFakeClose}
          className="w-full h-11 bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium text-xs rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>{BIRTHDAY_DATA.page6.buttonText}</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

/**
 * PAGE 7: THE TWIST
 */
export const PageTwist: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      sounds.playRadarBoop();
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between p-6 max-w-md mx-auto w-full text-center bg-stone-900 text-stone-100 min-h-screen">
      <div className="pt-6">
        <span className="text-[11px] font-mono tracking-widest text-emerald-400">
          [SYSTEM OVERRIDE DETECTED]
        </span>
      </div>

      <div className="my-auto py-8">
        <AnimatePresence>
          {showContent && (
            <motion.div
              variants={pageContainerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={cardVariant} className="flex justify-center">
                <CuteAlien size={72} />
              </motion.div>

              <div className="space-y-3">
                <motion.h2
                  variants={headingVariant}
                  className="text-2xl sm:text-3xl font-serif-display font-semibold text-white tracking-tight"
                >
                  {BIRTHDAY_DATA.page7.line1}
                </motion.h2>
                <motion.p
                  variants={fadeUpVariant}
                  className="text-emerald-400 font-mono text-sm tracking-wide"
                >
                  {BIRTHDAY_DATA.page7.line2}
                </motion.p>
              </div>

              <motion.p
                variants={fadeUpVariant}
                className="text-stone-400 text-xs font-handwriting text-base"
              >
                (you really thought you were getting off that easily? 🙄)
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pb-4">
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <button
              onClick={onNext}
              className="w-full h-12 bg-white text-stone-900 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-stone-100 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-white/5"
            >
              <span>Continue →</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/**
 * PAGE 8: THE UNOFFICIAL BESTIE MANUAL
 */
export const PageBestieManual: React.FC<{
  onNext: () => void;
  onOpenPartyContract?: () => void;
}> = ({ onNext, onOpenPartyContract }) => {
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col justify-between p-6 max-w-md mx-auto w-full"
    >
      <div className="pt-2 text-center">
        <motion.div
          variants={badgeVariant}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-mono mb-1.5"
        >
          <span>CODEX // SEC. 404</span>
        </motion.div>
        <motion.h2
          variants={headingVariant}
          className="text-xl sm:text-2xl font-serif-display font-semibold text-stone-900"
        >
          THE UNOFFICIAL BESTIE MANUAL 👽
        </motion.h2>
      </div>

      <motion.div variants={fastStaggerVariants} className="my-auto py-3 space-y-2.5">
        {BIRTHDAY_DATA.page8.rules.map((rule, idx) => (
          <motion.div
            key={idx}
            variants={cardVariant}
            className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs relative"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono font-bold text-rose-600 tracking-wider">
                {rule.number}
              </span>
              <span className="text-[10px] font-mono text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md">
                {rule.tag}
              </span>
            </div>
            <p className="text-xs sm:text-[13px] font-body text-stone-800 font-medium leading-snug">
              {rule.text}
            </p>
          </motion.div>
        ))}

        {/* Dedicated Party Debt Audit Interactive Banner */}
        {onOpenPartyContract && (
          <motion.div
            variants={cardVariant}
            onClick={onOpenPartyContract}
            className="p-3.5 bg-gradient-to-r from-amber-50 via-white to-rose-50 rounded-2xl border-2 border-amber-300 shadow-sm cursor-pointer hover:border-amber-400 active:scale-[0.99] transition-all flex items-center justify-between group select-none"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <span className="text-xl">🍕</span>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-amber-800 tracking-wider">
                    MANDATORY FOOD AUDIT
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                </div>
                <p className="text-xs font-serif-display font-bold text-stone-900 leading-tight">
                  Audit Party Debt 3000 📊
                </p>
                <p className="text-[10px] font-mono text-stone-500">
                  Calculate pizzas, momos & rants owed
                </p>
              </div>
            </div>

            <span className="text-xs font-mono text-amber-800 font-bold bg-white px-2.5 py-1.5 rounded-xl border border-amber-200 shadow-2xs group-hover:bg-amber-50 transition-colors">
              Audit →
            </span>
          </motion.div>
        )}
      </motion.div>

      <motion.div variants={buttonVariant} className="pb-4">
        <button
          onClick={onNext}
          className="w-full h-12 bg-stone-900 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md shadow-stone-900/10 cursor-pointer"
        >
          <span>Proceed to Party Debt Audit 🍕 →</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

/**
 * PAGE 9: BFF VERIFICATION TEST
 */
export const PageVerification: React.FC<{
  onNext: () => void;
  onOpenScanner?: () => void;
}> = ({ onNext, onOpenScanner }) => {
  const [state, setState] = useState<"question" | "yes_success" | "no_doubt" | "no_reconsidered">("question");

  const handleYes = () => {
    sounds.playStamp();
    setState("yes_success");
  };

  const handleNo = () => {
    sounds.playPop();
    setState("no_doubt");
  };

  const handleReconsider = () => {
    sounds.playStamp();
    setState("no_reconsidered");
  };

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col justify-between p-6 max-w-md mx-auto w-full"
    >
      <div className="pt-2 text-center">
        <motion.div
          variants={badgeVariant}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[10px] font-mono mb-2"
        >
          <span>OFFICIAL PROTOCOL</span>
        </motion.div>
        <motion.h2
          variants={headingVariant}
          className="text-xl sm:text-2xl font-serif-display font-semibold text-stone-900"
        >
          ⚠️ IMPORTANT VERIFICATION
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-xs text-stone-500 mt-1">
          Ek bahut serious sawaal hai. Soch samajh ke answer dena.
        </motion.p>
      </div>

      <div className="my-auto py-6">
        <AnimatePresence mode="wait">
          {state === "question" && (
            <motion.div
              key="q"
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm text-center space-y-6"
            >
              <CuteAlien size={48} className="mx-auto" />
              <p className="text-lg sm:text-xl font-serif-display font-semibold text-stone-900">
                Kya main tumhara BFF hoon? 👽
              </p>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleYes}
                  className="w-full h-12 rounded-xl bg-stone-900 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
                >
                  <span>Haan obviously 🙄🌷</span>
                </button>

                {/* Tempting 'Nahi' button */}
                <button
                  onClick={handleNo}
                  className="w-full h-11 rounded-xl bg-rose-50 border-2 border-rose-300/80 text-rose-800 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-rose-100 hover:border-rose-400 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
                >
                  <span>Nahi</span>
                </button>
              </div>
            </motion.div>
          )}

          {state === "yes_success" && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm text-center space-y-4 relative overflow-hidden"
            >
              {/* Dynamic Physical Rubber Stamp Slam */}
              <motion.div
                initial={{ scale: 3, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: -6, opacity: 1 }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                className="inline-flex flex-col items-center justify-center p-3 border-4 border-dashed border-rose-600/90 rounded-2xl text-rose-700 bg-rose-50/50 shadow-xs"
              >
                <span className="text-[10px] font-mono font-black tracking-widest text-rose-800">
                  OFFICIAL INTERGALACTIC REGISTRY
                </span>
                <span className="text-sm font-mono font-black tracking-wider text-rose-700 my-0.5">
                  VERIFIED BEST FRIEND
                </span>
                <span className="text-[10px] font-mono text-stone-500">
                  STATUS: PERMANENT · NO REFUNDS 🧿
                </span>
              </motion.div>

              <div className="space-y-1.5 pt-2">
                <h3 className="text-lg font-serif-display font-semibold text-stone-900">
                  Verification successful. ✅
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm">
                  Mujhe pata hi tha. Itna obvious question tha. 🙄
                </p>
                <div className="pt-1">
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 font-mono text-xs rounded-full font-bold">
                    BFF status: PERMANENT 🧿
                  </span>
                </div>

                {onOpenScanner && (
                  <div className="pt-2">
                    <button
                      onClick={onOpenScanner}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-300 text-rose-700 text-xs font-mono font-bold flex items-center justify-center gap-1.5 hover:bg-rose-100 transition-colors cursor-pointer shadow-2xs active:scale-98"
                    >
                      <ShieldAlert size={14} className="text-rose-500" />
                      <span>Run Chudail Diagnostic Scan 🚨</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {state === "no_doubt" && (
            <motion.div
              key="no"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-rose-200 rounded-2xl p-6 shadow-sm text-center space-y-5"
            >
              <div className="text-3xl">🥺</div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-stone-600">Okay 🥺</p>
                <p className="text-sm font-medium text-stone-600">Thik hai 🥺🥺</p>
                <p className="text-base font-serif-display font-semibold text-stone-900 pt-2">
                  ...but ek baar aur soch lo na? 👽
                </p>
              </div>

              <button
                onClick={handleReconsider}
                className="w-full h-12 rounded-xl bg-stone-900 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all cursor-pointer shadow-md"
              >
                <span>Haan yaar, tum BFF ho 😭</span>
              </button>
            </motion.div>
          )}

          {state === "no_reconsidered" && (
            <motion.div
              key="reconsidered"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm text-center space-y-4"
            >
              <CuteTulip size={44} className="mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-serif-display font-semibold text-stone-900">
                  Good. Crisis avoided. 😌
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm">
                  Mujhe laga birthday ke din hi meri BFF position chali jayegi. 🙄🌷
                </p>
                <div className="pt-1">
                  <span className="inline-block px-3 py-1 bg-stone-100 text-stone-800 font-mono text-xs rounded-full">
                    Position Restored 🧿
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pb-4">
        {(state === "yes_success" || state === "no_reconsidered") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={onNext}
              className="w-full h-12 bg-stone-900 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md shadow-stone-900/10 cursor-pointer"
            >
              <span>{state === "yes_success" ? "Okay, continue →" : "Continue →"}</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * PAGE 10: ONE THING I NEVER SAY
 */
export const PageEmotional: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col justify-between p-6 max-w-md mx-auto w-full text-center"
    >
      <motion.div variants={badgeVariant} className="pt-4">
        <CuteTulip size={28} />
      </motion.div>

      <div className="my-auto py-6">
        {!isOpen ? (
          <motion.div
            variants={cardVariant}
            className="space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-stone-900 leading-snug">
              There's one thing I don't say enough...
            </h2>
            <p className="text-xs text-stone-400 font-mono">
              [SINCERE MOMENT // NO SARCASM ALLOWED]
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  sounds.playPop();
                  setIsOpen(true);
                }}
                className="px-6 h-11 bg-stone-900 text-white font-medium text-xs rounded-xl inline-flex items-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
              >
                <span>Open it →</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={fastStaggerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-xs text-left space-y-4"
          >
            <motion.p
              variants={fadeUpVariant}
              className="text-xs sm:text-sm text-stone-800 leading-relaxed font-body"
            >
              "I'm genuinely grateful that somehow, out of all the people we could've met, we ended up becoming this close."
            </motion.p>
            <motion.p
              variants={fadeUpVariant}
              className="text-xs sm:text-sm text-stone-800 leading-relaxed font-body"
            >
              "Aur I really hope school ke baad bhi humare paas random messages, stupid jokes aur bina reason ke ek dusre ko tang karne ke reasons hote rahenge."
            </motion.p>
            <motion.div
              variants={fadeUpVariant}
              className="pt-2 border-t border-stone-100 flex items-center justify-between"
            >
              <p className="text-xs sm:text-sm font-serif-display font-medium text-stone-900 leading-relaxed">
                Distance aaye, life busy ho, cheezein change ho... bas mujhe bhulna mat. 🌷
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>

      <div className="pb-4">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={onNext}
              className="w-full h-12 bg-stone-900 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md shadow-stone-900/10 cursor-pointer"
            >
              <span>Continue →</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * PAGE 11: ACTUAL FINAL ENDING
 */
export const PageFinalEnding: React.FC<{
  herName: string;
  onOpenWarranty?: () => void;
}> = ({ herName, onOpenWarranty }) => {
  const [blooms, setBlooms] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  const triggerMegaChaosConfetti = () => {
    sounds.playPop();
    // Center cannon burst
    confetti({
      particleCount: 75,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#F43F5E", "#FBBF24", "#34D399", "#60A5FA", "#EC4899"],
    });
    // Double side cannons
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0.05, y: 0.65 },
        colors: ["#EC4899", "#F59E0B", "#10B981"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 0.95, y: 0.65 },
        colors: ["#EC4899", "#F59E0B", "#10B981"],
      });
    }, 200);
  };

  const handleOpenGift = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGiftOpen(true);
    triggerMegaChaosConfetti();
    sounds.playChime();
  };

  useEffect(() => {
    // Subtle, non-intrusive celebratory particle explosion only on Page 11
    const timer = setTimeout(() => {
      triggerSubtleConfetti();
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const triggerSubtleConfetti = () => {
    sounds.playChime();

    // Gentle central blossom flutter (low velocity, slow descent)
    confetti({
      particleCount: 38,
      spread: 60,
      startVelocity: 18,
      gravity: 0.65,
      ticks: 190,
      scalar: 0.72,
      origin: { x: 0.5, y: 0.42 },
      colors: ["#F472B6", "#FDA4AF", "#A7D5B8", "#FDE68A", "#FFF1F2"],
      disableForReducedMotion: true,
    });

    // Soft secondary petal drifts from left and right edges
    setTimeout(() => {
      confetti({
        particleCount: 16,
        angle: 55,
        spread: 40,
        startVelocity: 14,
        gravity: 0.55,
        ticks: 160,
        scalar: 0.68,
        origin: { x: 0.2, y: 0.55 },
        colors: ["#FDA4AF", "#A7D5B8", "#FDE68A"],
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 16,
        angle: 125,
        spread: 40,
        startVelocity: 14,
        gravity: 0.55,
        ticks: 160,
        scalar: 0.68,
        origin: { x: 0.8, y: 0.55 },
        colors: ["#FDA4AF", "#A7D5B8", "#FDE68A"],
        disableForReducedMotion: true,
      });
    }, 320);
  };

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newBloom = { id: Date.now() + Math.random(), x, y };

    sounds.playPop();
    setBlooms((prev) => [...prev.slice(-6), newBloom]);

    setTimeout(() => {
      setBlooms((prev) => prev.filter((b) => b.id !== newBloom.id));
    }, 1400);
  };

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      onClick={handleScreenClick}
      className="flex-1 flex flex-col justify-between p-6 max-w-md mx-auto w-full text-center relative overflow-hidden cursor-pointer select-none"
    >
      {/* Floating interactive tap blossoms */}
      <AnimatePresence>
        {blooms.map((bloom) => (
          <motion.div
            key={bloom.id}
            initial={{ opacity: 1, scale: 0.5, x: bloom.x - 14, y: bloom.y - 14 }}
            animate={{ opacity: 0, scale: 1.35, y: bloom.y - 55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute pointer-events-none z-30"
          >
            <CuteTulip size={28} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Finale Badge */}
      <motion.div variants={badgeVariant} className="pt-3 flex items-center justify-center">
        <StampBadge text="FINALE" subtext="BFF FOREVER 🧿" />
      </motion.div>

      {/* Main Core Content with Refined Typography */}
      <div className="my-auto py-5 space-y-5">
        <div className="space-y-3">
          <motion.h1
            variants={headingVariant}
            className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight leading-tight"
          >
            Happy Birthday, {herName} 🌷
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="text-base sm:text-lg font-serif-display font-medium text-stone-800"
          >
            Keep being you, meri personal chudail. 🤘
          </motion.p>

          <motion.p
            variants={fadeUpVariant}
            className="text-xs sm:text-[13px] text-stone-500 font-body max-w-xs mx-auto leading-relaxed pt-1"
          >
            Distance aaye, life busy ho jaye, cheezein badal jayein... par humari friendship hamesha aisi hi rahegi.
          </motion.p>

          <motion.div variants={badgeVariant} className="pt-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-stone-900 font-mono text-xs sm:text-sm font-semibold shadow-2xs">
              Bestesttttttt Friend 🧿
            </span>
          </motion.div>
        </div>

        {/* Final cute animation: Alien slowly gives/presents a flower 🌷 */}
        <motion.div variants={cardVariant} className="py-2">
          <AlienPresentingTulip />
        </motion.div>

        {/* CRAZY THING 1: Interactive Birthday Mystery Present Box */}
        <motion.div variants={cardVariant} className="pt-1">
          {!isGiftOpen ? (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              animate={{ rotate: [-1.5, 1.5, -1.5], y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              onClick={handleOpenGift}
              className="p-3.5 bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 border-2 border-dashed border-rose-400 rounded-2xl shadow-sm cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-bounce">🎁</span>
                <div className="text-left">
                  <span className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider block">
                    MYSTERY BIRTHDAY DELIVERY
                  </span>
                  <p className="text-xs font-serif-display font-bold text-stone-900 leading-tight">
                    Tap To Claim Birthday Surprise Gift 🎀
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-rose-700 font-bold bg-white px-2 py-1 rounded-lg border border-rose-200">
                Open!
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3.5 bg-white border-2 border-rose-300 rounded-2xl shadow-sm text-left space-y-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-rose-100 pb-1.5">
                <span className="text-xs font-mono font-bold text-rose-700 flex items-center gap-1">
                  <Gift size={14} />
                  <span>3x OFFICIAL BESTIE PASSES UNLOCKED</span>
                </span>
                <span className="text-base">🎉</span>
              </div>
              <div className="space-y-1 text-[11px] font-mono text-stone-700">
                <div className="p-1.5 bg-rose-50/70 rounded-lg flex items-center gap-1.5">
                  <span>🎟️</span>
                  <span><strong>Coupon #1:</strong> 3:00 AM Crisis Venting (Zero Judgment)</span>
                </div>
                <div className="p-1.5 bg-amber-50/70 rounded-lg flex items-center gap-1.5">
                  <span>🍕</span>
                  <span><strong>Coupon #2:</strong> Steal Food From My Plate (Uncapped)</span>
                </div>
                <div className="p-1.5 bg-emerald-50/70 rounded-lg flex items-center gap-1.5">
                  <span>😴</span>
                  <span><strong>Coupon #3:</strong> Leaving On Delivered Exemption (Lifetime)</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* CRAZY THING 2: Action Buttons (Chaos Cannon & Official Warranty) */}
        <motion.div variants={fadeUpVariant} className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerMegaChaosConfetti();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 hover:opacity-95 active:scale-95 shadow-md shadow-rose-500/20 transition-all cursor-pointer"
          >
            <Zap size={14} className="animate-spin" />
            <span>UNLEASH CHAOS CANNON 🚀</span>
          </button>

          {onOpenWarranty && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenWarranty();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-stone-300 hover:border-amber-400 text-stone-800 text-xs font-mono font-bold flex items-center justify-center gap-1.5 active:scale-95 shadow-2xs transition-all cursor-pointer"
            >
              <Award size={14} className="text-amber-500" />
              <span>Lifetime Warranty 📜</span>
            </button>
          )}
        </motion.div>
      </div>

      {/* Tiny Footnote at Bottom */}
      <motion.div variants={fadeUpVariant} className="pb-3 text-center">
        <p className="text-[10px] text-stone-400 font-mono leading-relaxed max-w-[280px] mx-auto">
          Made with too much effort, too many thoughts & probably questionable sleep hours 👽
        </p>
      </motion.div>
    </motion.div>
  );
};
