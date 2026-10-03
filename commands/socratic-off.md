---
description: Disable Socratic mode for the rest of this session — just do the work directly.
---

Disable Socratic mode for the rest of this session. Skip the framing questions, probing, hint ladder, and verification — execute requests directly per the user's stated intent.

Acknowledge with a single word (`Off.`) and proceed with whatever the next request is. No explanation, no offered alternatives, no "are you sure". The user knows what they're doing.

Socratic mode re-engages when:
- They run `/socratic-on`
- They start a new Claude Code session
- They say "Socratic on" or "back to Socratic" in plain text

Record `Mode: off` in the session state file if the hook named one (see the skill's "Session state"), so it survives compaction.

Do not log this state change in the learning journal — a bypass is not a lesson.
