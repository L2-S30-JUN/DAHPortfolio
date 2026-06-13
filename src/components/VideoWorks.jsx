import { motion } from "framer-motion";
import { videoWorks } from "../data.js";
import SectionTitle from "./SectionTitle.jsx";

function VideoCard({ work, i }) {
  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${work.id}`}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative block rounded-2xl overflow-hidden bg-white/5 border border-white/10"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${work.id}/hqdefault.jpg`}
          alt={work.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100
                     transition-opacity duration-300"
        >
          <span className="flex items-center justify-center size-16 rounded-full bg-accent text-ink text-2xl shadow-xl">
            ▶
          </span>
        </div>
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-ink/70 backdrop-blur text-xs font-bold tracking-widest text-cyan">
          {work.tag}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
          {work.title}
        </h3>
        <p className="mt-1 text-paper/60">{work.description}</p>
      </div>
    </motion.a>
  );
}

export default function VideoWorks() {
  return (
    <section id="works" className="px-6 md:px-10 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          index="02"
          title="VIDEO EDITING"
          subtitle="키네틱 타이포그래피와 유튜브·광고 영상 작업"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {videoWorks.map((work, i) => (
            <VideoCard key={work.id} work={work} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
