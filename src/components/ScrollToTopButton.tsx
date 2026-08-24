"use client";

import { useEffect, useRef, useState } from "react";

// Only applied while travelling upward
const HIDE_NEAR_TOP_PX = 28;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const progressRef = useRef<SVGCircleElement | null>(null);
  // Animation to prevent click interruption
  const animRef = useRef<number | null>(null);

  const radius = 10;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let frame = 0;
    let maxScroll = 0;
    let lastY = window.scrollY;

    const measure = () => {
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    };

    const render = () => {
      frame = 0;
      const y = window.scrollY;
      const percent = maxScroll > 0 ? Math.min(100, (y / maxScroll) * 100) : 0;

      // Hide early on return
      const goingUp = y < lastY;
      setVisible(y > (goingUp ? HIDE_NEAR_TOP_PX : 0));

      lastY = y;

      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = `${circumference - (percent / 100) * circumference}`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(render);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    render();

    // The page grows as sections animate in, track the document height to handle
    const ro = new ResizeObserver(onResize);
    ro.observe(document.documentElement);

    // Scroll input beats animation
    const cancelAnim = () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", cancelAnim, { passive: true });
    window.addEventListener("touchstart", cancelAnim, { passive: true });
    window.addEventListener("keydown", cancelAnim);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      cancelAnim();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", cancelAnim);
      window.removeEventListener("touchstart", cancelAnim);
      window.removeEventListener("keydown", cancelAnim);
    };
  }, [circumference]);

  const scrollToTop = () => {
    if (animRef.current !== null) return; // returning

    const start = window.scrollY;
    if (start <= 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
      return;
    }

    const duration = Math.min(600, Math.max(250, start * 0.5));
    let startTime: number | null = null;

    const step = (now: number) => {
      startTime ??= now;
      const p = Math.min(1, (now - startTime) / duration);
      // easeOutCubic to prevent pixel creep
      const eased = 1 - Math.pow(1 - p, 3);
      window.scrollTo(0, start * (1 - eased));

      if (p < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        animRef.current = null;
      }
    };

    animRef.current = requestAnimationFrame(step);
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`group fixed bottom-4 right-2 sm:right-3 z-50 p-2 rounded-full cursor-pointer transition-all duration-150 ease-in-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
      }`}
    >
      <svg width="56" height="56" viewBox="0 0 28 28" className="-rotate-90">
        {/* Track */}
        <circle
          cx="14"
          cy="14"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          className="text-gray-400 dark:text-gray-600 opacity-30"
        />
        {/* Progress */}
        <circle
          ref={progressRef}
          cx="14"
          cy="14"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          className="text-gray-600 dark:text-gray-300 transition-colors group-hover:text-green-500 dark:group-hover:text-green-400"
        />
        {/* Arrow */}
        <g transform="rotate(90, 14, 14)">
          <polyline
            points="14,10 14,18"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            className="text-gray-600 dark:text-gray-300 transition-colors group-hover:text-green-500 dark:group-hover:text-green-400"
          />
          <polyline
            points="10,14 14,10 18,14"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            className="text-gray-600 dark:text-gray-300 transition-colors group-hover:text-green-500 dark:group-hover:text-green-400"
          />
        </g>
      </svg>
    </button>
  );
}