"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHub, Linkedin, Sun, Moon } from "react-feather";
import { smoothScrollToSection } from "@/utils";

export default function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const isLight = resolvedTheme === "light";
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);

    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setShowHeader(currentY < 100 || currentY < lastScrollY);
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = isLight ? "dark" : "light";
    setTheme(next);
    console.log(`Welcome to the ${next} side.`);
  };

  if (!mounted) return null;

  return (
    <header
      className={`sticky top-0 z-50 bg-background-light text-black dark:bg-background-dark dark:text-white transition-transform duration-250 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 px-4 sm:px-6 py-4">
        {/* Name */}
        <div className="col-start-1 row-start-1 flex items-center space-x-2">
          <Link href="/" scroll={false}>
            <span
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="inline-block text-xl font-semibold cursor-pointer transition-all duration-150 ease-in-out hover:scale-110"
            >
              Affaan Memon
            </span>
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
              stroke={isLight ? "black" : "white"}
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
              stroke={isLight ? "black" : "white"}
              size={28}
              className="transition-all duration-150 group-hover:opacity-50"
            />
          </Link>

          <button
            onClick={toggleTheme}
            className="ml-1 sm:ml-2 p-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 relative h-8 w-8"
            aria-label="Toggle Dark Mode"
          >
            <Moon
              stroke="black"
              size={24}
              strokeWidth={1.5}
              className={`absolute inset-0 m-auto transition-all duration-275 transform ${
                isLight
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 rotate-45 pointer-events-none"
              }`}
            />
            <Sun
              stroke="gold"
              size={24}
              strokeWidth={1.5}
              className={`absolute inset-0 m-auto transition-all duration-275 transform ${
                isDark
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 -rotate-45 pointer-events-none"
              }`}
            />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="col-span-2 md:col-span-1 row-start-2 md:col-start-2 md:row-start-1 justify-self-center w-full md:w-auto">
          <ul className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 sm:gap-x-4 bg-gray-200 bg-opacity-40 dark:bg-gray-800 dark:bg-opacity-40 rounded-lg px-4 py-2 text-sm sm:text-base">
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
        </div>
      </div>
    </header>
  );
}