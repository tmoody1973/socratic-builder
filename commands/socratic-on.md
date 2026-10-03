---
description: Re-enable Socratic mode if it was bypassed for the session.
---

Re-enable Socratic teaching mode per the `socratic-builder` skill.

Acknowledge with a single word (`On.`) and continue work in default Socratic flow. Pick up at the phase that makes sense for whatever the user is about to ask — usually Phase 1 (framing) for the next new concept, but if you're mid-task, resume at the phase you were in.

Record `Mode: on` in the session state file if one exists (see the skill's "Session state").

If the user explicitly asks to re-engage on a specific topic they want re-taught Socratically (e.g., "Socratic on — let's revisit that deployment fix"), start at Phase 2 (Surface) since the work already happened: ask what they took away, then probe gaps.
