import { Variants } from "motion/react";

/**
 * Standard cubic bezier settling curve for high-end editorial interfaces
 */
export const smoothEase = [0.16, 1, 0.3, 1] as const;

/**
 * Stagger parent container variant
 */
export const pageContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/**
 * Fast stagger for lists and cards
 */
export const fastStaggerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

/**
 * Narrative text element variant (subtle lift + fade in)
 */
export const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
};

/**
 * Characterful heading variant
 */
export const headingVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: smoothEase,
    },
  },
};

/**
 * Micro-badge or stamp variant
 */
export const badgeVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.88,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
};

/**
 * Visual card / polaroid variant
 */
export const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.48,
      ease: smoothEase,
    },
  },
};

/**
 * Interactive CTA button variant (arrives last in the sequence)
 */
export const buttonVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
};
