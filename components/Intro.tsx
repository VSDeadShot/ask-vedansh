import { delay } from "@/lib/motion";
import { site } from "@/content/site";

export function Intro() {
  const { kicker, headline, prompt } = site.intro;
  return (
    <header className="pt-12 pb-12 sm:pt-24 sm:pb-16">
      <p className="rise font-mono text-xs uppercase tracking-[0.18em] text-muted" style={delay(0)}>
        {kicker}
      </p>
      <h1
        className="rise mt-6 max-w-[16ch] font-display text-[2.6rem] leading-[1.04] font-medium tracking-[-0.02em] sm:text-7xl sm:leading-[1.0]"
        style={delay(90)}
      >
        {headline}
      </h1>
      <p className="rise mt-4 font-display text-3xl italic text-accent sm:mt-5 sm:text-5xl" style={delay(200)}>
        {prompt}
        <span aria-hidden className="caret caret-blink" style={delay(900)} />
      </p>
    </header>
  );
}
