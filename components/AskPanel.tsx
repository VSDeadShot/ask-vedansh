"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site, type Chip, type Story } from "@/content/site";
import { matchStory } from "@/lib/match";
import { delay, LOAD } from "@/lib/motion";
import { AskInput } from "./AskInput";
import { Fallback } from "./Fallback";
import { QuestionChips } from "./QuestionChips";
import { SectionHeading } from "./SectionHeading";
import { StoryCard } from "./StoryCard";

type Answer =
  | { kind: "story"; story: Story; asked: string }
  | { kind: "fallback"; asked: string }
  | null;

const storyById = new Map<string, Story>(site.stories.map((s) => [s.id, s]));
const chipLabelFor = (story: Story) =>
  site.chips.find((c) => c.storyId === story.id)?.label ?? story.title;

function setHash(id: string | null) {
  const url = id ? `#${id}` : window.location.pathname + window.location.search;
  window.history.replaceState(null, "", url);
}

export function AskPanel() {
  const [answer, setAnswer] = useState<Answer>(null);
  // Bumped on every answer so the card re-animates and focus/scroll re-run,
  // even when the same story is asked twice.
  const [reveal, setReveal] = useState(0);
  const answerRef = useRef<HTMLDivElement>(null);

  const show = useCallback((next: Answer) => {
    setAnswer(next);
    setReveal((n) => n + 1);
  }, []);

  // Deep links: /#macro-tracker opens that story.
  useEffect(() => {
    const story = storyById.get(window.location.hash.slice(1));
    if (story) show({ kind: "story", story, asked: chipLabelFor(story) });
  }, [show]);

  // Move focus to the new answer, and scroll to it if it's off-screen (mostly mobile).
  useEffect(() => {
    if (reveal === 0 || !answerRef.current) return;
    const el = answerRef.current;
    el.querySelector<HTMLElement>("[data-answer-heading]")?.focus({ preventScroll: true });
    const top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.55) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, [reveal]);

  const pickChip = (chip: Chip) => {
    const story = storyById.get(chip.storyId);
    if (!story) return;
    setHash(story.id);
    show({ kind: "story", story, asked: chip.label });
  };

  const ask = (question: string) => {
    const id = matchStory(question, site.stories);
    const story = id ? storyById.get(id) : undefined;
    if (story) {
      setHash(story.id);
      show({ kind: "story", story, asked: question });
    } else {
      setHash(null);
      show({ kind: "fallback", asked: question });
    }
  };

  const activeId = answer?.kind === "story" ? answer.story.id : null;

  return (
    <section aria-labelledby="ask-heading" id="ask" className="fade-up" style={delay(LOAD.askSection)}>
      <SectionHeading index="02" id="ask-heading">
        {site.ask.heading}
      </SectionHeading>

      <div className="mt-6" role="group" aria-labelledby="chips-label">
        <p id="chips-label" className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {site.ask.chipsLabel}
        </p>
        <QuestionChips chips={site.chips} activeId={activeId} onPick={pickChip} />
      </div>

      <div className="mt-9">
        <AskInput onAsk={ask} />
      </div>

      <div ref={answerRef} className="mt-10 scroll-mt-6">
        {answer === null && (
          <div className="border-[1.5px] border-dashed border-rule px-5 py-10 text-center font-mono text-sm text-muted">
            {site.ask.emptyState}
          </div>
        )}
        {answer?.kind === "story" && <StoryCard key={reveal} story={answer.story} asked={answer.asked} />}
        {answer?.kind === "fallback" && <Fallback key={reveal} asked={answer.asked} onPick={pickChip} />}
      </div>

      {answer?.kind === "story" && (
        <div className="mt-10" role="group" aria-labelledby="another-label">
          <p id="another-label" className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {site.ask.askAnother}
          </p>
          <QuestionChips
            chips={site.chips.filter((c) => c.storyId !== answer.story.id)}
            onPick={pickChip}
          />
        </div>
      )}
    </section>
  );
}
