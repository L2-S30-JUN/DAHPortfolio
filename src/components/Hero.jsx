import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { profile } from "../data.js";

const cyclingWords = ["VIDEO EDITING", "KINETIC TYPO", "MOTION DESIGN"];

function CyclingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % cyclingWords.length),
      2200
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={cyclingWords[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-accent font-extrabold"
        >
          {cyclingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero({ entered }) {
  const reduce = useReducedMotion();
  const reveal = (delay) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 40 },
    animate: entered
      ? { opacity: 1, y: 0 }
      : reduce
        ? { opacity: 0 }
        : { opacity: 0, y: 40 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 overflow-hidden"
    >
      {/* background glow blobs (layer above particles, below content) */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-32 size-[34rem] rounded-full bg-violet/20 blur-[120px]"
        animate={reduce ? {} : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -right-24 size-[30rem] rounded-full bg-accent/15 blur-[120px]"
        animate={reduce ? {} : { x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.p
          {...reveal(0)}
          className="text-sm md:text-base tracking-[0.3em] text-paper/60 mb-4"
        >
          {profile.role} · {profile.studentId} {profile.name}
        </motion.p>

        <motion.h1
          {...reveal(0.1)}
          className="text-[clamp(3.5rem,13vw,11rem)] font-black leading-none tracking-tighter"
        >
          {profile.nameEn}
        </motion.h1>

        <motion.p
          {...reveal(0.25)}
          className="mt-8 text-2xl md:text-4xl font-bold text-paper/80"
        >
          움직이는 글자로 이야기합니다 — <CyclingWord />
        </motion.p>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-paper/40 text-sm tracking-widest"
        >
          SCROLL ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
