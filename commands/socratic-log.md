---
description: Write a learning-journal entry now for what just landed (same format as auto-capture). Optionally pass a topic hint.
argument-hint: [optional topic or title hint]
---

Write one entry to the learning journal for what the user just learned in this session.

**Journal path:** `Journal path` from `~/.claude/skills/socratic-builder/profile.md`, else `~/.claude/journal/learning-log.md`. If the file doesn't exist, create it with this header:

```markdown
# Learning log

Append-only. Newest at the bottom. Written with the socratic-builder skill.
```

**Format:** use the entry format in the skill's "Learning journal" section exactly: I thought, Actually, How I'd check next time, In my words (left blank for the user), Recall question, Confidence, Review (`due <tomorrow> · step 0 · history —`), Status (`draft`), Tags. Write it in the user's explanation style. Use `$ARGUMENTS` as a hint for the title or focus.

**Rules:**
- Append directly; don't ask for approval first. Then show the entry and say in one line: "Logged. Add your one-sentence version under 'In my words' when you like, or tell me what to change."
- If the user gives their one sentence now, fill it in and set `Status: kept`.
- Reuse existing tags (grep the journal for `#` first).
- If nothing new actually landed, say so and don't write: "Nothing journal-worthy yet this session. Skip?" An honest log beats a full one.
- If this topic is already in the journal, add a short "Follow-up (date)" line to the existing entry instead of duplicating it.
