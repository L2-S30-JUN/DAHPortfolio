import { useEffect, useRef } from "react";

const COLORS = ["#ff4d2e", "#7c5cff", "#2ee6d6", "#f4f1ea"];

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let raf;

    const pointer = { x: -9999, y: -9999, active: false };

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(
        140,
        Math.floor((width * height) / 14000)
      );
      particles = Array.from({ length: target }, () => {
        const hx = Math.random() * width;
        const hy = Math.random() * height;
        return {
          // home (원래) 위치 — 마우스가 멀어지면 이곳으로 복귀
          hx,
          hy,
          x: hx,
          y: hy,
          vx: 0,
          vy: 0,
          r: Math.random() * 1.8 + 0.6,
          // 잔잔한 idle 흔들림을 위한 위상/진폭
          phase: Math.random() * Math.PI * 2,
          freq: 0.4 + Math.random() * 0.5,
          amp: 4 + Math.random() * 6,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    }

    let time = 0;

    function step() {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 원래 자리(home) 주변을 부드럽게 떠다니는 목표 지점
        const targetX = p.hx + Math.sin(time * p.freq + p.phase) * p.amp;
        const targetY = p.hy + Math.cos(time * p.freq * 0.8 + p.phase) * p.amp;

        // 복귀 스프링력 — home 쪽으로 끌어당김
        p.vx += (targetX - p.x) * 0.02;
        p.vy += (targetY - p.y) * 0.02;

        // pointer repulsion (원형으로 밀어냄)
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist2 = dx * dx + dy * dy;
          const radius = 130;
          if (dist2 < radius * radius && dist2 > 0.01) {
            const dist = Math.sqrt(dist2);
            const force = (1 - dist / radius) * 2.2;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // friction — 밀려난 뒤 빠르게 감속하고 복귀
        p.vx *= 0.86;
        p.vy *= 0.86;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
      }

      // connection lines
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 110 * 110) {
            const alpha = (1 - Math.sqrt(dist2) / 110) * 0.18;
            ctx.strokeStyle = `rgba(124,92,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(step);
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }
    function onPointerLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerout", onPointerLeave);

    if (reduce) {
      step();
      cancelAnimationFrame(raf);
      raf = null;
    } else {
      step();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-0 size-full pointer-events-none"
    />
  );
}
