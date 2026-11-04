/** Renders `backticked` segments of a string as inline code. */
export function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="rounded-[3px] bg-ink/[0.07] px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}
