import { describe, expect, it } from "vitest";
import { site } from "../content/site";
import { matchStory } from "./match";

const ask = (q: string) => matchStory(q, site.stories);

describe("matchStory", () => {
  it("routes every chip question to its own story", () => {
    for (const chip of site.chips) {
      expect(ask(chip.label), chip.label).toBe(chip.storyId);
    }
  });

  it("handles rambling, spoken-style questions", () => {
    expect(ask("um so what was the hardest bug to find, like a race condition or something?")).toBe(
      "task-scheduler",
    );
    expect(ask("tell me about the time an env variable broke your keep-alive")).toBe("macro-tracker");
    expect(ask("Have you ever published a package on npm?")).toBe("commit-gen");
    expect(ask("how did you deal with a slow sign in on Render")).toBe("flashcards");
    expect(ask("do you actually understand the code Claude writes for you?")).toBe("after-build-quiz");
  });

  it("returns null when nothing matches", () => {
    expect(ask("what's your favorite pizza topping?")).toBeNull();
    expect(ask("")).toBeNull();
    expect(ask("   ?!  ")).toBeNull();
  });
});
