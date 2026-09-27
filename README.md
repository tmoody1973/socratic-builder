# socratic-builder

A [Claude Code](https://claude.com/claude-code) skill that helps you understand what you build with AI, not just ship it.

When AI writes the code, you can ship faster than you understand what you shipped. That's fine until something breaks and you can't tell why, or until you have to decide whether the AI's change is safe. This skill adds a short learning loop to the building you're already doing. It keeps a journal of what you learned, brings old lessons back at the right moment so they stick, and can turn that journal into a small website.

It works for everyone from people who never read code ("vibe coders") to senior engineers. Your profile decides how it talks to you and how hard it pushes.

## Why it works this way

Three findings shaped the design ([evidence in the skill](skill/SKILL.md#evidence)):

1. **How you use AI decides whether you learn.** In Anthropic's 2026 study, people who let AI write code and then asked *why it works* kept most of their learning. People who handed everything over didn't.
2. **Guessing first, then checking, makes things stick.** Even wrong guesses help, as long as you see the answer right after. Explaining something back in your own words helps too.
3. **Lessons fade unless you revisit them.** Recalling a lesson a day later, then a week, a month and three months later (spaced review) is one of the best-supported results in learning science.

## How it works

### The everyday loop (about 30 seconds per change)

1. **Predict.** Before Claude shows a change, it asks for one guess: "What do you think this does to existing users?"
2. **See.** It shows the change and says in one line whether your guess was right.
3. **Explain back.** Once per new idea: "In one sentence, why does this work?"

What it asks about depends on your **goal**:

| Goal | Who it's for | What Claude asks about |
|---|---|---|
| Understand to check | People who direct AI | What the change does, what could go wrong, how you'd check it. It never asks you to write code. |
| Write it myself | People learning to code | Your approach first. Claude reviews what you write, and gives hints before code. |
| Go deeper | Experienced engineers | Trade-offs, failure at scale, the option you didn't pick |

For big or confusing problems there's a longer **deep dive** in five steps: frame the problem, surface what you think, test where your idea breaks, bridge the gap, and check it stuck. When you're stuck, Claude gives the smallest hint that unblocks you, then bigger ones only if needed.

### It talks your language

Claude writes in **plain English by default**: everyday words, with any technical term defined the first time it appears. Say "more technical" and it switches to precise terms. Say "simpler" and it switches back. You can also set this per topic in your profile, so you get plain English for databases and technical language for the frontend.

### Safety valves

- **Bypass.** Say "just do it", "ship it", "no socratic", "skip the questions" or "I'm in a hurry" and Claude does the work directly. Typos, renames and boilerplate skip the loop automatically.
- **Escape valve.** After about two rounds on the same point, Claude stops asking, explains directly, then asks one check question.
- **Drift watch.** Claude watches for three habits that predicted poor learning in the study: handing over everything, slowly handing over more and more, and pasting every error back with "fix it". When it sees one, it asks one light question ("what do you think caused this?"). Bypass it and it drops it.

## Your profile

Your profile (`skill/profile.md`) is a short file of settings ("dials"):

- **Role and goal.** Vibe coder, AI director, developer or senior engineer.
- **Explanation style.** Plain, "teach me the words", or technical.
- **Question budget.** Light, standard, or push me.
- **Topic levels.**
  - new: show me an example first
  - familiar: ask me questions
  - fluent: stay out of my way
- **Up to three learning goals.** Each has a finish line ("I'll know I've got it when I can…").
- **Blind spots.** Things you feel fine about but have never been tested on.
- **Metaphors.** Comparisons from your own field.

**The easy way:** run `/socratic-profile`. Claude interviews you, one plain question at a time, in about 5 minutes. It shows you the draft and saves only when you say so.

**The manual way:** copy `skill/profile.example.md` to `skill/profile.md` and fill it in. [`docs/profile-guide.md`](docs/profile-guide.md) explains each setting and shows three complete example profiles (a vibe coder, an AI director and a senior engineer).

Your profile is **git-ignored**, so it never leaves your machine.

## The learning journal

### It writes itself

When an idea lands, Claude adds a **draft** entry to `~/.claude/journal/learning-log.md` without asking. It tells you in one line and never adds more than two drafts a session. You add one thing: a sentence in your own words. Writing that sentence is where most of the learning happens, so Claude leaves it blank for you.

```markdown
## 2026-05-12 — Build-time vs runtime settings
- **I thought:** Setting a secret on the server makes it available everywhere.
- **Actually:** Values baked in when the site is built can't see secrets added later.
- **How I'd check next time:** Ask "is this read at build time or when a request comes in?"
- **In my words:** _(fill in — one sentence)_
- **Recall question:** Why can't the build see a secret you set after deploying?
- **Confidence:** 4/5
- **Review:** due 2026-05-13 · step 0 · history —
- **Status:** draft
- **Tags:** #deployment #hakivo
```

The journal lives outside the skill folder, so it survives if you change or remove the skill.

### It brings lessons back (spaced review)

A small script runs when a Claude Code session starts. If a lesson is due, Claude asks you its recall question once, before anything else. How you do sets the next review:

- **Right:** it comes back later: 1 day, then 7, then 30, then 90. After that it's retired.
- **Wrong:** it goes back to 1 day.

Nothing is due? The script stays silent. It also reminds you when drafts are missing their "In my words" line.

### It tracks how sure you were

Each entry records how confident you felt (1–5), and reviews record whether you were right. `/socratic-review` compares the two. "Felt sure, was wrong" is the most useful thing a journal can show you. That's where your blind spots are.

## The journal website

`/socratic-site` turns your journal into a small static website at `~/.claude/journal/site`. It's styled like the paper insert of a cassette tape, called a "j-card":

- **Tracklist.** The home page lists your lessons like songs on a tape, grouped by month into sides, with search and tag filters.
- **Lesson cards.** Each lesson is a card. You see the recall question and **Side A** ("I thought"). Answer in your head, then **flip** to Side B ("Actually") and your own words.
- **Calibration.** A page compares how sure you felt with how often you were right, at each confidence level.

The site has no dependencies, works offline from your disk, and handles light mode, dark mode, phones and printing.

**Private by default.** Drafts (entries without your own words) and entries marked `private` are never included. `/socratic-site publish` walks you through putting it on GitHub Pages. First it lists exactly what would go public and asks you to confirm. It publishes to a **separate** repository (`learning-log`), never into one of your code projects.

To see the site with sample entries:

```bash
node skill/scripts/build-site.mjs --journal examples/sample-journal.md --out examples/site
open examples/site/index.html
```

## Slash commands

| Command | What it does |
|---|---|
| `/socratic-profile [update]` | Interview that creates or updates your profile |
| `/socratic-on` / `/socratic-off` | Turn the teaching loop on or off for this session |
| `/socratic-log [topic]` | Write a journal entry now |
| `/socratic-review [n / #tag / text]` | Due reviews, recent entries, one recurring pattern, confidence vs correct |
| `/socratic-status` | Current mode, question budget, session tweaks, drafts written this session |
| `/socratic-site [publish]` | Build the journal website; with `publish`, put it on GitHub Pages |

You can also just talk to it: "too many questions", "push harder", "more technical", "simpler", "log it".

## Install

Requires [Claude Code](https://claude.com/claude-code), `git`, Node (Claude Code already needs it), and a shell with symlinks (macOS, Linux, or WSL on Windows).

**1. Clone and link**

```bash
git clone https://github.com/tmoody1973/socratic-builder.git
cd socratic-builder
./install.sh
```

`install.sh` links `skill/` to `~/.claude/skills/socratic-builder` and each command into `~/.claude/commands/`. Because these are symlinks (shortcuts that point back at this repo), edits you make here take effect in your next Claude Code session. Anything already at those paths is moved to `~/.claude/backups/socratic-builder-<timestamp>/`, never deleted. Running it again is safe.

It then asks whether to register the **spaced-review hook**, a small script Claude Code runs at the start of each session. If you say yes, it backs up `~/.claude/settings.json` and adds one entry. It won't add the entry twice. To skip the question:

```bash
./install.sh --hook      # add the review hook without asking
./install.sh --no-hook   # never touch settings.json
```

**2. Make your profile.** Start Claude Code and run `/socratic-profile`.

**3. Make it always on.** Claude Code loads a skill when a request matches its description. To make the teaching loop the default for every non-trivial build, add the rule from [`skill/SKILL.md`](skill/SKILL.md) (section "Teaching Mode: Socratic Building") to your `~/.claude/CLAUDE.md`. Or say "install the socratic-builder skill" and Claude walks you through it. It flags conflicting rules and backs the file up first.

**4. Check it works.** In a new session, ask for help with something small. Claude should ask for a guess before showing code. Run `/socratic-status` to confirm the commands loaded.

## Improving it

This repo is the live copy, so the loop is short:

1. Edit `skill/SKILL.md`, a file in `commands/`, or the site in `skill/site/` and `skill/scripts/build-site.mjs`.
2. Start a new Claude Code session to try it, or rebuild the sample site.
3. Commit and push.

Personal tuning belongs in your git-ignored `skill/profile.md`. Changes to the method belong in `SKILL.md`. If you add a bypass phrase, update both `SKILL.md` and the rule in your CLAUDE.md.

The reasoning behind the big choices is in [`docs/decisions/`](docs/decisions/). The site's visual system is recorded in [`DESIGN.md`](DESIGN.md).

## Uninstall

```bash
rm ~/.claude/skills/socratic-builder
rm ~/.claude/commands/socratic-{on,off,log,review,status,profile,site}.md
```

This removes only the links. The repo and your journal stay. If you registered the review hook, remove the `SessionStart` entry mentioning `review-due.mjs` from `~/.claude/settings.json`. Also remove the "Teaching Mode: Socratic Building" section from your `~/.claude/CLAUDE.md` if you added it.

## License

[MIT](LICENSE)
