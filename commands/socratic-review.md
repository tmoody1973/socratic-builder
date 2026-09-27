---
description: Review your learning journal. Due recall questions, recent entries, one recurring pattern, and how well your confidence matches your answers.
argument-hint: [optional: number, #tag, or text to search]
---

Read the learning journal (`Journal path` in `~/.claude/skills/socratic-builder/profile.md`, else `~/.claude/journal/learning-log.md`). If it's missing or empty: "No journal yet. Entries get logged automatically as you learn things." Stop there.

Show, in the learner's explanation style, in this order:

1. **Due now** (up to 3, most overdue first): ask the first one's recall question and wait. After the answer, give one line of feedback and update its `Review` line per the skill's spaced-review rules. Offer the next due one; stop if they say so.
2. **Recent entries:** by default the 5 newest; with `$ARGUMENTS`, a number (that many), a `#tag` (matching entries) or text (entries containing it). Show each as title + "Actually" + "In my words".
3. **Drafts waiting:** list titles still missing "In my words", if any, with one line: "Add your sentence to any of these?"
4. **One pattern:** a concept that recurs, a tag cluster forming, or "no clear pattern yet". One sentence; don't manufacture insight.
5. **Confidence vs correct:** from the `✓N`/`✗N` history marks, report how often answers given at high confidence (4–5) were right, and flag any ✗4 or ✗5 as "felt sure, wasn't". One or two lines. If there's too little history, say "Not enough reviews yet to judge."

Offer at most one follow-up action (for example: revisit a concept, or run /socratic-site).
