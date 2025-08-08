"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowDownCircle } from "react-feather";
import { smoothScrollToSection } from "@/utils";

interface Props {
  targetId?: string; // section id to scroll to
  hideAfter?: number; // px scrolled before hiding (default 150)
}

export default function ScrollIndicatorButton({
  targetId = "about",
  hideAfter = 150,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > hideAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideAfter]);

  useEffect(() => {
    if (hidden) setHovered(false);
  }, [hidden]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | React.PointerEvent<HTMLButtonElement>) => {
      setHovered(false);
      const fn = smoothScrollToSection(targetId);
      fn(e as any);
    },
    [targetId]
  );

  return (
    <div
      className="
        fixed inset-x-0 z-50
        flex justify-center
        transition-opacity duration-500
      "
      style={{
        bottom: "calc(min(8vh, 6rem) + env(safe-area-inset-bottom))",
      }}
    >
      <motion.button
        type="button"
        aria-label="Scroll to next section"
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onPointerDown={() => setHovered(true)}
        onPointerUp={() => setHovered(false)}
        onPointerCancel={() => setHovered(false)}
        animate={
          hovered
            ? { y: 0 }
            : {
                y: [0, 12, 0],
                transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
              }
        }
        className={`px-2 cursor-pointer
          ${hidden ? "opacity-0 pointer-events-none" : "opacity-80 hover:opacity-100"}
        `}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={hovered ? "arrow" : "chevron"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="inline-flex items-center justify-center"
          >
            {hovered ? <ArrowDownCircle size={30} /> : <ChevronDown size={28} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}