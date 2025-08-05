'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4
                 bg-background-light text-black dark:bg-background-dark dark:text-white
                 transition-colors duration-150 overflow-hidden"
    >
      <motion.h1
        className="text-6xl font-bold mb-4"
        variants={fadeInUp}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-lg mb-8"
        variants={fadeInUp}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        This page could not be found.
      </motion.p>

      <motion.a
        href="/"
        className="px-4 py-2 border-2 border-current rounded
                   hover:bg-green-500 hover:text-white dark:hover:bg-green-400
                   transition-colors duration-200"
        variants={fadeInUp}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        Go back home
      </motion.a>
    </motion.div>
  );
}