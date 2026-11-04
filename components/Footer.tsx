import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-20 flex flex-col gap-4 border-t-[1.5px] border-ink py-8 sm:mt-28 sm:flex-row sm:items-center sm:justify-between">
      <ul className="flex gap-6 font-mono text-sm uppercase tracking-[0.12em]">
        {site.footer.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-rule decoration-2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {link.label} <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="font-display text-lg italic text-muted">{site.footer.credit}</p>
    </footer>
  );
}
