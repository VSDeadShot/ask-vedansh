export function SectionHeading({ index, children, id }: { index: string; children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted"
    >
      <span className="text-accent">{index}</span>
      <span>{children}</span>
      <span aria-hidden className="h-px flex-1 bg-rule" />
    </h2>
  );
}
