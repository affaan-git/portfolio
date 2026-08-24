"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronDown, ArrowDownCircle } from "react-feather";
import { smoothScrollToSection } from "@/utils";

interface Props {
  targetId?: string;  // section id to scroll to
  hideAfter?: number; // px scrolled before hiding (default 115)
}

export default function ScrollIndicatorButton({
  targetId = "about",
  hideAfter = 115,
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
      void tweenToRest();
    } else {
      void startBounce();
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
      style={{ bottom: "calc(min(8svh, 6rem) + env(safe-area-inset-bottom))" }}
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
          void tweenToRest();
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
        className={`relative h-9 w-9 cursor-pointer ${
          hidden ? "opacity-0 pointer-events-none" : "opacity-80 hover:opacity-100"
        }`}
      >
        {/* Both icons stay mounted and cross-fade */}
        <ChevronDown
          size={28}
          className={`absolute inset-0 m-auto transition-all duration-200 ${
            hovered ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        />
        <ArrowDownCircle
          size={30}
          className={`absolute inset-0 m-auto transition-all duration-200 ${
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />
      </motion.button>
    </div>
  );
}