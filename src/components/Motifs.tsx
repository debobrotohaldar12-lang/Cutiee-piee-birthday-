import React from "react";
import { motion } from "motion/react";

/**
 * Handmade cute Alien SVG motif
 */
export const CuteAlien: React.FC<{
  className?: string;
  size?: number;
  blinking?: boolean;
}> = ({ className = "", size = 48, blinking = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
    >
      {/* Antenna */}
      <path
        d="M32 18V9"
        stroke="#4B6354"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="7" r="3.5" fill="#E17D94" />

      {/* Head */}
      <ellipse
        cx="32"
        cy="34"
        rx="22"
        ry="18"
        fill="#A7D5B8"
        stroke="#4B6354"
        strokeWidth="2.2"
      />

      {/* Cheeks */}
      <ellipse cx="19" cy="38" rx="3.5" ry="2" fill="#F4A7B9" opacity="0.65" />
      <ellipse cx="45" cy="38" rx="3.5" ry="2" fill="#F4A7B9" opacity="0.65" />

      {/* Big Alien Eyes */}
      <g>
        <ellipse
          cx="24"
          cy="31"
          rx="5.5"
          ry="7"
          transform="rotate(-8 24 31)"
          fill="#1C2822"
        />
        <circle cx="22.5" cy="28.5" r="2" fill="#FFFFFF" />
        <circle cx="25.5" cy="32.5" r="1" fill="#FFFFFF" />

        <ellipse
          cx="40"
          cy="31"
          rx="5.5"
          ry="7"
          transform="rotate(8 40 31)"
          fill="#1C2822"
        />
        <circle cx="38.5" cy="28.5" r="2" fill="#FFFFFF" />
        <circle cx="41.5" cy="32.5" r="1" fill="#FFFFFF" />
      </g>

      {/* Shy happy smile */}
      <path
        d="M29 39C30.5 40.5 33.5 40.5 35 39"
        stroke="#2E4436"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Handmade cute Tulip SVG motif
 */
export const CuteTulip: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = "", size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
    >
      {/* Stem */}
      <path
        d="M32 30V56"
        stroke="#52795D"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Leaf */}
      <path
        d="M32 46C24 43 20 37 22 34C24 38 28 42 32 44"
        fill="#86B593"
        stroke="#52795D"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M32 41C40 38 44 32 42 29C40 33 36 37 32 39"
        fill="#86B593"
        stroke="#52795D"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Tulip Petals */}
      <g>
        {/* Back petal */}
        <path
          d="M32 10C27 15 27 24 32 29C37 24 37 15 32 10Z"
          fill="#E05D7C"
        />
        {/* Left petal */}
        <path
          d="M32 30C23 29 18 20 22 13C27 18 29 25 32 30Z"
          fill="#F285A0"
          stroke="#C84869"
          strokeWidth="1.8"
        />
        {/* Right petal */}
        <path
          d="M32 30C41 29 46 20 42 13C37 18 35 25 32 30Z"
          fill="#F79EB4"
          stroke="#C84869"
          strokeWidth="1.8"
        />
        {/* Middle highlight */}
        <path
          d="M28 20C30 16 34 16 36 20C34 26 30 26 28 20Z"
          fill="#FBC0CE"
        />
      </g>
    </svg>
  );
};

/**
 * Animated Alien presenting Tulip for Page 11
 */
export const AlienPresentingTulip: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Floating sparkles/note */}
      <motion.div
        animate={{ y: [-3, 3, -3], opacity: [0.65, 0.95, 0.65] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        className="absolute -top-6 flex items-center gap-1.5 pointer-events-none"
      >
        <span className="text-[11px] text-rose-500 font-handwriting text-sm tracking-wide">
          ✨ a flower for the birthday girl ✨
        </span>
      </motion.div>

      <div className="flex items-center justify-center">
        {/* The Alien Body */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <CuteAlien size={76} />

          {/* Alien's extended arm holding tulip */}
          <motion.div
            initial={{ rotate: -18, x: -8, scale: 0.85, opacity: 0 }}
            animate={{ rotate: 0, x: 0, scale: 1, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute top-11 -right-8 origin-left flex items-center"
          >
            {/* Cute Little Hand/Arm */}
            <div className="w-5 h-2.5 bg-[#A7D5B8] border border-[#4B6354] rounded-full -mr-1 shadow-xs" />
            {/* The Presented Tulip */}
            <motion.div
              animate={{
                rotate: [-3, 5, -3],
                scale: [1, 1.03, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.2,
                ease: "easeInOut",
              }}
            >
              <CuteTulip size={50} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * Scrapbook Washi Tape
 */
export const WashiTape: React.FC<{
  color?: "pink" | "green" | "cream";
  rotation?: number;
  className?: string;
}> = ({ color = "pink", rotation = -2, className = "" }) => {
  const bgClass =
    color === "pink"
      ? "bg-rose-200/50 border-rose-300/40"
      : color === "green"
      ? "bg-emerald-200/50 border-emerald-300/40"
      : "bg-amber-100/60 border-amber-200/50";

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`h-4 w-20 border-y border-dashed backdrop-blur-[1px] shadow-xs pointer-events-none ${bgClass} ${className}`}
    />
  );
};

/**
 * Scrapbook Stamp
 */
export const StampBadge: React.FC<{
  text?: string;
  subtext?: string;
  className?: string;
}> = ({ text = "OCTOBER", subtext = "BFF 2026", className = "" }) => {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center p-1.5 border border-dashed border-rose-300/70 bg-rose-50/60 rounded-xs text-[10px] text-stone-600 font-mono tracking-wider select-none ${className}`}
    >
      <span className="font-bold text-rose-700 text-[9px]">{text}</span>
      <span className="text-[8px] text-stone-500">{subtext}</span>
    </div>
  );
};
