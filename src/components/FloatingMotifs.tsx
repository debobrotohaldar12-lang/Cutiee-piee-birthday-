import React, { useMemo } from "react";
import { motion } from "motion/react";
import { CuteAlien, CuteTulip } from "./Motifs";

interface FloatingMotifsProps {
  isDarkTheme?: boolean;
}

interface MotifItem {
  id: number;
  type: "alien" | "tulip" | "sparkle";
  size: number;
  startX: number; // percentage (0-100)
  startY: number; // percentage (0-100)
  duration: number; // seconds
  delay: number; // seconds
  driftX: number; // pixel drift
  driftY: number; // pixel drift
  rotate: number; // deg
  opacity: number;
}

export const FloatingBackgroundMotifs: React.FC<FloatingMotifsProps> = ({
  isDarkTheme = false,
}) => {
  // Pre-generate stable positions so they don't jump around on re-renders
  const motifs = useMemo<MotifItem[]>(() => {
    return [
      {
        id: 1,
        type: "tulip",
        size: 26,
        startX: 8,
        startY: 12,
        duration: 18,
        delay: 0,
        driftX: 18,
        driftY: -28,
        rotate: 15,
        opacity: 0.28,
      },
      {
        id: 2,
        type: "alien",
        size: 28,
        startX: 84,
        startY: 18,
        duration: 22,
        delay: 2,
        driftX: -20,
        driftY: 25,
        rotate: -12,
        opacity: 0.26,
      },
      {
        id: 3,
        type: "tulip",
        size: 22,
        startX: 78,
        startY: 68,
        duration: 20,
        delay: 3.5,
        driftX: 14,
        driftY: -32,
        rotate: 22,
        opacity: 0.3,
      },
      {
        id: 4,
        type: "alien",
        size: 24,
        startX: 12,
        startY: 76,
        duration: 24,
        delay: 1,
        driftX: 22,
        driftY: -20,
        rotate: 10,
        opacity: 0.25,
      },
      {
        id: 5,
        type: "tulip",
        size: 20,
        startX: 48,
        startY: 88,
        duration: 17,
        delay: 4,
        driftX: -16,
        driftY: -24,
        rotate: -18,
        opacity: 0.24,
      },
      {
        id: 6,
        type: "alien",
        size: 22,
        startX: 88,
        startY: 42,
        duration: 25,
        delay: 5,
        driftX: -14,
        driftY: 28,
        rotate: -8,
        opacity: 0.22,
      },
      {
        id: 7,
        type: "sparkle",
        size: 14,
        startX: 22,
        startY: 45,
        duration: 15,
        delay: 2.5,
        driftX: 10,
        driftY: -15,
        rotate: 45,
        opacity: 0.35,
      },
      {
        id: 8,
        type: "sparkle",
        size: 16,
        startX: 65,
        startY: 28,
        duration: 16,
        delay: 1.5,
        driftX: -12,
        driftY: 18,
        rotate: 30,
        opacity: 0.3,
      },
    ];
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none"
    >
      {motifs.map((item) => (
        <motion.div
          key={item.id}
          style={{
            position: "absolute",
            left: `${item.startX}%`,
            top: `${item.startY}%`,
          }}
          animate={{
            x: [0, item.driftX, 0, -item.driftX * 0.7, 0],
            y: [0, item.driftY, 0, -item.driftY * 0.7, 0],
            rotate: [0, item.rotate, -item.rotate * 0.5, 0],
            opacity: [
              item.opacity * (isDarkTheme ? 0.8 : 1),
              item.opacity * (isDarkTheme ? 1.4 : 1.3),
              item.opacity * (isDarkTheme ? 0.7 : 0.9),
              item.opacity * (isDarkTheme ? 0.8 : 1),
            ],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          {item.type === "alien" && (
            <div className={isDarkTheme ? "drop-shadow-[0_0_8px_rgba(167,213,184,0.35)]" : ""}>
              <CuteAlien size={item.size} />
            </div>
          )}

          {item.type === "tulip" && (
            <div className={isDarkTheme ? "drop-shadow-[0_0_8px_rgba(244,114,182,0.35)]" : ""}>
              <CuteTulip size={item.size} />
            </div>
          )}

          {item.type === "sparkle" && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={isDarkTheme ? "text-emerald-300" : "text-amber-400/80"}
            >
              <path
                d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z"
                fill="currentColor"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};
