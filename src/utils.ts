export const isBrowser = () => typeof window !== 'undefined';

export const scrollToSection = (elementId: string) => {
  if (!isBrowser()) return;

  const el = document.getElementById(elementId);
  if (!el) return;

  const headerOffset = 64; // 4rem
  const initialY = window.scrollY;

  const elementTop = el.getBoundingClientRect().top + window.scrollY;
  const scrollingUp = elementTop < initialY;

  const targetY = scrollingUp
    ? elementTop - headerOffset
    : elementTop;

  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  });
};

export const smoothScrollToSection =
  (elementId: string) =>
  (e?: React.SyntheticEvent<HTMLElement>) => {
    e?.preventDefault?.();
    scrollToSection(elementId);
  };