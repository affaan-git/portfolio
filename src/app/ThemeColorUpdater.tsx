"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

type Props = {
  light?: string;
  dark?: string;
};

export default function ThemeColorUpdater({
  light = "#f3f4f6",
  dark = "#121212",
}: Props) {
  const { resolvedTheme } = useTheme(); // "light", "dark", undefined

  useEffect(() => {
    const color = resolvedTheme === "dark" ? dark : light;
    const metas = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');

    if (metas.length === 0) {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      meta.setAttribute("content", color);
      document.head.appendChild(meta);
      return;
    }

    metas.forEach((meta) => meta.setAttribute("content", color));
  }, [resolvedTheme, light, dark]);

  return null;
}