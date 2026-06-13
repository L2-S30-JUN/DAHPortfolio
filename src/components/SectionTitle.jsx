import { motion } from "framer-motion";

export default function SectionTitle({ index, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12"
    >
      <p className="text-accent font-mono text-sm tracking-widest mb-2">
        {index}
      </p>
      <h2 className="text-4xl md:text-6xl font-black tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-paper/60 text-lg">{subtitle}</p>}
    </motion.div>
  );
}
