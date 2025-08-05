"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { smoothScrollToSection } from "@/utils";
import { ChevronDown, ArrowDownCircle } from "react-feather";

export default function Hero() {
  const [hovered, setHovered] = useState(false);
  const [hideIndicator, setHideIndicator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHideIndicator(scrollY > 150); // Threshold to hide indicator
    };

    handleScroll(); // Check once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-6"
    >
      <p className="text-sm opacity-80">Hello, I&rsquo;m Affaan Memon</p>
      <h1 className="text-4xl font-semibold mt-2 text-center">
        Entry-Level Software Engineer
      </h1>
      <h2 className="text-2xl font-medium mt-1 text-center">Based in the USA</h2>
      <p className="max-w-xl text-center text-base opacity-80 mt-4">
        As a full-stack software engineer, I help build business applications and
        infrastructure from any point in the process - Start to Finish.
      </p>

      <motion.div
        animate={hovered ? { y: 0 } : { y: [0, 12, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }}}
        className={`absolute [bottom:min(8vh,6rem)] left-1/2 -translate-x-1/2 z-10 cursor-pointer transition-opacity duration-500
          ${hideIndicator ? "opacity-0 pointer-events-none" : "opacity-80 hover:opacity-100"}
          w-fit px-2 text-center flex items-center justify-center
        `}
        onClick={smoothScrollToSection("about")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={hovered ? "arrow-down-circle" : "chevron-down"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {hovered ? <ArrowDownCircle size={30} /> : <ChevronDown size={28} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>

    </motion.section>
  );
}