"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { smoothScrollToSection } from "@/utils";

export default function Hero() {
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
    </motion.section>
  );
}