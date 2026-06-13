import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";

export default function Timeline({ id, index, title, subtitle, items, muted }) {
  return (
    <section
      id={id}
      className={`px-6 md:px-10 py-28 ${muted ? "bg-white/[0.02]" : ""}`}
    >
      <div className="max-w-4xl mx-auto">
        <SectionTitle index={index} title={title} subtitle={subtitle} />
        <ol className="relative ml-3 border-l border-white/15">
          {items.map((item, i) => (
            <motion.li
              key={`${item.date}-${i}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="group relative pl-8 pb-10 last:pb-0"
            >
              <span
                className="absolute -left-[7px] top-1.5 size-3.5 rounded-full bg-accent ring-4 ring-ink
                           transition-transform duration-300 group-hover:scale-150"
              />
              <p className="font-mono text-sm text-cyan tracking-widest">
                {item.date}
              </p>
              <h3 className="mt-1 text-2xl md:text-3xl font-bold">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 underline underline-offset-8 decoration-2
                               decoration-accent/50 hover:text-accent hover:decoration-accent transition-colors"
                  >
                    {item.title}
                    <span aria-hidden className="text-lg">↗</span>
                  </a>
                ) : (
                  <span className="group-hover:text-accent transition-colors">
                    {item.title}
                  </span>
                )}
              </h3>
              {item.desc && <p className="mt-1 text-paper/60">{item.desc}</p>}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
