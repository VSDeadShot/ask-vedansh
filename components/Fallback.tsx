import { site, type Chip } from "@/content/site";
import { QuestionChips } from "./QuestionChips";

export function Fallback({ asked, onPick }: { asked: string; onPick: (chip: Chip) => void }) {
  return (
    <div className="story-enter border-[1.5px] border-dashed border-ink bg-sheet px-5 pt-6 pb-8 sm:px-8 sm:pt-8">
      <p className="font-mono text-sm text-muted">
        <span aria-hidden className="text-accent">&gt; </span>
        <span className="sr-only">You asked: </span>
        {asked}
      </p>
      <h3 tabIndex={-1} data-answer-heading className="mt-3 font-display text-2xl font-medium sm:text-3xl">
        {site.fallback.title}
      </h3>
      <p className="mt-2 mb-5 text-[17px] text-muted">{site.fallback.body}</p>
      <QuestionChips chips={site.chips} onPick={onPick} />
    </div>
  );
}
