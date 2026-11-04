import type { CSSProperties } from "react";

/** Sets the --d custom property used by the .rise / .fade-up / .reveal animations. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Page-load timeline (ms). Shipped cards follow the heading lines. */
export const LOAD = {
  shippedHeading: 320,
  shippedFirstCard: 380,
  shippedStep: 60,
  askSection: 720,
} as const;

/** Story-open timeline (ms), measured from when the card mounts. */
export const STORY = {
  firstSection: 140,
  sectionStep: 90,
  /** extra wait after the "What I learned" row appears before typing starts */
  typeAfter: 160,
} as const;
