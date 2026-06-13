import { motion } from "framer-motion";

const links = [
  { label: "EDUCATION", href: "#education" },
  { label: "WORKS", href: "#works" },
  { label: "PROJECTS", href: "#projects" },
  { label: "AWARD", href: "#award" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 md:px-10
                 backdrop-blur-md bg-ink/60 border-b border-white/5"
    >
      <a href="#top" className="font-extrabold tracking-tight text-lg">
        SEOJUN<span className="text-accent">.</span>
      </a>
      <nav className="flex gap-3 sm:gap-5 text-[11px] sm:text-sm font-semibold tracking-widest">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="relative group text-paper/70 hover:text-paper transition-colors"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
