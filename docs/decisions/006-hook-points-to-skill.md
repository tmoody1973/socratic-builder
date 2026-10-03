# 006 — The startup hook tells Claude to read the skill

**Decision** — Every session, the startup hook adds one line telling Claude to read `SKILL.md` before the first non-trivial build, debug or design step. Claude no longer has to decide on its own to load the skill. After a compaction the line comes back, unless the session's state says Socratic is off.

**Why this came up** — The learning journal was empty after five months of use. A search of every saved session log (Sept 1 – Oct 3, 2026, 4,246 sessions; older logs had been auto-deleted) showed why. The CLAUDE.md rule appeared in 532 sessions, but Claude loaded the skill in only 1 of 38 real working sessions. The journal's path and format live only in the skill, so without it Claude never tried to write a single entry. Loading a skill is Claude's own choice, made by matching a request against about a thousand skill descriptions, while other always-on instructions push toward being terse and acting fast.

**Options**
- Hook points to the skill: one line per session, the same approach as VibeWise. Costs about 30 tokens per session, and Claude still has to follow it.
- Also copy the journal path and format into the CLAUDE.md rule, so capture works even if the skill isn't read. The format would then live in two places that can drift apart.
- Make the journal manual (`/socratic-log` only). Honest and free, but reverses decision 002 and depends on remembering.

**What we chose and why** — The hook pointer alone. Claude found the cause and recommended it; Tarik chose it. It's the smallest change that removes the "Claude has to pick the skill" step, and it reuses the hook we already run.

**What we gave up** — Every session carries the line, even sessions with no building in them. It doesn't settle the real conflict between "ask first" (this skill) and "be terse, act fast" (other global instructions); Claude can still read the skill and then let the other instructions win.

**How we'll know if this was right** — Search the session logs again after two weeks of normal use. The skill should be read in most working sessions, and the journal should hold at least one draft entry.

**What actually happened** —
