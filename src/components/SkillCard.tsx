"use client";

import Image from "next/image";

interface SkillCardProps {
  iconSrc?: string | null;
  iconSrcLight?: string | null;
  iconSrcDark?: string | null;
  label: string;
}

export default function SkillCard({
  iconSrc,
  iconSrcLight,
  iconSrcDark,
  label,
}: SkillCardProps) {
  const showDualIcons = !iconSrc && iconSrcLight && iconSrcDark;
  const hasIcon = !!iconSrc || showDualIcons;

  const lightSrc = iconSrc ?? iconSrcLight ?? "";
  const darkSrc = iconSrc ?? iconSrcDark ?? "";

  return (
    <div
      className={`bg-gray-100 dark:bg-dark-muted rounded-xl p-6 shadow-md flex items-center ${
        hasIcon ? "space-x-3" : "justify-center"
      } outline outline-2 outline-transparent hover:outline-green-300 dark:hover:outline-green-500 transition-all duration-150`}
    >
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

      <span
        className={`text-black dark:text-white ${hasIcon ? "" : "text-center w-full"}`}
      >
        {label}
      </span>
    </div>
  );
}