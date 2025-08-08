"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronDown, ArrowDownCircle } from "react-feather";
import { smoothScrollToSection } from "@/utils";

interface Props {
  targetId?: string;  // section id to scroll to
  hideAfter?: number; // px scrolled before hiding (default 150)
}

export default function ScrollIndicatorButton({
  targetId = "about",
  hideAfter = 150,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const controls = useAnimation();
  const interactingRef = useRef(false);

  const tweenToRest = () =>
    controls.start({ y: 0, transition: { type: "tween", duration: 0.15, ease: "easeOut" } });

  const startBounce = () =>
    controls.start({
      y: [0, 12, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
    });

  useEffect(() => {
    const onScroll = () => {
      if (interactingRef.current) return;
      const shouldHide = window.scrollY > hideAfter;
      setHidden(shouldHide);
      if (shouldHide) setHovered(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideAfter]);

  useEffect(() => {
    if (hidden) {
      controls.stop();
      controls.set({ y: 0 });
      return;
    }
    if (hovered) {
      controls.stop();
      tweenToRest();
    } else {
      startBounce();
    }
  }, [hidden, hovered]);

  const handleClick = useCallback(() => {
    setHovered(false);
    interactingRef.current = false;
    smoothScrollToSection(targetId)();
  }, [targetId]);

  return (
    <div
      className="fixed inset-x-0 z-50 flex justify-center transition-opacity duration-500"
      style={{ bottom: "calc(min(8vh, 6rem) + env(safe-area-inset-bottom))" }}
    >
      <motion.button
        type="button"
        aria-label="Scroll to next section"
        onClick={handleClick}
        onPointerEnter={() => { setHovered(true); }}
        onPointerLeave={() => { setHovered(false); }}
        onPointerDown={() => {
          interactingRef.current = true;
          setHovered(true);
          controls.stop();
          tweenToRest();
        }}
        onPointerUp={() => {
          interactingRef.current = false;
          setHovered(false);
        }}
        onPointerCancel={() => {
          interactingRef.current = false;
          setHovered(false);
        }}
        style={{ touchAction: "manipulation" }}
        animate={controls}
        className={`px-2 cursor-pointer ${
          hidden ? "opacity-0 pointer-events-none" : "opacity-80 hover:opacity-100"
        }`}
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