---
name: Socratic Builder Learning Log
description: A mixtape j-card for every lesson; Side A is what you thought, Side B is what's actually true.
colors:
  stock: "#fcfbf7"
  stock-deep: "#f3f1ea"
  rule: "#dfe6f4"
  ink: "#1e3a8a"
  ink-strong: "#152c6b"
  ink-soft: "#4b63a6"
  pencil: "#5c6270"
  stripe: "#c62828"
  on-ink: "#fcfbf7"
  stock-dark: "#10162a"
  stock-deep-dark: "#0b1020"
  rule-dark: "#1d2744"
  ink-dark: "#a9bdf2"
  ink-strong-dark: "#d3def9"
  ink-soft-dark: "#7f96d4"
  pencil-dark: "#9aa3b8"
  stripe-dark: "#f07167"
typography:
  display:
    fontFamily: "Inked, Bradley Hand, Segoe Print, cursive"
    fontSize: "clamp(3rem, 8.5vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Inked, Bradley Hand, Segoe Print, cursive"
    fontSize: "clamp(2.4rem, 6vw, 4.6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "0.01em"
  quote:
    fontFamily: "Inked, Bradley Hand, Segoe Print, cursive"
    fontSize: "clamp(1.7rem, 3.6vw, 2.35rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "Inked, Bradley Hand, Segoe Print, cursive"
    fontSize: "1.7rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.04em"
  track:
    fontFamily: "Inked, Bradley Hand, Segoe Print, cursive"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.03em"
  label:
    fontFamily: "Inked, Bradley Hand, Segoe Print, cursive"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.05em"
  body:
    fontFamily: "Reader, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: "1.75rem"
    letterSpacing: "normal"
  body-large:
    fontFamily: "Reader, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  hairline: "3px"
  sm: "4px"
  button: "5px"
  md: "6px"
  lg: "8px"
spacing:
  line: "1.75rem"
  rail: "3.75rem"
  rail-compact: "2.6rem"
  card-inset: "1.8rem"
  card-inset-compact: "1.1rem"
  section: "2.6rem"
  page-gutter: "clamp(1.25rem, 5vw, 4.5rem)"
components:
  button-flip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.2rem 0.65rem"
  button-flip-hover:
    backgroundColor: "{colors.ink-strong}"
    textColor: "{colors.on-ink}"
  tag-label:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.42rem 0.7rem 0.34rem"
  tag-label-hover:
    backgroundColor: "{colors.stock-deep}"
    textColor: "{colors.ink}"
  tag-label-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  search-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "0"
    padding: "0 0 0 2rem"
    height: "2.4rem"
  jcard:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  face-a:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.pencil}"
    rounded: "{rounded.md}"
    padding: "1.1rem 1.3rem 1.2rem"
  face-b:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.1rem 1.3rem 1.2rem"
  track:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.track}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 0.4rem 0.6rem"
  track-hover:
    backgroundColor: "{colors.stock-deep}"
    textColor: "{colors.ink}"
---

# Design System: Socratic Builder Learning Log

## Overview

**Creative North Star: "The Inked J-Card"**

Every lesson is a cassette inlay card the learner lettered themselves. The page is lined inlay stock: warm white paper with pale-blue rules every 1.75rem, drawn by a repeating gradient on the body. Titles, heads, dates and labels are hand-lettered capitals in ballpoint blue; sentences are set in a plain, highly legible sans so the learner's own words read easily. One red printed stripe is the only colour that is not ink, and it only ever means the tape's brand or how sure the learner felt.

The structure borrows from the tape itself. A fixed spine rail down the left edge carries the log's title set vertically, with the red stripe at its head and an A/B box at its foot. The index is a shelf of sides: each month is a side with a lettered stamp, and each lesson is a numbered track with a dotted leader running out to its date and review marks. An entry page is the unfolded j-card: a bordered card with its own spine, a front flap carrying the title and red confidence slashes, then Side A ("I thought") in pencil with a Flip control that turns the card on its y-axis to Side B ("Actually") in ink.

Night mode is the same card under a desk lamp: ink-navy stock, faded-blue ink, a softer coral stripe. Nothing else changes. Print drops the spine, the finder and the flip, and lays both sides out flat.

**Key Characteristics:**
- Ruled stock: body line-height equals the rule pitch (1.75rem), so running text sits on the lines.
- Two pens: a hand-lettered uppercase display voice (Patrick Hand) and a legible reading voice (Atkinson Hyperlegible).
- Ink blue for what's settled, pencil gray for what was only thought, red for confidence.
- Strokes, not shadows: depth comes from ink borders, rules, dotted leaders and dashed boxes.
- The side flip: a 650ms y-axis card turn that doubles as a self-quiz and unseals "In my words".

## Colors

A two-ink palette on paper: ballpoint blues and pencil gray on warm white, with one printed red.

### Primary
- **Ballpoint Blue** (ink): the default text colour, every structural stroke (spine border, card border, side underlines, search line), the filled Flip button and the pressed tag label.
- **Pressed Ink** (ink-strong): emphasis inside ink: tally numbers, the "In my words" quote, the next-review date, hover on the Flip button, and the focus ring.
- **Faded Ink** (ink-soft): secondary annotations: track numbers, dotted leaders, lesson counts, flap meta, the search icon, the second label on the card spine.

### Secondary
- **Printed Red** (stripe): the brand stripe (two bars on the spine rail, two bars under the front flap, three skewed slashes on the flap) and confidence. It colours "Felt N/5 sure", the confidence column and target line on the calibration ledger, sure-but-wrong review marks, and the "Felt sure, wasn't" heading.

### Neutral
- **Inlay Stock** (stock): page, spine rail, card and face background.
- **Deep Stock** (stock-deep): hover wash on tracks and tag labels, inline code background, scrollbar track.
- **Blue Rule** (rule): the ruled lines on the page, track dividers, ledger and review-log row dividers, code borders.
- **Pencil** (pencil): Side A, recall instructions, lesson questions under each track, missed review marks, empty states, placeholder text and the footer.
- **On Ink** (on-ink): text on filled ink (Flip button, pressed label, text selection). In light mode it matches the stock; in dark mode it is the night stock.

### Night stock (prefers-color-scheme: dark)
Each light token has a night counterpart under the `-dark` key: stock-dark, stock-deep-dark, rule-dark, ink-dark, ink-strong-dark, ink-soft-dark, pencil-dark, stripe-dark. On-ink becomes the night stock and the focus ring becomes ink-strong-dark. Print forces white stock, #444 pencil, #b71c1c stripe and #e3e8f3 rules.

### Named Rules
**The One Red Rule.** Red is the only non-ink colour. It marks the tape's brand stripe and the learner's confidence, and nothing else: never a link, never a hover, never decoration.

**The Pencil-Before-Ink Rule.** What the learner only thought is written in pencil gray (and italic in running text); what is actually true is written in ink. Side A and Side B must never share a colour.

## Typography

**Display Font:** Patrick Hand, self-hosted as "Inked" (with Bradley Hand, Segoe Print, cursive)
**Body Font:** Atkinson Hyperlegible, self-hosted as "Reader" in 400, 400 italic and 700 (with system-ui, -apple-system, Segoe UI, sans-serif)
**Label/Mono Font:** ui-monospace, SF Mono, Menlo for inline code only (0.88em)

**Character:** A felt-tip hand that looks lettered onto the inlay, paired with a reading face built for legibility. The hand carries structure and labels; the sans carries sentences.

### Hierarchy
- **Display** (400, clamp(3rem, 8.5vw, 6rem), 0.95): the log title on the index and the "Confidence check" page title. Uppercase, balanced wrap, with a 5px ink bar beneath.
- **Headline** (400, clamp(2.4rem, 6vw, 4.6rem), 0.98): the lesson title on the j-card's front flap.
- **Quote** (400, clamp(1.7rem, 3.6vw, 2.35rem), 1.25): the learner's "In my words" sentence, in the hand, pressed ink, max 42ch, with a 3px ink underline. The only place the hand is used in mixed case.
- **Title** (400, 1.7rem, 1.2, 0.04em): side heads on the shelf (1.4rem on narrow screens); face heads use 1.45rem.
- **Track** (400, 1.5rem, 1.2, 0.03em): lesson titles in the tracklist.
- **Label** (400, 1.05 to 1.35rem, 0.04 to 0.06em, uppercase): dates, tally, nav links, section heads (1.35rem on the 1.75rem line, underlined 1.5px), tag labels (1.05rem), flip button (1.3rem), spine title (1.6rem, 1.2rem compact), footer (1rem).
- **Body** (400, 1.0625rem, 1.75rem line): all running text, on the rules.
- **Body Large** (400, 1.2rem, 1.6): Side A and Side B sentences and the recall question, max 62ch. Side A is italic. Lesson questions under each track use 0.98rem italic pencil at 1.4.

### Named Rules
**The Two Pens Rule.** The hand is always weight 400 and almost always uppercase; it is never bolded. Emphasis inside the hand is a colour shift to pressed ink (as in the tally numbers), not a heavier weight. Sentences are always in the reading face.

**The Tabular Running Time Rule.** Track numbers, dates and review counts use tabular numerals so the right-hand margin lines up like running times on a j-card.

## Layout

A fixed left spine rail (3.75rem; 2.6rem under 40rem) and a single content column beside it. The page column is offset by the rail, padded 2.5rem top, clamp(1.25rem, 5vw, 4.5rem) sides and 5rem bottom, capped at 78rem. The j-card caps at 62rem, the calibration ledger at 52rem with its table at 36rem, the search line and the masthead bar at 34rem. Reading measure is 62ch for sentences and 42ch for the quote.

Vertical rhythm is the 1.75rem rule. Major blocks are separated by 2.6rem (finder, each side). Inside the j-card, sections share a 1.8rem side inset (1.1rem on narrow screens). On the shelf each track is a four-column grid: number (2.2rem), title, dotted leader that fills the remaining space, and the running time (date plus review marks) right-aligned; the question runs underneath from the title column. Front-flap meta and entry notes wrap with auto-fit columns (min 17rem).

One breakpoint, max-width 40rem: the rail narrows and loses its A/B box, the leader disappears and the date drops under the title, the j-card loses its inner spine and stacks, the brand slashes move above the title in a row, and side counts wrap to their own line.

### Named Rules
**The Ruled Stock Rule.** The page background is ruled at the body line-height (1.75rem). Change one and you must change the other.

**The Shelf, Not Grid Rule.** Lessons are a stacked tracklist grouped into sides, never a grid of cards.

## Elevation & Depth

The system is flat. Depth is drawn in ink: a 2px ink border for structural edges (spine rail, j-card, card spine, side underline, search line, ledger head), 1.5px for secondary boxes (faces, tag labels, recall box, section-head underlines), 1px blue rules between rows, a 2px dotted leader, and a 1.5px dashed border for the recall question. The one lift in the system is the Flip button, which carries a soft ink shadow and rises 1px on hover, because it is the primary action on the card. The flip itself uses real 3D: 1400px perspective with a y-axis turn.

### Shadow Vocabulary
- **Flip lift** (`box-shadow: 0 3px 10px -4px var(--lift)`; `--lift` is `rgba(21, 44, 107, 0.55)` on paper, `rgba(0, 0, 0, 0.6)` at night): the Flip button only.
- **Inked line focus** (`box-shadow: 0 2px 0 var(--ink-strong)`): thickens the search underline on focus. A stroke, not a shadow.

### Named Rules
**The Flat Inlay Rule.** Surfaces are paper and never float. Only the primary action on a card is lifted.

## Shapes

Softly squared print shapes. Radii are small and stepped by container size: 3px for the tally bar and focus ring, 4px for tag labels, tracks, stamps, the spine A/B box and code, 5px for the Flip button, 6px for faces and the recall box, 8px for the j-card. The search field is a bare line with no box at all. Stripes are flat bars: 5px tall with 4px gaps on the spine, 4px with 3px gaps under the front flap, and three 6px slashes skewed -20deg on the flap. The masthead bar is 5px ink with a 3px radius; the quote underline is 3px ink.

### Named Rules
**The Stroke Ladder Rule.** 2px ink is structure, 1.5px ink is a box inside it, 1px rule is a divider, dotted is a leader, dashed is a question. Don't mix those meanings.

## Components

### Buttons
Tactile and inked: the Flip is the one filled control in the whole site.
- **Shape:** gently squared (5px).
- **Primary (Flip to Side B):** ink fill, on-ink text, hand label at 1.3rem uppercase 0.06em, 0.75rem 1.2rem 0.65rem padding, a 1.3rem flip icon before the label. Its label changes to "Flip back to Side A" and it reports aria-pressed.
- **Hover / Focus:** hover shifts to pressed ink and rises 1px (160ms ease-out). Focus uses the global 2px pressed-ink outline, 3px offset.

### Chips (tag labels)
- **Style:** transparent, 1.5px ink border, 4px radius, hand label 1.05rem uppercase, "#" prefix.
- **State:** hover gets a deep-stock wash; pressed (aria-pressed="true") fills with ink and on-ink text. One tag active at a time; pressing it again clears it.

### Cards / Containers (the j-card)
- **Corner Style:** 8px outer card; 6px inner faces and recall box.
- **Background:** stock.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 2px ink outer, with a 3.2rem inner spine separated by a 2px ink rule carrying the title and date vertically.
- **Internal Padding:** 1.8rem sides; the flap is 1.6rem 1.8rem 1.3rem.

### Inputs / Fields (search)
- **Style:** an inked line. No box, 2px ink bottom border, transparent background, hand text at 1.4rem on a 2.4rem line, search icon inset left in faded ink, placeholder in uppercase pencil ("Search your tapes").
- **Focus:** the underline darkens to pressed ink and doubles via a 2px stroke below; the caret is pressed ink.

### Navigation
- **Spine rail:** fixed, full height, stock with a 2px ink right edge. Red double stripe at the top, the log title set vertically in the hand (1.6rem, 0.06em), an A/B box at the foot. The title links home.
- **Text links:** inherit colour, 1.5px underline at 0.22em offset (2px for nav links and "All tapes").

### Track (signature)
A numbered tracklist line: faded-ink number, uppercase hand title, dotted leader, right-aligned running time with tabular date and review marks. Marks are small inline SVG ticks (ink for recalled, pencil cross for missed, red cross for missed at 4/5 or higher confidence). Hover adds a deep-stock wash and a 2px underline on the title.

### Side head (signature)
A month is a side: a 2.2rem square stamp with a 2px ink border holding the side letter, the month in the Title style, and the lesson count pushed right in faded ink, all over a 2px ink underline.

### Side faces and the flip (signature)
Side A and Side B share one grid cell; the card turns 180deg on the y-axis over 650ms cubic-bezier(0.16, 1, 0.3, 1) with hidden backfaces. Face heads split "Side A / I thought" and "Side B / Actually" across a 1.5px underline in the face's own colour. Until the first flip, "In my words" and "How I'd check next time" are sealed behind a pencil note; the first flip reveals them with a 420ms rise-and-unblur. Reduced motion turns both into an instant swap.

### Confidence ledger (signature)
A table of confidence levels 1/5 to 5/5 in red hand numerals, a count, and a tally bar: 0.85rem tall, 1.5px ink outline, ink fill to the percentage right, and a 3px red upright at the expected rate (level × 20%).

## Do's and Don'ts

### Do:
- **Do** keep running text on the rules: body at 1.0625rem on a 1.75rem line, the same pitch as the ruled background.
- **Do** letter every title, head, label and date in the hand, uppercase, weight 400; use pressed ink for emphasis.
- **Do** put what the learner thought in pencil and what's true in ink, on separate faces of the same card.
- **Do** reserve red for the brand stripe and for confidence, including "felt sure, wasn't" misses, so misses show as plainly as hits.
- **Do** draw depth with the stroke ladder (2px, 1.5px, 1px, dotted, dashed) rather than shadows.
- **Do** give every motion a reduced-motion path that is an instant swap.

### Don't:
- **Don't** lay lessons out as a blog-style grid of cards; they are tracks on a side.
- **Don't** introduce a second accent hue, or use red for links, hovers or decoration.
- **Don't** bold or set the hand in lowercase for labels; the quote is its one mixed-case use.
- **Don't** add shadows to cards, faces or labels; only the Flip button lifts.
- **Don't** change the body line-height without changing the rule pitch, or the text slips off the lines.
