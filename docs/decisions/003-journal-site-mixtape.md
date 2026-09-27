# 003 — The journal becomes a "mixtape j-card" website, private by default

**Decision** — `/socratic-site` turns the journal into a static website styled like hand-lettered cassette j-cards. Each lesson's "I thought" is Side A and "Actually" is Side B; you flip the card to check your guess. Publishing to GitHub Pages is a separate step that always asks first.

**Why this came up** — Learning logs survive when something downstream reads them. A browsable site gives the journal a reader: the learner, and optionally a portfolio audience.

**Options**
- A plain markdown file only: zero work, but hard to browse and nothing to share.
- A standard clean "notes" site: safe and familiar, and forgettable.
- A site with a strong point of view, designed with the impeccable design skill.

**What we chose and why** — The design skill's roll proposed a library due-date card. Tarik picked the mixtape j-card instead, because it turns "before vs after" into Side A and Side B, and the flip becomes a self-quiz. An independent design review then caught that the first version showed the answer before the flip; that was fixed before shipping.

**What we gave up** — A playful, nostalgic look may read as less serious for very technical entries. Hand-lettered caps are less readable for long text, so they're kept to titles and labels.

**How we'll know if this was right** — The learner opens the site to review without being prompted, and uses the flip to quiz themselves.

**What actually happened** —
