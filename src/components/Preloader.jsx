import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Preloader({ onDone }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const total = reduce ? 900 : 2200;
    const timer = setTimeout(() => setShow(false), total);
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: reduce
              ? undefined
              : "inset(0% 0% 100% 0%)",
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-6xl md:text-8xl font-black tracking-tighter"
            >
              SEOJUN<span className="text-accent">.</span>
            </motion.div>

            {/* sweeping reveal bar */}
            <motion.div
              className="mt-6 h-[3px] bg-accent"
              initial={{ width: 0 }}
              animate={{ width: reduce ? 200 : "16rem" }}
              transition={{
                duration: reduce ? 0.4 : 1.3,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-xs tracking-[0.4em] text-paper/40"
            >
              VIDEO EDITOR PORTFOLIO
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
