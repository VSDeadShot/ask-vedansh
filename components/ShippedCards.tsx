import { site } from "@/content/site";
import { delay, LOAD } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

export function ShippedCards() {
  const { heading, items } = site.shipped;
  return (
    <section aria-labelledby="shipped-heading" className="pb-14 sm:pb-20">
      <div className="fade-up" style={delay(LOAD.shippedHeading)}>
        <SectionHeading index="01" id="shipped-heading">
          {heading}
        </SectionHeading>
      </div>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <li
            key={item.name}
            className={`fade-up ${items.length % 2 === 1 && i === items.length - 1 ? "sm:col-span-2" : ""}`}
            style={delay(LOAD.shippedFirstCard + i * LOAD.shippedStep)}
          >
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col gap-1.5 border border-ink/80 bg-sheet px-4 py-3.5 transition-[translate,box-shadow,border-color] duration-150 ease-out hover:-translate-y-[3px] hover:border-ink hover:shadow-[3px_4px_0_0_var(--color-ink)] sm:px-5 sm:py-4"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-xl font-medium">{item.name}</span>
                </span>
                <span aria-hidden className="font-mono text-sm text-muted transition-colors group-hover:text-accent">
                  ↗
                </span>
              </span>
              <span className="text-[15px] leading-snug text-muted">{item.line}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
