import type { Transition, Variants } from "framer-motion";

export const springReveal: Transition = { type: "spring", stiffness: 200, damping: 24 };
export const springHover: Transition = { type: "spring", stiffness: 320, damping: 18 };
export const springNav: Transition = { type: "spring", stiffness: 320, damping: 22 };
export const springCard: Transition = { type: "spring", stiffness: 260, damping: 22 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: springReveal },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: springReveal },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});
