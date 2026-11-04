// Matches a free-text question to the closest story by weighted keywords.
// Built for spoken-style input ("um so what was the hardest bug you...")
// so filler words are dropped before scoring.

type Matchable = { id: string; keywords: Record<string, number> };

/** A story needs at least this score to count as a match. */
export const MIN_SCORE = 2;

const STOPWORDS = new Set(
  (
    "a an the and or but so if then than as at by for from in into of on to with about " +
    "what whats which who whom whose when where how hows why is are was were be been being am " +
    "do does did done doing have has had having can could would should will shall may might must " +
    "i im id ive me my mine we us our you youre youve youd your yours he she they them their it its " +
    "this that these those there here not no yes just like really very much more most some any " +
    "anything something ever also too all one tell ask know think want get got give let lets " +
    "talk share story thing things time um uh uhm hmm okay ok so hey hi hello please vedansh " +
    "make made couldnt didnt dont doesnt wasnt isnt arent wont cant whatd wouldnt"
  ).split(" "),
);

function stem(word: string): string {
  let w = word;
  if (w.length > 4 && w.endsWith("ies")) w = w.slice(0, -3) + "y";
  else if (w.length > 5 && w.endsWith("ing")) w = w.slice(0, -3);
  else if (w.length > 3 && w.endsWith("ed") && !w.endsWith("eed")) w = w.slice(0, -2);
  else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
  // debugg -> debug, shipp -> ship
  if (w.length > 3 && /([b-df-hj-np-tv-z])\1$/.test(w)) w = w.slice(0, -1);
  // race / raced / racing all land on "rac"
  if (w.length > 3 && w.endsWith("e")) w = w.slice(0, -1);
  return w;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/c\+\+/g, " cpp ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((t) => t && !STOPWORDS.has(t))
    .map(stem);
}

export function scoreStory(questionTokens: string[], story: Matchable): number {
  const haystack = ` ${questionTokens.join(" ")} `;
  const words = new Set(questionTokens);
  let score = 0;
  for (const [keyword, weight] of Object.entries(story.keywords)) {
    const k = tokenize(keyword);
    if (k.length === 0) continue;
    const hit = k.length === 1 ? words.has(k[0]) : haystack.includes(` ${k.join(" ")} `);
    if (hit) score += weight;
  }
  return score;
}

/** Returns the id of the best-matching story, or null if nothing is close enough. */
export function matchStory(question: string, stories: Matchable[]): string | null {
  const tokens = tokenize(question);
  if (tokens.length === 0) return null;

  let best: { id: string; score: number } | null = null;
  for (const story of stories) {
    const score = scoreStory(tokens, story);
    if (score > (best?.score ?? 0)) best = { id: story.id, score };
  }
  return best && best.score >= MIN_SCORE ? best.id : null;
}
