---
description: Show recent learning-log entries and surface one recurring pattern.
argument-hint: [optional: number, #tag, date range, or text to grep]
---

Show recent entries from the learning log and surface one recurring pattern.

## File location

Default: `~/.claude/journal/learning-log.md`. Use the configured path if different.

If the file doesn't exist or is empty: `No journal yet — run /socratic-log after your next session to start one.` Stop there.

## Argument handling

`$ARGUMENTS` can be one of:

- **A number** (`10`) → show that many most-recent entries
- **A tag** (`#convex`, `#deployment`) → filter entries containing that tag, show all matches
- **A date range** (`last week`, `this month`, `since May 1`) → filter by entry date
- **Plain text** (`env vars`, `auth`) → grep entries for that text, show matches
- **Empty** → default to the 5 most recent entries

## Output format

For each entry, show the full markdown block (preserve formatting). Newest first. After the entries, add one section:

```markdown
---
### Pattern noticed

[One sentence. Either a concept that recurs across multiple entries ("You've hit Fly.io env vars 3 times in the last month — worth a deeper dive on the build-time vs runtime model?") OR a tag cluster you didn't realize was forming ("4 entries tagged #convex-functions but none on schema design — gap?") OR an honest "no clear pattern yet, just observations."]
```

## Rules

- One pattern, not a list. The skill that makes this useful is noticing the *most relevant* pattern, not cataloging all of them.
- Don't manufacture insight. If there genuinely isn't a pattern yet, say so. Five entries on five unrelated topics is just five entries.
- Don't editorialize on the entries themselves. The user wrote those receipts for a reason; surface them clean.
- If a pattern suggests a follow-up action (revisit a concept, write a blog post on the recurring theme, build a snippet), offer it as one line after the pattern. No more than one offer.
