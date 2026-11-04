import type { Chip, StoryId } from "@/content/site";

type Props = {
  chips: Chip[];
  activeId?: StoryId | null;
  onPick: (chip: Chip) => void;
};

export function QuestionChips({ chips, activeId, onPick }: Props) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {chips.map((chip) => {
        const active = chip.storyId === activeId;
        return (
          <li key={chip.storyId}>
            <button
              type="button"
              aria-pressed={active}
              onClick={() => onPick(chip)}
              className={`cursor-pointer rounded-[3px] border px-3.5 py-2 text-left text-[15px] leading-snug transition-[translate,box-shadow,background-color,border-color,color] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[2px_3px_0_0_var(--color-ink)] active:translate-y-0 active:shadow-none ${
                active ? "border-accent bg-accent text-sheet" : "border-ink/80 bg-sheet text-ink hover:border-ink"
              }`}
            >
              {chip.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
