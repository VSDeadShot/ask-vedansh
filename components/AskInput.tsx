"use client";

import { useState } from "react";
import { site } from "@/content/site";

export function AskInput({ onAsk }: { onAsk: (question: string) => void }) {
  const [value, setValue] = useState("");
  const { inputLabel, placeholder, inputHint, submit } = site.ask;
  const empty = value.trim() === "";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!empty) onAsk(value.trim());
      }}
    >
      <label htmlFor="ask-input" className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {inputLabel}
      </label>
      <div className="mt-3 flex items-stretch gap-2">
        <input
          id="ask-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          aria-describedby="ask-hint"
          className="min-w-0 flex-1 border-0 border-b-2 border-ink bg-transparent px-0.5 py-2 text-[17px] placeholder:text-muted/70 focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={empty}
          className="cursor-pointer bg-ink px-5 font-mono text-sm uppercase tracking-[0.12em] text-sheet transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:bg-ink/30"
        >
          {submit} <span aria-hidden>↵</span>
        </button>
      </div>
      <p id="ask-hint" className="mt-2.5 text-sm text-muted">
        {inputHint}
      </p>
    </form>
  );
}
