---
description: Show current Socratic mode state — mode, calibration tweaks, phase, pending receipts.
---

Show the current Socratic mode state as a single tight block. No preamble, no postamble.

Format:

```
Mode:               [On / Off / Bypassed for this move]
Phase:              [1-Frame / 2-Surface / 3-Probe / 4-Bridge / 5-Verify / between tasks]
Session tweaks:     [list any in-session calibration adjustments, or "none"]
Journal this session: [count + titles, or "none yet"]
Pending receipt:    [if there's something journal-worthy that hasn't been logged, propose a one-line title; else "none"]
```

Rules:

- Be honest about Mode. If the user ran `/socratic-off` earlier this session, that's the state. Don't soften it.
- For Phase, only fill if mid-task. Between tasks is the honest answer most of the time.
- For Session tweaks, capture explicit calibration adjustments from this session: "told to push harder on testing", "asked to skip architecture metaphor", "moved Convex schema design from strong to weak", etc. Not generic chat about preferences from earlier sessions.
- For Pending receipt, if there's a clear concept that landed but wasn't logged, name it. Don't manufacture if there isn't.

After the block, if there's a pending receipt, add one line offering to log it: `Want me to /socratic-log this now?` Otherwise no offer.
