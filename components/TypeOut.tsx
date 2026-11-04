"use client";

import { useEffect, useState } from "react";
import { Inline } from "./Inline";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Props = {
  text: string;
  /** ms to wait before the first character appears */
  delay?: number;
  /** total typing time in ms (each character takes at most 24ms) */
  duration?: number;
};

/**
 * Types text out character by character. The full text is laid out invisibly
 * underneath, so the card never changes height while typing, and screen
 * readers get the whole sentence at once.
 */
export function TypeOut({ text, delay = 0, duration = 900 }: Props) {
  const [count, setCount] = useState(() => (reducedMotion() ? text.length : 0));

  useEffect(() => {
    if (reducedMotion()) {
      setCount(text.length);
      return;
    }
    const msPerChar = Math.min(24, duration / Math.max(1, text.length));
    let start: number | null = null;
    let raf = 0;
    const tick = (now: number) => {
      start ??= now + delay;
      const n = Math.min(text.length, Math.max(0, Math.floor((now - start) / msPerChar)));
      setCount(n);
      if (n < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, duration]);

  const typing = count < text.length;

  return (
    <span className="relative block">
      <span className="sr-only">
        <Inline text={text} />
      </span>
      <span aria-hidden className="invisible block">
        <Inline text={text} />
      </span>
      <span aria-hidden className="absolute inset-0">
        <Inline text={text.slice(0, count)} />
        {typing && <span className="caret" />}
      </span>
    </span>
  );
}
