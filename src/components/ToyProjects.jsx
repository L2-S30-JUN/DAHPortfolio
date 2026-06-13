import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toyProjects } from "../data.js";
import SectionTitle from "./SectionTitle.jsx";

/* 썸네일: 이미지가 있으면 표시, 없으면 gradient + 이니셜 fallback */
function Thumbnail({ project, className = "" }) {
  const [failed, setFailed] = useState(false);
  const showImage = project.thumbnail && !failed;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {showImage ? (
        <img
          src={project.thumbnail}
          alt={project.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div
          className={`size-full bg-gradient-to-br ${project.gradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}
        >
          <span className="text-ink/80 font-black text-4xl tracking-tight">
            {project.name}
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
    </div>
  );
}

function ProjectCard({ project, i, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      layoutId={`card-${project.name}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative block text-left rounded-3xl overflow-hidden border border-white/10
                 bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Thumbnail project={project} className="aspect-[16/10]" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-2xl md:text-3xl font-black tracking-tight">
          {project.name}
        </h3>
        <p className="mt-1 text-paper/70 line-clamp-1">{project.tagline}</p>
      </div>
      <span
        className="absolute top-4 right-4 size-9 rounded-full bg-ink/60 backdrop-blur
                   flex items-center justify-center text-paper/80
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        ↗
      </span>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel — shares layoutId with the card for a morphing transition */}
      <motion.div
        layoutId={`card-${project.name}`}
        className="relative z-10 w-full max-w-3xl max-h-[88vh] overflow-y-auto
                   rounded-3xl border border-white/10 bg-ink shadow-2xl"
      >
        <div className="relative">
          <Thumbnail project={project} className="aspect-[16/9]" />
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="absolute top-4 right-4 size-10 rounded-full bg-ink/70 backdrop-blur
                       flex items-center justify-center text-xl hover:bg-accent hover:text-ink transition-colors"
          >
            ✕
          </button>
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-black tracking-tight"
            >
              {project.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="mt-2 text-paper/70 text-lg"
            >
              {project.tagline}
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-6 md:p-8"
        >
          {/* 사용 기술 태그 */}
          {project.stack?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-cyan"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* 전반적인 설명 — 추후 data.js 의 details 로 채워짐 */}
          <div className="space-y-4 text-paper/80 text-lg leading-relaxed">
            {project.details?.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* 바로가기 버튼 */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-paper text-ink font-bold
                         hover:bg-accent transition-colors"
            >
              사이트 바로가기 ↗
            </a>
            {project.videoUrl && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full border border-paper/30 font-bold
                           hover:border-accent hover:text-accent transition-colors"
              >
                기능 소개 영상 ▶
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ToyProjects() {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="px-6 md:px-10 py-28 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          index="03"
          title="TOY PROJECTS"
          subtitle="직접 만들어 배포한 웹 프로젝트 — 카드를 눌러 자세히 보기"
        />
        <div className="grid gap-8 md:grid-cols-2">
          {toyProjects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              i={i}
              onOpen={() => setActive(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
