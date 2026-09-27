# 001 — Teach people to check AI's work, not to write code

**Decision** — The skill's everyday loop is "predict, see, explain back", aimed at understanding and verifying what the AI built. People who direct AI are never asked to write code to learn.

**Why this came up** — Version 1 coached people as if they typed the code themselves ("how would you write the signature?"). But its main user directs AI agents and wants to verify their output. The skill was teaching a job he doesn't do, which likely explains why it wasn't sticking.

**Options**
- Keep v1's write-the-code coaching: familiar Socratic method, but it trains a skill many AI builders don't use and slows every build.
- Turn teaching off while building and teach separately: no slowdown, but learning drifts away from real work and rarely happens.
- A short loop inside the build, with a goal dial (understand-to-verify, write-it-myself, go-deeper): about 30 seconds per change, with learning attached to the real work. Costs a little attention every time.

**What we chose and why** — The loop plus the goal dial. Tarik chose "all of it, v2" after Claude laid out the research. Anthropic's 2026 study found that people who let AI generate code and then asked *why it works* kept most of their learning, while people who handed everything over did not.

**What we gave up** — People who want to learn to hand-write code get less of that by default (they must choose "write-it-myself"). And every change now costs a small pause.

**How we'll know if this was right** — After a month, the learner can name one real risk in an AI-written change before it ships, without being prompted.

**What actually happened** —
