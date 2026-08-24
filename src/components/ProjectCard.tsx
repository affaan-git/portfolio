"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState, type JSX } from "react";
import { Calendar, ExternalLink } from "react-feather";

export interface ProjectLink {
  label: string;
  href: string;
}

interface ProjectCardProps {
  title: string;
  imageSrc?: string | null;
  imageSrcLight?: string | null;
  imageSrcDark?: string | null;
  description: string;
  tags: string[];
  dateRange?: string;
  links?: ProjectLink[];
  priority?: boolean;
}

const URL_CAPTURE_REGEX = /(https?:\/\/[^\s]+)/gi;
const BULLET_REGEX = /^\s*[*•]\s+/;

function renderInline(text: string, keyPrefix: string) {
  return text.split(URL_CAPTURE_REGEX).map((part, i) =>
    part.startsWith("http://") || part.startsWith("https://") ? (
      <a
        key={`${keyPrefix}-lnk-${i}`}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 underline break-words [overflow-wrap:anywhere]"
      >
        {part}
      </a>
    ) : (
      <span key={`${keyPrefix}-txt-${i}`}>{part}</span>
    )
  );
}

// Render mixed '*' and '•' description
function renderDescription(text: string) {
  const lines = text.replace(/\r\n?/g, "\n").replace(/\\n/g, "\n").split("\n");

  const out: JSX.Element[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (bullets.length === 0) return;
    const items = bullets;
    bullets = [];
    out.push(
      <ul key={`ul-${out.length}`} className="list-disc pl-5 space-y-1 my-2">
        {items.map((item, i) => (
          <li key={i}>{renderInline(item, `li-${out.length}-${i}`)}</li>
        ))}
      </ul>
    );
  };

  lines.forEach((line, i) => {
    if (BULLET_REGEX.test(line)) {
      bullets.push(line.replace(BULLET_REGEX, ""));
      return;
    }
    flushBullets();
    if (line.trim() === "") return;
    out.push(
      <p key={`p-${i}`} className="my-1 first:mt-0">
        {renderInline(line, `p-${i}`)}
      </p>
    );
  });
  flushBullets();

  return out;
}

// Initials used by the placeholder when a project has no screenshot
function monogram(title: string) {
  const name = title.split(" - ")[0];
  const words = name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "//";
  const first = words[0];
  if (words.length === 1 || first === first.toUpperCase()) {
    return first.slice(0, 2).toUpperCase();
  }
  return (first[0] + words[1][0]).toUpperCase();
}

export default function ProjectCard({
  title,
  imageSrc,
  imageSrcLight,
  imageSrcDark,
  description,
  tags,
  dateRange,
  links,
  priority = false,
}: ProjectCardProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => setMounted(true), []);

  const hasAnyImage = !!(imageSrc ?? imageSrcLight ?? imageSrcDark);

  const chosenSrc = useMemo(() => {
    if (imageSrc) return imageSrc;

    // light/dark theme resolution
    if (!mounted) return null;
    return (
      (resolvedTheme === "dark"
        ? imageSrcDark ?? imageSrcLight
        : imageSrcLight ?? imageSrcDark) ?? null
    );
  }, [mounted, resolvedTheme, imageSrc, imageSrcLight, imageSrcDark]);

  useEffect(() => setImgFailed(false), [chosenSrc]);

  const showImage = !!chosenSrc && !imgFailed;
  // Neutral until failed
  const showPlaceholder = !showImage && hasAnyImage && !imgFailed;

  return (
    <div className="bg-light-muted dark:bg-dark-muted rounded-xl p-6 shadow-md flex flex-col outline outline-2 outline-transparent hover:outline-green-300 dark:hover:outline-green-500 hover:scale-105 transition-all duration-150">
      {/* Title */}
      <h3 className="text-xl text-center text-ink dark:text-white mb-1">{title}</h3>

      {dateRange && (
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-black/10 dark:border-white/10 px-2 py-0.5 text-sm text-gray-700 dark:text-gray-300 bg-black/5 dark:bg-white/10 hover:scale-105 transition-transform duration-150">
            <span aria-hidden>
              <Calendar stroke="currentColor" size={16} className="transition-colors duration-150" />
            </span>
            <span>{dateRange}</span>
          </span>
        </div>
      )}

      {/* Screenshot or a monogram when the project has none */}
      <div className="relative aspect-[16/9] rounded-md overflow-hidden mb-4">
        {showImage ? (
          <Image
            src={chosenSrc}
            alt={title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ objectFit: "contain" }}
            className="rounded-md"
            priority={priority}
            onError={() => setImgFailed(true)}
          />
        ) : showPlaceholder ? (
          <div className="w-full h-full rounded-md bg-gray-200 dark:bg-white/5" />
        ) : (
          <div className="w-full h-full rounded-md flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-[#2c3e52] dark:via-[#243447] dark:to-[#1b2836]">
            <span
              aria-hidden
              className="font-mono text-5xl font-semibold tracking-widest text-ink/25 dark:text-white/30 select-none"
            >
              {monogram(title)}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="text-ink dark:text-white text-base leading-relaxed mb-4 flex-1">
        {renderDescription(description)}
      </div>

      {/* Links */}
      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-white/10 px-3 py-1.5 text-sm font-medium text-ink dark:text-white hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-500/10 dark:hover:border-green-500 transition-colors duration-150"
            >
              <ExternalLink stroke="currentColor" size={14} aria-hidden />
              <span>{label}</span>
            </a>
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="border border-ink/50 dark:border-white/70 rounded-full px-3 py-1 text-ink dark:text-white text-sm hover:scale-105 transition-transform duration-150"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
