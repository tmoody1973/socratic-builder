# Learner profile

This file tells the socratic-builder skill how to teach *you*. Copy it to `profile.md` in this folder (git-ignored, never committed), or run `/socratic-profile` and Claude will interview you and write it. See `docs/profile-guide.md` for what each part does and examples at different experience levels.

## About me

- **Role:** AI director
  <!-- vibe coder · AI director · developer · senior engineer -->
- **Background:** Product manager; I used to be an architect.
  <!-- One or two sentences. Your field outside software is gold for metaphors. -->

## How I want to learn

- **Goal:** understand-to-verify
  <!-- understand-to-verify: the AI writes code; I want to check it and explain it.
       write-it-myself: I want to write the code and get feedback.
       go-deeper: I already build; push me on trade-offs and failure modes. -->
- **Question budget:** standard
  <!-- light (≤1 per chunk) · standard (1 per message) · push-me (2–3 per message) -->
- **Explanation style:** plain
  <!-- plain · define-inline · technical. You can override per topic below. -->
- **Attention:** One idea per message. Short messages. Show me evidence, not assertions.
  <!-- Anything about how you take in information best. -->

## Topic levels

<!-- new: show me a worked example first · familiar: ask me questions · fluent: stay out of my way.
     Add "(style: technical)" to override the explanation style for one topic. -->

| Topic | Level |
|---|---|
| Product and UX thinking | fluent |
| Reading a diff (a before/after view of changed code) | new |
| Data models: tables, fields and how they relate | new |
| APIs: how apps talk to each other | familiar |
| Deployment: getting an app live | familiar |
| Testing: proving code works | new |

## Learning goals (max 3)

1. **Read a diff and say what could break.** I'll know I've got it when I can review an AI change and name one real risk before it ships.
2. **Reason about a data model.** I'll know I've got it when I can say what rule must always hold before a change is made.
3. <!-- optional third -->

## Blind spots

<!-- Things you feel confident about but have never really been tested on. Claude checks these first. -->
- I *think* I understand environment variables, but I've been caught out by them before.

## Metaphors that land for me

- Architecture: load-bearing vs decorative, foundation vs facade.
- <!-- Cooking, music, sport, your job: whatever you know deeply. -->

## Journal

- **Journal path:** ~/.claude/journal/learning-log.md
- **Project tags:** #my-app #side-project
- **Site:** on
  <!-- on: /socratic-site can build a browsable site. Publishing is always a separate, confirmed step. -->
