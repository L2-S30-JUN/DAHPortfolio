import { motion } from "framer-motion";
import { profile } from "../data.js";

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-10 py-32 relative overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 size-[28rem] rounded-full bg-violet/20 blur-[120px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      <div className="relative max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-accent font-mono text-sm tracking-widest mb-4"
        >
          05 — CONTACT
        </motion.p>
        <motion.a
          href={`mailto:${profile.email}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="inline-block mt-4 text-2xl md:text-4xl font-bold text-cyan underline
                     underline-offset-8 decoration-2 hover:text-accent transition-colors"
        >
          {profile.email}
        </motion.a>
        <p className="mt-16 text-paper/40 text-sm">
          © 2026 {profile.name} ({profile.studentId}) · Built with React & Framer Motion
        </p>
      </div>
    </section>
  );
}
