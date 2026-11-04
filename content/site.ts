// Every word on the site lives in this file.
// Wrap text in `backticks` to render it as inline code.

export type StoryId =
  | "flashcards"
  | "task-scheduler"
  | "macro-tracker"
  | "commit-gen"
  | "after-build-quiz";

export type Story = {
  id: StoryId;
  number: string;
  project: string;
  title: string;
  /** Short stat shown in the story's header bar. */
  tag: string;
  problem: string;
  decision: string;
  broke: string;
  learned: string;
  /**
   * What a typed question gets matched against. Weight = how strongly a
   * word or phrase points at this story (1 = vague hint, 4+ = dead giveaway).
   */
  keywords: Record<string, number>;
};

export type Chip = { label: string; storyId: StoryId };
export type ShippedItem = { name: string; line: string; href: string };
export type FooterLink = { label: string; href: string };

/** Typed array helper: checks every item against T without widening. */
const list = <T,>(items: T[]): T[] => items;

const GITHUB = "https://github.com/VSDeadShot";
const LINKEDIN = "https://www.linkedin.com/in/vedanshsharma2805";

export const site = {
  meta: {
    title: "Ask Vedansh",
    description:
      "An interactive version of Vedansh, a CS student who ships things. Pick a question and get a true story: the problem, the decision, what broke, and what I learned.",
  },

  intro: {
    kicker: "Ask Vedansh · Field notes",
    headline: "I'm Vedansh, a CS student who ships things.",
    prompt: "Ask me anything.",
  },

  shipped: {
    heading: "Small things I've shipped",
    items: list<ShippedItem>([
      {
        name: "Flashcards",
        line: "A Java and Spring Boot interview prep app with an Android client, live on Render.",
        href: GITHUB,
      },
      {
        name: "Macro Tracker",
        line: "Snap a photo of your meal and get the macros. A Next.js app with Gemini Vision and Supabase.",
        href: GITHUB,
      },
      {
        name: "Task Scheduler",
        line: "A multi-threaded thread pool library in C++, tested with ThreadSanitizer.",
        href: GITHUB,
      },
      {
        name: "After-Build Quiz",
        line: "A Claude Code plugin that quizzes me on the code I just shipped.",
        href: GITHUB,
      },
      {
        name: "Commit Gen",
        line: "An AI commit message CLI published on npm that works with Gemini or local Ollama.",
        href: GITHUB,
      },
    ]),
  },

  ask: {
    heading: "Ask me something",
    chipsLabel: "Pick a question",
    inputLabel: "Or ask in your own words",
    placeholder: "e.g. what's the worst bug you've shipped?",
    inputHint: "Rambling is fine. That's how I built this whole site.",
    submit: "Ask",
    emptyState: "Your answer shows up here.",
    askAnother: "Ask something else",
  },

  chips: list<Chip>([
    { label: "What's a bug that humbled you?", storyId: "macro-tracker" },
    { label: "What's the hardest bug you had to find?", storyId: "task-scheduler" },
    { label: "How do you make decisions?", storyId: "flashcards" },
    { label: "What did you build alone?", storyId: "commit-gen" },
    { label: "Why did you build your own learning tool?", storyId: "after-build-quiz" },
  ]),

  sectionLabels: {
    problem: "The problem",
    decision: "The decision",
    broke: "What broke",
    learned: "What I learned",
  },

  stories: list<Story>([
    {
      id: "flashcards",
      number: "01",
      project: "Flashcards",
      title: "The sign-in that took 150 seconds.",
      tag: "150s timeout",
      problem:
        "My Java interview prep app runs on Render's free tier, which sleeps when idle. When someone tapped Sign In, the app just looked frozen while the server woke up. On top of that, two token refreshes could race each other and log people out.",
      decision:
        "Design for it instead of hiding it: a 150-second sign-in timeout, a \"waking the server\" screen so people know what's going on, and a fix so only one token refresh runs at a time.",
      broke:
        "My first test on my Galaxy S24 failed, and it turned out the phone was running an old build, so I'd been debugging the wrong code.",
      learned:
        "Check what's actually running before you debug, and honest waiting UI beats fake speed.",
      keywords: {
        decision: 4,
        decide: 4,
        choice: 3,
        choose: 3,
        tradeoff: 3,
        "trade off": 3,
        flashcard: 4,
        java: 3,
        spring: 3,
        android: 3,
        render: 3,
        sign: 4,
        signin: 4,
        login: 3,
        auth: 4,
        authentication: 4,
        token: 3,
        refresh: 2,
        timeout: 3,
        "cold start": 4,
        wake: 2,
        asleep: 2,
        sleep: 2,
        slow: 2,
        frozen: 2,
        loading: 2,
        "150": 3,
        "interview prep": 3,
        galaxy: 2,
        phone: 2,
        ux: 2,
      },
    },
    {
      id: "task-scheduler",
      number: "02",
      project: "Task Scheduler",
      title: "The race I couldn't see.",
      tag: "1 race, last item",
      problem:
        "I'm building a multi-threaded task scheduler in C++. All the tests passed until ThreadSanitizer flagged a data race on the very last item in the work queue.",
      decision:
        "Stop trusting that the tests pass, make ThreadSanitizer part of every slice, and fix the race before moving on. Later, `stop` could hang, and I fixed that as its own commit instead of patching around it.",
      broke:
        "A long ThreadSanitizer run got killed because Windows ran out of memory, so I had to cap WSL's memory before I could even measure.",
      learned:
        "Concurrency bugs don't show up in happy-path tests, and tools that catch them are worth the slowdown.",
      keywords: {
        hardest: 4,
        hard: 2,
        find: 1,
        race: 4,
        "data race": 4,
        "race condition": 4,
        thread: 3,
        multithread: 3,
        "multi thread": 3,
        concurrency: 4,
        concurrent: 3,
        parallel: 2,
        tsan: 4,
        threadsanitizer: 4,
        sanitizer: 3,
        cpp: 3,
        scheduler: 4,
        schedule: 2,
        queue: 3,
        pool: 2,
        wsl: 3,
        memory: 2,
        hang: 2,
        deadlock: 3,
        invisible: 2,
        see: 1,
        test: 1,
        bug: 1,
      },
    },
    {
      id: "macro-tracker",
      number: "03",
      project: "Macro Tracker",
      title: "One missing letter, 11 days.",
      tag: "11 days silent",
      problem:
        "Supabase kept warning that my meal-tracking app's database would be paused for inactivity, even though I'd built a daily keep-alive.",
      decision:
        "Stop assuming and check the logs. The keep-alive had been returning a 500 error every single day, because I'd saved the environment variable as `UPABASE` instead of `SUPABASE`. One letter.",
      broke:
        "For 11 days my fix was silently failing, and the check that would have caught it kept getting pushed down my to-do list.",
      learned: "A fix isn't done until you've watched it work in production.",
      keywords: {
        humble: 4,
        humbling: 4,
        embarrass: 3,
        dumb: 3,
        silly: 3,
        stupid: 3,
        mistake: 2,
        typo: 4,
        letter: 3,
        "missing letter": 4,
        env: 3,
        "env var": 4,
        "environment variable": 4,
        variable: 2,
        supabase: 4,
        "keep alive": 4,
        keepalive: 4,
        macro: 4,
        meal: 3,
        food: 2,
        nutrition: 2,
        calorie: 2,
        database: 2,
        pause: 2,
        inactivity: 2,
        logs: 2,
        "500": 2,
        production: 2,
        prod: 2,
        silent: 2,
        silently: 2,
        "11": 2,
        gemini: 1,
        bug: 2,
      },
    },
    {
      id: "commit-gen",
      number: "04",
      project: "Commit Gen",
      title: "My first package on npm.",
      tag: "v1.1.0",
      problem:
        "I wanted a CLI that writes Git commit messages with AI, using Gemini or a local Ollama model, and I wanted it to work as a real Git hook, not just a toy script. I built it alone and published it to npm.",
      decision:
        "Treat it like a real product: streaming responses, a Git hook that triggers automatically, and test-first fixes when things broke.",
      broke:
        "The Gemini stream parser silently dropped the very last word of the message, because it never flushed its buffer when the stream ended. I only proved it with a mock stream that had no trailing newline. Then it crashed on exit on Windows, and when Gemini was overloaded it would print a header and look half-successful. I fixed each one, test first, and shipped them as version 1.1.0.",
      learned:
        "Bugs hide at the edges, at the end of a stream or an exit, and real users find those edges faster than you do.",
      keywords: {
        alone: 4,
        solo: 4,
        yourself: 3,
        "on your own": 3,
        independently: 3,
        commit: 4,
        git: 3,
        npm: 4,
        package: 3,
        publish: 3,
        "open source": 3,
        cli: 3,
        "command line": 3,
        hook: 3,
        ollama: 4,
        gemini: 2,
        stream: 3,
        streaming: 3,
        buffer: 3,
        flush: 3,
        "last word": 3,
        edge: 2,
        "edge case": 3,
        windows: 1,
        llm: 1,
        build: 1,
      },
    },
    {
      id: "after-build-quiz",
      number: "05",
      project: "After-Build Quiz",
      title: "Why I built it.",
      tag: "every build",
      problem:
        "I build a lot with Claude Code, and I noticed I could ship features I couldn't fully explain afterwards. That's dangerous in an interview, and in a real job too.",
      decision:
        "Build my own Claude Code plugin that quizzes me on the code that was just written: what changed, why, and what could break.",
      broke:
        "Plenty, like redaction rules for secrets in logs, and plugin updates breaking things. Each one became a commit and a lesson.",
      learned:
        "AI makes building faster, but it doesn't make understanding optional. This tool keeps me honest.",
      keywords: {
        "learning tool": 5,
        learn: 2,
        learning: 2,
        tool: 1,
        own: 1,
        quiz: 4,
        "after build": 4,
        claude: 3,
        "claude code": 4,
        plugin: 3,
        ai: 2,
        "vibe coding": 4,
        understand: 3,
        understanding: 3,
        explain: 3,
        honest: 2,
        interview: 1,
        study: 2,
      },
    },
  ]),

  fallback: {
    title: "I don't have a story for that one yet.",
    body: "I only tell true ones, and right now I have five. Try one of these:",
  },

  footer: {
    links: list<FooterLink>([
      { label: "GitHub", href: GITHUB },
      { label: "LinkedIn", href: LINKEDIN },
    ]),
    credit: "Built by voice using Wispr Flow.",
  },
};
