# Learning log (SAMPLE)

Sample entries for previewing the journal site. Not anyone's real record. Build with:
`node skill/scripts/build-site.mjs --journal examples/sample-journal.md --out examples/site --title "Sample learning log"`

## 2026-08-04 — New columns start empty

- **I thought:** Adding a field to the orders table would fill it in for old orders too.
- **Actually:** Old rows get an empty value unless you set a default or backfill them.
- **How I'd check next time:** Count rows where the new field is empty right after the change.
- **In my words:** A new column is a blank line on every old form until someone fills it in.
- **Recall question:** What happens to existing rows when you add a column with no default?
- **Confidence:** 4/5
- **Review:** due 2026-09-03 · step 2 · history ✓3 ✓4
- **Status:** kept
- **Tags:** #data #migrations

## 2026-08-11 — Build-time vs runtime settings

- **I thought:** Every setting is read when the app is running.
- **Actually:** Some settings get baked in when the app is built, so changing them later does nothing until you rebuild.
- **How I'd check next time:** Ask "build or runtime?" and check whether the name starts with `NEXT_PUBLIC_`.
- **In my words:** Some settings are printed on the box; you can't change them after it ships.
- **Recall question:** Why didn't changing the secret on the host fix the live app?
- **Confidence:** 5/5
- **Review:** due 2026-08-19 · step 0 · history ✗5
- **Status:** kept
- **Tags:** #deployment #config

## 2026-08-20 — Reading a diff from the bottom up

- **I thought:** A diff shows everything the change touches.
- **Actually:** It only shows the lines that changed; code that *calls* those lines can break without appearing at all.
- **How I'd check next time:** For each changed function, search for who calls it.
- **In my words:** A diff is the renovation plan, not the whole building. Check what leans on the wall you moved.
- **Recall question:** What can break that a diff will never show you?
- **Confidence:** 3/5
- **Review:** due 2026-10-01 · step 2 · history ✓2 ✓3
- **Status:** kept
- **Tags:** #reviewing #diffs

## 2026-09-02 — An index is a lookup table

- **I thought:** The database reads every row no matter what.
- **Actually:** An index lets it jump straight to matching rows, like the index at the back of a book.
- **How I'd check next time:** Ask which column the slow query filters on, and whether it's indexed.
- **In my words:** Without an index the database reads the whole book to find one word.
- **Recall question:** When does adding an index speed up a query?
- **Confidence:** 4/5
- **Review:** due 2026-09-30 · step 1 · history ✓4
- **Status:** kept
- **Tags:** #data #performance

## 2026-09-09 — Retries need idempotency

- **I thought:** If a payment call times out, just call it again.
- **Actually:** The first call may have succeeded; retrying without an idempotency key can charge twice.
- **How I'd check next time:** Look for an idempotency key on every retried write.
- **In my words:** Asking twice is only safe if the second ask can't do the thing twice.
- **Recall question:** What goes wrong when you retry a payment that timed out?
- **Confidence:** 5/5
- **Review:** due 2026-09-10 · step 0 · history ✓5 ✗4
- **Status:** kept
- **Tags:** #payments #api

## 2026-09-15 — Tests prove behaviour, not lines

- **I thought:** More test coverage means fewer bugs.
- **Actually:** Coverage only says a line ran; a test that asserts nothing still counts.
- **How I'd check next time:** Break the code on purpose and see whether a test goes red.
- **In my words:** A smoke detector that never beeps isn't protecting anything.
- **Recall question:** How do you know a test would actually catch a bug?
- **Confidence:** 3/5
- **Review:** due 2026-10-15 · step 3 · history ✓3 ✓3 ✓4 ✓4
- **Status:** retired
- **Tags:** #testing

## 2026-09-21 — Drafts stay off the shelf

- **I thought:** Everything goes public.
- **Actually:** Drafts wait for the learner's own sentence.
- **How I'd check next time:** Look for this entry on the site. It should not be there.
- **In my words:** _(fill in — one sentence)_
- **Recall question:** Why do drafts stay private?
- **Confidence:** unrated
- **Review:** due 2026-09-22 · step 0 · history —
- **Status:** draft
- **Tags:** #meta

## 2026-09-22 — A private one

- **I thought:** Everything I log is shareable.
- **Actually:** Some lessons are about a client; mark them private.
- **How I'd check next time:** This should never appear on the site.
- **In my words:** Private means private.
- **Recall question:** How do you keep an entry off the site?
- **Confidence:** 5/5
- **Review:** due 2026-09-23 · step 0 · history —
- **Status:** private
- **Tags:** #meta
