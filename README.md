# Ask Vedansh

An interactive portfolio where visitors ask how I build and think, and get a true story from one of my projects.

Live: https://ask-vedansh.vercel.app/

## How it was built

Dictated by voice with Wispr Flow and built with Claude Code, for the Wispr Flow hiring challenge.

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS
- Fully static: no backend, no database, no API keys

## How the matcher works

A typed question is lowercased, stripped of filler words, and reduced to rough word stems.
Each story has a weighted list of keywords and phrases; the story with the highest score wins.
If nothing scores high enough, the site shows a fallback with the suggested questions.

## Content

Every word on the site lives in `content/site.ts`: the intro, question chips, stories, keywords, shipped projects and links.

## Run locally

```
npm install
npm run dev
npm test
```
