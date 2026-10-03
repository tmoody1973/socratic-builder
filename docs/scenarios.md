# Behavior scenarios

The automated tests (`node --test tests/`) check the startup hook. They can't check whether Claude actually *teaches*: asks one question at a time, backs off when told to, writes the journal. These scenarios do. Each one is a short script for a live Claude Code session, with a pass condition and the usual way it fails.

Run them after changing `SKILL.md`, a command, or the hook. You don't need all ten every time: run the ones that touch what you changed, plus 1 (does the skill load at all).

## Setup

Use a throwaway project and a throwaway journal, so test lessons never land in your real one:

```sh
mkdir -p /tmp/sb-scenarios && cd /tmp/sb-scenarios && git init -q
export SOCRATIC_JOURNAL=/tmp/sb-scenarios/journal.md
claude
```

The hook reads `SOCRATIC_JOURNAL`, so it has to be set in the same terminal that starts `claude`. Your profile is still the real one in `skill/profile.md`; note its role, goal and question budget in the results log, because they change what "pass" looks like.

A good first request for most scenarios: *"Build a tiny command-line notes app in Node that saves notes to a JSON file."*

## Scenarios

**1. The skill loads on its own.** Start a new session and give the first request. *Pass:* before writing code, Claude reads `skill/SKILL.md` (you'll see the Read) and then teaches in the style your profile asks for. *Fails as:* code appears with no Read and no question. This is the problem decision 006 targets.

**2. Everyday loop.** Ask for a meaningful change: *"Add a 'done' flag to each note."* *Pass:* one prediction question before the change ("what happens to the notes already saved?"), a wait for your answer, then a one-line confirm or correct. With goal `understand-to-verify`, it never asks you to write code. *Fails as:* several questions at once, or the change appears before you answer.

**3. One-off bypass.** Ask for a change and add "just do it". *Pass:* it does the work with no questions. On the next *new* concept, teaching comes back. *Fails as:* a question anyway, or teaching stays off for the rest of the session.

**4. Off survives compaction.** Run `/socratic-off`, then `/compact`, then ask for a meaningful change. *Pass:* no teaching questions; `/socratic-status` says Off. *Fails as:* the first request after compaction gets a prediction question.

**5. A waiting question survives compaction.** Ask for a deep dive (*"teach me how saving to the JSON file could lose data"*). When Claude asks a question, don't answer. Run `/compact`. *Pass:* Claude asks the same question again, briefly, before moving on. *Fails as:* it moves on as if you'd answered, or starts the deep dive over.

**6. Escape valve.** Answer a teaching question wrong. Answer the hint wrong too. *Pass:* on the third turn Claude stops asking, explains directly, then asks one check question. *Fails as:* a third round of hints.

**7. Drift watch.** Twice in a row, paste a made-up error and say only "fix it". *Pass:* once, lightly, Claude asks what you think caused it. If you say "just fix it", it drops the question and doesn't raise it again. *Fails as:* a lecture, or the same nudge every time.

**8. Trivial work and plain questions.** Ask for a typo fix in a comment, then ask "what's the difference between `let` and `const`?" *Pass:* the typo gets fixed with no question; the factual question gets a straight answer. *Fails as:* a prediction question about a typo.

**9. Journal capture.** Finish scenario 2 and give a correct explain-back. *Pass:* a new entry appears in `$SOCRATIC_JOURNAL` in the skill's format, with "In my words" left blank, and Claude tells you in one line ("Logged a draft: …"). No more than 2 drafts per session. *Fails as:* no entry, an entry with "In my words" filled in for you, or an entry for nothing new. (Through Oct 3, 2026, this never happened in real use; see decision 006.)

**10. Spaced review.** Put this in `$SOCRATIC_JOURNAL`, then start a new session:

```markdown
## 2026-01-01 — New columns start empty

- **I thought:** old rows get the new value automatically
- **Actually:** existing rows get an empty value unless you set a default
- **How I'd check next time:** count rows where the new column is empty
- **In my words:** _(fill in — one sentence)_
- **Recall question:** What value do existing rows get when you add a column with no default?
- **Confidence:** unrated
- **Review:** due 2026-01-02 · step 0 · history —
- **Status:** draft
- **Tags:** #database
```

*Pass:* before any new work, Claude asks that one recall question and asks for a 1–5 confidence rating. Answer correctly with confidence 4: the Review line becomes `due <today + 7 days> · step 1 · history ✓4`. Claude also mentions, once, that the draft needs your own sentence. *Fails as:* no question, more than one question, or the Review line unchanged.

## Results log

Record each run: the date, Claude Code version, which scenarios ran, and the result. Say what wasn't run. A pass means "it did this once," not "it always does this."

- **2026-10-03:** profile AI director · understand-to-verify · plain · light. Scenario 4 partly verified in real sessions. After `/socratic-off` and `/compact`, the hook restored `Mode: off` in the same session (log line 128) and `/socratic-status` reported Off. A build request after compaction was not tried. Scenarios 1–3 and 5–10 not run.
