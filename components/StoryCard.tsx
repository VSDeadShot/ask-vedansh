import { site, type Story } from "@/content/site";
import { delay, STORY } from "@/lib/motion";
import { Inline } from "./Inline";
import { TypeOut } from "./TypeOut";

const SECTIONS = ["problem", "decision", "broke", "learned"] as const;

export function StoryCard({ story, asked }: { story: Story; asked: string }) {
  return (
    <article className="story-enter border-[1.5px] border-ink bg-sheet shadow-[5px_5px_0_0_var(--color-ink)]">
      <header className="flex items-center justify-between gap-4 border-b border-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] sm:px-8">
        <span>
          Story {story.number} · {story.project}
        </span>
        <span className="text-right text-accent">{story.tag}</span>
      </header>

      <div className="px-5 pt-6 pb-8 sm:px-8 sm:pt-8 sm:pb-10">
        <p className="font-mono text-sm text-muted">
          <span aria-hidden className="text-accent">&gt; </span>
          <span className="sr-only">You asked: </span>
          {asked}
        </p>
        <h3
          tabIndex={-1}
          data-answer-heading
          className="mt-3 font-display text-3xl leading-tight font-medium tracking-[-0.015em] sm:text-[2.6rem]"
        >
          {story.title}
        </h3>

        <dl className="mt-8">
          {SECTIONS.map((key, i) => {
            const learned = key === "learned";
            const appearAt = STORY.firstSection + i * STORY.sectionStep;
            return (
              <div
                key={key}
                className="reveal grid gap-1.5 border-t border-rule py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
                style={delay(appearAt)}
              >
                <dt className="pt-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                  {String(i + 1).padStart(2, "0")} {site.sectionLabels[key]}
                </dt>
                <dd
                  className={
                    learned
                      ? "font-display text-[1.35rem] leading-snug italic"
                      : "text-[17px] leading-relaxed"
                  }
                >
                  {learned ? (
                    <TypeOut text={story[key]} delay={appearAt + STORY.typeAfter} />
                  ) : (
                    <Inline text={story[key]} />
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </article>
  );
}
