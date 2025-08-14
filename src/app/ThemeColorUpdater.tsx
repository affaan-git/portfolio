"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

type Props = {
  light?: string;
  dark?: string;
};

export default function ThemeColorUpdater({
  light = "#ffffff",
  dark = "#171717",
}: Props) {
  const { resolvedTheme } = useTheme(); // "light", "dark", undefined

  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }

    const color = resolvedTheme === "dark" ? dark : light;
    meta.setAttribute("content", color);
  }, [resolvedTheme, light, dark]);

  return null;
}