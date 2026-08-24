"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      id="hero"
      aria-label="Introduction"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      className="h-[calc(100dvh-8rem)] flex flex-col items-center justify-center px-6"
    >
      <p className="text-sm opacity-80">Hello, I&rsquo;m Affaan Memon</p>
      <h1 className="text-4xl font-semibold mt-2 text-center">Software Engineer</h1>
      <h2 className="text-2xl font-normal opacity-90 mt-2 text-center">
        Python, Java, AI/ML, Cloud &amp; Deployment
      </h2>
    </motion.section>
  );
}