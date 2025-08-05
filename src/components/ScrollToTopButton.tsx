"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const progressRef = useRef<SVGCircleElement | null>(null);

  const radius = 10;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const percent = Math.min(100, (scrolled / height) * 100);

      setVisible(percent > 0);

      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = `${circumference - (percent / 100) * circumference}`;
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, [circumference]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`group fixed bottom-4 right-2 sm:right-3 z-50 p-2 rounded-full transition-all duration-150 ease-in-out ${
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