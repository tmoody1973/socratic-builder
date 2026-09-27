# 002 — The journal writes its own drafts

**Decision** — When a concept lands, Claude writes a draft journal entry immediately, without asking. The learner adds only their one-sentence "In my words" line. A startup script brings one entry back for review when it's due.

**Why this came up** — In v1, every entry needed the learner to ask for it and then approve it. In four and a half months, the journal got zero entries.

**Options**
- Keep asking permission: respects control, but the record shows it produces nothing.
- An end-of-session background agent that reads the whole transcript and drafts entries: most complete, but costs tokens every session and adds moving parts.
- Draft during the session, in the moment: free, simple, and the learner can delete a draft in one step.

**What we chose and why** — In-session drafts, chosen by Tarik over the end-of-session agent. Research on habits is clear that automatic triggers beat willpower, and people who keep up learning logs use a near-zero bar for each entry. The "In my words" line stays blank on purpose, because writing it is where the learning happens.

**What we gave up** — Claude decides what counts as a lesson, so some drafts will miss what the learner found important. Drafts can also pile up if the learner never adds their sentence.

**How we'll know if this was right** — The journal has real entries a month from now, and at least half the drafts have the learner's own sentence.

**What actually happened** —
