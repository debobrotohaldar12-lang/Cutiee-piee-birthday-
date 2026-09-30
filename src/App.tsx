import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronDown, Volume2, VolumeX, SlidersHorizontal, Fingerprint, X } from "lucide-react";
import { HER_NAME, BIRTHDAY_DATA } from "./content";
import { sounds } from "./utils/audio";
import { PhotoCollage, PhotoData } from "./components/PhotoCollage";
import { BirthdayLetter } from "./components/BirthdayLetter";
import {
  PageOpening,
  PageTransmission,
  PageSurprise,
  PageFakeEnding,
  PageTwist,
  PageBestieManual,
  PageVerification,
  PageEmotional,
  PageFinalEnding,
} from "./components/Pages";
import { CustomizerModal } from "./components/CustomizerModal";
import { PartyContractModal } from "./components/PartyContractModal";
import { BirthdayCakeCeremony } from "./components/BirthdayCakeCeremony";
import { PageBiometricTreaty } from "./components/PageBiometricTreaty";
import { PagePartyDebt } from "./components/PagePartyDebt";
import { TulipBloomGame } from "./components/TulipBloomGame";
import { WarrantyCardModal } from "./components/WarrantyCardModal";
import { ChudailScannerModal } from "./components/ChudailScannerModal";
import { CuteAlien, CuteTulip } from "./components/Motifs";
import { FloatingBackgroundMotifs } from "./components/FloatingMotifs";

export const DEFAULT_PHOTOS: PhotoData[] = [
  {
    id: 1,
    caption: "Baalon mein phool laga ke innocent banne ki full koshish! 🤘",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    rotation: -2.5,
    tapeColor: "pink",
  },
  {
    id: 2,
    caption: "Okay okay, ye wali actually achi hai... zyada hawa mein mat udna. 🙄🌷",
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
    rotation: 2,
    tapeColor: "green",
  },
  {
    id: 3,
    caption: "Yellow saree mein madam ka iconic look — 100% drama! 💛",
    url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=80",
    rotation: -1.5,
    tapeColor: "cream",
  },
  {
    id: 4,
    caption: "Hair adjust karne ka candid drama... Certified Cutiee piee! 🫠🙃",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
    rotation: 3,
    tapeColor: "pink",
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryPage = params.get("page");
      if (queryPage) {
        const p = parseInt(queryPage, 10);
        if (p >= 1 && p <= 14) return p;
      }
    } catch {
      // fallback
    }
    return 1;
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isChapterMenuOpen, setIsChapterMenuOpen] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isPartyContractOpen, setIsPartyContractOpen] = useState<boolean>(false);
  const [isWarrantyModalOpen, setIsWarrantyModalOpen] = useState<boolean>(false);
  const [isChudailScannerOpen, setIsChudailScannerOpen] = useState<boolean>(false);
  const [herName, setHerName] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryName = params.get("name");
      if (queryName) return queryName;
    } catch {
      // fallback
    }
    return localStorage.getItem("bestie_name") || HER_NAME;
  });

  // Sync current page with URL query param for easy navigation & refreshing
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("page", String(currentPage));
      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore
    }
  }, [currentPage]);

  // 4 Photos initialized from localStorage or defaults
  const [photos, setPhotos] = useState<PhotoData[]>(() => {
    try {
      const saved = localStorage.getItem("bestie_photos");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 4) {
          return DEFAULT_PHOTOS.map((def, idx) => ({
            ...def,
            ...parsed[idx],
            url: parsed[idx]?.url || def.url,
          }));
        }
      }
    } catch {
      // Fallback to default
    }
    return DEFAULT_PHOTOS;
  });

  // Save changes to localStorage
  const updateHerName = (name: string) => {
    setHerName(name);
    try {
      localStorage.setItem("bestie_name", name);
    } catch {
      // ignore
    }
  };

  const updatePhoto = (id: number, url: string) => {
    setPhotos((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, url } : p));
      try {
        localStorage.setItem("bestie_photos", JSON.stringify(updated));
      } catch (err) {
        console.warn("Storage quota warning:", err);
      }
      return updated;
    });
  };

  const resetPhotos = () => {
    setPhotos(DEFAULT_PHOTOS);
    try {
      localStorage.removeItem("bestie_photos");
    } catch {
      // ignore
    }
  };

  const handleNextPage = () => {
    sounds.playPop();
    setCurrentPage((prev) => Math.min(prev + 1, 14));
  };

  const handlePrevPage = () => {
    sounds.playPop();
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sounds.enabled = nextState;
    if (nextState) sounds.playChime();
  };

  const isTwistPage = currentPage === 7;

  return (
    <div className="min-h-screen bg-[#F0EDE5] flex items-center justify-center p-0 sm:p-4 selection:bg-rose-100 selection:text-rose-900">
      {/* Phone Canvas Container */}
      <div
        className={`w-full max-w-[430px] min-h-[100dvh] sm:min-h-[844px] sm:max-h-[900px] flex flex-col justify-between relative overflow-hidden sm:rounded-[32px] sm:shadow-2xl transition-colors duration-500 ${
          isTwistPage
            ? "bg-stone-900 text-stone-100 sm:border sm:border-stone-800"
            : "bg-[#FBF9F5] text-stone-900 paper-pattern sm:border sm:border-stone-300/70"
        }`}
      >
        {/* Top Minimal Navigation Header (Strictly under 15% mobile viewport height) */}
        {!isTwistPage && (
          <header className="h-12 px-4 flex items-center justify-between border-b border-stone-200/50 bg-[#FBF9F5]/90 backdrop-blur-xs sticky top-0 z-30 select-none">
            {/* Left: Subtle Back button */}
            <div className="w-16 flex items-center">
              {currentPage > 1 && currentPage !== 6 && currentPage !== 7 && currentPage !== 14 && (
                <button
                  onClick={handlePrevPage}
                  className="h-8 px-1.5 -ml-1 text-stone-500 hover:text-stone-900 flex items-center gap-0.5 text-xs font-mono rounded-md hover:bg-stone-100/60 active:scale-95 transition-all cursor-pointer"
                  title="Previous page"
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
              )}
            </div>

            {/* Center: Story Chapter Indicator with Quick Jump */}
            <button
              onClick={() => setIsChapterMenuOpen(!isChapterMenuOpen)}
              className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-stone-100/90 text-stone-500 text-[11px] font-mono tracking-wider cursor-pointer active:scale-95 transition-all"
              title="Click to view all chapters"
            >
              <span className="font-semibold text-stone-900">
                {String(currentPage).padStart(2, "0")}
              </span>
              <span className="text-stone-300">/</span>
              <span>14</span>
              <ChevronDown size={11} className="text-stone-400 ml-0.5" />
            </button>

            {/* Right: Audio & Personalize actions */}
            <div className="flex items-center justify-end gap-1">
              <button
                onClick={toggleSound}
                className="w-7 h-7 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-100/80 active:scale-95 transition-all cursor-pointer"
                title={soundEnabled ? "Mute audio" : "Enable audio"}
                aria-label="Toggle audio chime"
              >
                {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>

              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-stone-500 hover:text-rose-600 hover:bg-rose-50/80 active:scale-95 transition-all cursor-pointer"
                title="Personalize Name & Photos"
                aria-label="Personalize options"
              >
                <SlidersHorizontal size={13} />
              </button>
            </div>
          </header>
        )}

        {/* Subtle, slow-floating background alien & tulip motifs */}
        <FloatingBackgroundMotifs isDarkTheme={isTwistPage} />

        {/* Screen Content Container with Subtle Transitions */}
        <main className="flex-1 flex flex-col relative z-10 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col h-full"
            >
              {currentPage === 1 && <PageOpening onNext={handleNextPage} />}

              {currentPage === 2 && <PageTransmission onNext={handleNextPage} />}

              {currentPage === 3 && (
                <PhotoCollage
                  photos={photos}
                  onUpdatePhoto={updatePhoto}
                  onNext={handleNextPage}
                />
              )}

              {currentPage === 4 && <BirthdayLetter onNext={handleNextPage} />}

              {currentPage === 5 && (
                <TulipBloomGame herName={herName} onNext={handleNextPage} />
              )}

              {currentPage === 6 && <PageFakeEnding onFakeClose={handleNextPage} />}

              {currentPage === 7 && <PageTwist onNext={handleNextPage} />}

              {currentPage === 8 && (
                <PageBestieManual
                  onNext={handleNextPage}
                  onOpenPartyContract={() => setCurrentPage(9)}
                />
              )}

              {currentPage === 9 && (
                <PagePartyDebt herName={herName} onNext={handleNextPage} />
              )}

              {currentPage === 10 && (
                <PageBiometricTreaty herName={herName} onNext={handleNextPage} />
              )}

              {currentPage === 11 && (
                <PageVerification
                  onNext={handleNextPage}
                  onOpenScanner={() => setIsChudailScannerOpen(true)}
                />
              )}

              {currentPage === 12 && <PageEmotional onNext={handleNextPage} />}

              {currentPage === 13 && (
                <BirthdayCakeCeremony herName={herName} onNext={handleNextPage} />
              )}

              {currentPage === 14 && (
                <PageFinalEnding
                  herName={herName}
                  onOpenWarranty={() => setIsWarrantyModalOpen(true)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Quick Chapter Selector Modal */}
      {isChapterMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-2xs flex items-center justify-center p-4 select-none"
          onClick={() => setIsChapterMenuOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-xs w-full max-h-[82vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <span className="text-xs font-mono font-bold text-stone-800 tracking-wider">
                STORY CHAPTERS (14)
              </span>
              <button
                onClick={() => setIsChapterMenuOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-2 overflow-y-auto space-y-1">
              {[
                { p: 1, label: "01 · Hey, wait...", icon: "👋" },
                { p: 2, label: "02 · Alien Transmission", icon: "👽" },
                { p: 3, label: "03 · Classified Evidence (4 Photos)", icon: "📸" },
                { p: 4, label: "04 · Handwritten Letter", icon: "💌" },
                { p: 5, label: "05 · Tulip Bloom Mini-Game 🌷", icon: "🎮", highlight: true },
                { p: 6, label: "06 · The Fake Ending", icon: "😴" },
                { p: 7, label: "07 · System Override", icon: "⚠️" },
                { p: 8, label: "08 · Bestie Manual", icon: "📖" },
                { p: 9, label: "09 · Party Debt Auditor", icon: "🍕" },
                { p: 10, label: "10 · Biometric Party Treaty", icon: "📜" },
                { p: 11, label: "11 · Chudail Diagnostic Lab", icon: "🚨" },
                { p: 12, label: "12 · One Thing I Never Say", icon: "🌷" },
                { p: 13, label: "13 · Cake Cutting Ceremony", icon: "🎂" },
                { p: 14, label: "14 · Grand Finale & Coupons", icon: "✨" },
              ].map((item) => (
                <button
                  key={item.p}
                  onClick={() => {
                    setCurrentPage(item.p);
                    setIsChapterMenuOpen(false);
                    sounds.playPop();
                  }}
                  className={`w-full px-3 py-2 text-left rounded-xl text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                    currentPage === item.p
                      ? "bg-stone-900 text-white font-bold"
                      : item.highlight
                      ? "bg-rose-50 text-rose-800 font-bold hover:bg-rose-100 border border-rose-200/80"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {item.highlight && currentPage !== item.p && (
                    <span className="text-[10px] bg-rose-200/80 text-rose-800 px-1.5 py-0.5 rounded-full font-bold">
                      NEW
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Personalization Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        herName={herName}
        onUpdateName={updateHerName}
        photos={photos}
        onUpdatePhoto={updatePhoto}
        onResetPhotos={resetPhotos}
        currentPage={currentPage}
        onJumpToPage={(p) => setCurrentPage(p)}
      />

      {/* Intergalactic Party Treaty Modal with Biometric Scan (Legacy backup) */}
      <PartyContractModal
        isOpen={isPartyContractOpen}
        onClose={() => setIsPartyContractOpen(false)}
        herName={herName}
      />

      {/* Chudail Diagnostic Lab Modal */}
      <ChudailScannerModal
        isOpen={isChudailScannerOpen}
        onClose={() => setIsChudailScannerOpen(false)}
        herName={herName}
      />

      {/* Friendship Lifetime Warranty Card Modal */}
      <WarrantyCardModal
        isOpen={isWarrantyModalOpen}
        onClose={() => setIsWarrantyModalOpen(false)}
        herName={herName}
      />
    </div>
  );
}
