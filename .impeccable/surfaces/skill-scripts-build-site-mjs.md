---
version: 1
slug: "skill-scripts-build-site-mjs"
primary_target: "skill/scripts/build-site.mjs"
related_targets: []
---

Scope: the generated learning-journal site (index, entry pages, calibration page). Mode: Read.
Audience: the learner re-reading their own lessons (primary); people they choose to share it with (secondary). Job: recall what they learned, see what's still fuzzy, check whether their confidence matches reality.
Constraints: static, zero-dependency output; relative links (file:// and GitHub Pages subpaths); light/dark; print-friendly; drafts and private entries never rendered.

## Direction contract

THESIS: Each lesson is a mixtape j-card the learner inked themselves: Side A is what they thought, Side B is what's actually true, flipped by hand. Refuses the category default of a blog-style card grid of notes.

OWN-WORLD: Lined inlay stock (warm white, pale blue rules), ballpoint-blue hand-lettered caps for titles and heads, pencil-gray for the tentative "I thought", one red brand stripe as the only printed accent (confidence and "felt sure, wasn't"). A vertical spine rail carries the log's title. Running times sit right-aligned against the margin as dates and review marks. Dark: the same card under a desk lamp at night — ink-navy stock, faded-blue ink.

STORY: The reader sees a shelf of their own tapes, finds one fast (search, tag labels), opens its card, guesses Side B before flipping, reads their own sentence, and sees when it comes back for review. They believe the log is honest because misses show as plainly as hits.

FIRST VIEWPORT: Index: spine rail at left edge with the log title set vertically; big hand-lettered title and a one-line tally (lessons, reviewed, due) top-left; search as an inked line; tag labels as a row; below, lessons as a stacked list of spines (title left, date right, A/B review marks). Entry: the unfolded j-card, front flap title large, Side A visible, a "Flip to Side B" control as the primary action.

FORM: cassette j-card (vernacular ephemera), fused challenger; user-chosen over the assigned roll (library due-date card, my #3) and my pick (Leitner box, #1). Seed key f9b72a43.

SIGNATURE: the side flip — a y-axis card turn from "I thought" to "Actually" that doubles as a self-quiz (reduced motion: instant swap).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
