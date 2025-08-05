"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

interface ProjectCardProps {
  title: string;
  imageSrc?: string | null;
  imageSrcLight?: string | null;
  imageSrcDark?: string | null;
  description: string;
  tags: string[];
}

export default function ProjectCard({
  title,
  imageSrc,
  imageSrcLight,
  imageSrcDark,
  description,
  tags,
}: ProjectCardProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const chosenSrc = useMemo(() => {
    if (!mounted) return null;
    return (
      imageSrc ??
      (resolvedTheme === "dark" ? imageSrcDark ?? imageSrcLight : imageSrcLight ?? imageSrcDark) ??
      null
    );
  }, [mounted, resolvedTheme, imageSrc, imageSrcLight, imageSrcDark]);

  return (
    <div className="bg-gray-100 dark:bg-dark-muted rounded-xl p-6 shadow-md flex flex-col outline outline-2 outline-transparent hover:outline-green-300 dark:hover:outline-green-500 hover:scale-105 transition-all duration-150">
      {/* Title */}
      <h3 className="text-xl text-center text-black dark:text-white mb-4">{title}</h3>

      {/* Image or Fallback */}
      <div className="relative aspect-[16/9] rounded-md overflow-hidden mb-4">
        {chosenSrc ? (
          <Image
            src={chosenSrc}
            alt={title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ objectFit: "contain" }}
            className="rounded-md"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md">
            {!imageSrc && !imageSrcLight && !imageSrcDark && (
              <span className="text-sm text-gray-500 dark:text-gray-400">No preview</span>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-black dark:text-white text-base leading-relaxed mb-4 flex-1">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="border border-black dark:border-white rounded-full px-3 py-1 text-black dark:text-white text-sm hover:opacity-50 dark:hover:opacity-75 transition-opacity duration-150"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}