"use client";

import Image from "next/image";
import { ExternalLink } from "react-feather";

interface SkillCardProps {
  iconSrc?: string | null;
  iconSrcLight?: string | null;
  iconSrcDark?: string | null;
  label: string;
  credentialUrl?: string | null;
}

const isSafeUrl = (url: string) => /^https?:\/\//i.test(url);

export default function SkillCard({
  iconSrc,
  iconSrcLight,
  iconSrcDark,
  label,
  credentialUrl,
}: SkillCardProps) {
  const credentialHref =
    credentialUrl && isSafeUrl(credentialUrl) ? credentialUrl : null;

  const showDualIcons = !iconSrc && iconSrcLight && iconSrcDark;
  const hasIcon = !!iconSrc || showDualIcons;

  const lightSrc = iconSrc ?? iconSrcLight ?? "";
  const darkSrc = iconSrc ?? iconSrcDark ?? "";

  const cardClass = `group relative bg-light-muted dark:bg-dark-muted rounded-xl p-6 shadow-md flex items-center ${
    hasIcon ? "space-x-3" : "justify-center"
  } outline outline-2 outline-transparent hover:outline-green-300 dark:hover:outline-green-500 focus-visible:outline-green-500 transition-all duration-150`;

  const body = (
    <>
      {credentialHref && (
        <span
          aria-hidden
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity duration-150"
        >
          <ExternalLink stroke="currentColor" size={14} />
        </span>
      )}

      {hasIcon && (
        <div className="w-6 h-6 relative flex-shrink-0">
          {showDualIcons ? (
            <>
              <div className="block dark:hidden w-full h-full relative">
                <Image
                  src={lightSrc}
                  alt={`${label} (light)`}
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-sm"
                />
              </div>
              <div className="hidden dark:block w-full h-full relative">
                <Image
                  src={darkSrc}
                  alt={`${label} (dark)`}
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-sm"
                />
              </div>
            </>
          ) : (
            <Image
              src={lightSrc}
              alt={label}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-sm"
            />
          )}
        </div>
      )}

      <span className={`text-ink dark:text-white ${hasIcon ? "" : "text-center w-full"}`}>
        {label}
      </span>
    </>
  );

  if (credentialHref) {
    return (
      <a
        href={credentialHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Verify ${label}`}
        className={cardClass}
      >
        {body}
      </a>
    );
  }

  return <div className={cardClass}>{body}</div>;
}
