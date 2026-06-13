import { motion, useReducedMotion } from "framer-motion";

const items = [
  "VIDEO EDITING",
  "KINETIC TYPOGRAPHY",
  "MOTION DESIGN",
  "YOUTUBE",
  "AD FILM",
  "WEB TOY PROJECT",
];

export default function Marquee() {
  const reduce = useReducedMotion();
  const row = [...items, ...items];
  return (
    <div className="relative border-y border-white/10 bg-accent text-ink overflow-hidden py-4 -rotate-1 scale-[1.02]">
      <motion.div
        className="flex gap-10 whitespace-nowrap font-extrabold text-xl tracking-tight"
        animate={reduce ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            {item} <span aria-hidden>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
