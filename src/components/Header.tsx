"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHub, Linkedin, Sun, Moon } from "react-feather";
import { smoothScrollToSection } from "@/utils";

const NEAR_TOP_PX = 100; // Always visible threshold
const REVEAL_AFTER_UP_PX = 10; // Upward travel return amount

export default function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let upTravel = 0;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;

      if (currentY < NEAR_TOP_PX) {
        upTravel = 0;
        setShowHeader(true);
        return;
      }
      if (delta > 0) {
        upTravel = 0;
        setShowHeader(false);
        return;
      }
      upTravel -= delta;
      if (upTravel >= REVEAL_AFTER_UP_PX) setShowHeader(true);
    };

    // Scroll on reload
    setShowHeader(window.scrollY < NEAR_TOP_PX);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
    console.log(`Welcome to the ${next} side.`);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-background-light text-ink dark:bg-background-dark dark:text-white transition-transform duration-250 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 px-4 sm:px-6 py-4">
        {/* Name */}
        <div className="col-start-1 row-start-1 flex items-center space-x-2">
          <Link
            href="/"
            scroll={false}
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="inline-block text-xl font-semibold cursor-pointer transition-all duration-150 ease-in-out hover:scale-110"
          >
            Affaan Memon
          </Link>
        </div>

        {/* Icons */}
        <div className="col-start-2 row-start-1 md:col-start-3 flex items-center justify-self-end space-x-3 sm:space-x-4">
          <Link
            href="https://www.linkedin.com/in/affaanm"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="LinkedIn"
          >
            <Linkedin
              stroke="currentColor"
              size={28}
              className="transition-all duration-150 group-hover:opacity-50"
            />
          </Link>

          <Link
            href="https://github.com/affaan-git"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="GitHub"
          >
            <GitHub
              stroke="currentColor"
              size={28}
              className="transition-all duration-150 group-hover:opacity-50"
            />
          </Link>

          <button
            onClick={toggleTheme}
            className="ml-1 sm:ml-2 p-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-300 relative h-8 w-8"
            aria-label="Toggle Dark Mode"
          >
            <Sun
              stroke="currentColor"
              size={24}
              strokeWidth={1.5}
              className="absolute inset-0 m-auto transition-all duration-275 opacity-100 scale-100 rotate-0 dark:opacity-0 dark:scale-75 dark:rotate-45 dark:pointer-events-none"
            />
            <Moon
              stroke="gold"
              size={24}
              strokeWidth={1.5}
              className="absolute inset-0 m-auto transition-all duration-275 opacity-0 scale-75 -rotate-45 pointer-events-none dark:opacity-100 dark:scale-100 dark:rotate-0 dark:pointer-events-auto"
            />
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          aria-label="Sections"
          className="col-span-2 md:col-span-1 row-start-2 md:col-start-2 md:row-start-1 justify-self-center w-full md:w-auto"
        >
          <ul className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 sm:gap-x-4 bg-light-muted dark:bg-dark-muted rounded-lg px-4 py-2 text-sm sm:text-base">
            {[
              { label: "About", targetId: "about" },
              { label: "Skills", targetId: "skills" },
              { label: "Certifications", targetId: "certifications" },
              { label: "Projects", targetId: "projects" },
            ].map(({ label, targetId }) => (
              <li key={label}>
                <Link
                  href={`/#${targetId}`}
                  onClick={(e) => {
                    if (pathname === "/") smoothScrollToSection(targetId)(e);
                  }}
                  className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}