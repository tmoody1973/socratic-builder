---
description: Write a learning-log entry for what just landed in this session. Optionally pass a topic hint.
argument-hint: [optional topic or title hint]
---

Write a journal entry to the learning log for what the user just learned or what just clicked in this session.

## File location

Default: `~/.claude/journal/learning-log.md`. If the user configured a different path during install, use that. If the file doesn't exist, create it with this header and then append the entry:

```markdown
# Socratic Learning Log

Append-only log of concepts that landed during Claude Code sessions. Read order: newest at the bottom. Each entry is a one-paragraph receipt — what was learned, what's still fuzzy, the reusable pattern.

---
```

Always append. Never overwrite. Never edit past entries.

## Entry format

Use exactly this structure, in this order:

```markdown
## YYYY-MM-DD — [short specific title of the concept, not the project]

- **Learned:** [one sentence — the thing the user now understands that they didn't before. Be specific. "Build-time vs runtime env vars in Next.js on Fly" not "deployment stuff".]
- **Still fuzzy:** [one sentence — the part they want to revisit later, or "nothing major" if it really did all land]
- **Pattern to reuse:** [one sentence — the generalizable principle. The thing they'd tell a teammate. Or "n/a one-off" if it doesn't generalize.]
- **Tags:** [space-separated #tags]
```

## Tag selection

Before writing the entry, grep the journal file for existing `#` patterns and reuse them when applicable — consistency matters more than precision. New tags are fine when warranted.

Likely tech tags: `#nextjs` `#typescript` `#mcp` `#deployment` `#llm` `#claude-code` `#testing` `#architecture` `#data-pipeline` `#auth` `#api-design`. Project tags come from `profile.md` in the skill folder, if present. Add new tags as concepts demand.

## Process

1. **Propose the entry inline first.** Show the full markdown block. Do not write the file yet.
2. **Wait for approval, tweak, or rejection.** If the user says "tweak X", revise and re-propose. If they say "no", drop it.
3. **On approval**, append to the journal file and confirm with one line: `Logged to <path>: <title>`.
4. **If the argument `$ARGUMENTS` is provided**, use it as a hint for the title or focus area — but still propose before writing.

## When to push back

If no significant new concept actually landed in this session, say so: `Nothing journal-worthy from this session — log it anyway, or skip?` Do not manufacture a lesson to fill the form. A skipped entry is honest; a fake entry pollutes the log.

If the user asks to log something they already logged earlier (check by grepping the file), point that out and offer to add a follow-up note to the existing entry instead of duplicating.
