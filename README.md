# socratic-builder

A [Claude Code](https://claude.com/claude-code) skill that turns coding sessions into a teaching loop.

When you build with AI, you can ship faster than you understand what you shipped. This skill slows the first pass down just enough to fix that. Instead of jumping to a solution, Claude asks what you think first, tests your idea with questions, gives the smallest hint that unblocks you, and checks the concept stuck before moving on. Every real lesson lands in a learning journal you can read back over months.

The win condition for a session is *you understand more*, not just *more code shipped*.

## How it works

Claude runs five phases, in order, each with an exit condition:

| Phase | Question it answers | Done when |
|---|---|---|
| 1. Frame | What are we actually solving? | You both agree on a one-sentence problem statement |
| 2. Surface | What's your current mental model? | Claude can describe your understanding back and you agree |
| 3. Probe | Where does your model break? | Your model holds, or you spot the gap yourself |
| 4. Bridge | How do we get you unstuck? | You can state the next concrete step in your own words |
| 5. Verify & Reflect | Did it stick? | You can explain the concept without prompting |

When you're stuck, Claude climbs a **hint ladder** one rung at a time: reframe → constrain → decompose → analogize (with metaphors from your own field) → point → show one move → explain and verify. It deliberately doesn't jump to the full answer.

Two safety valves keep it from becoming a quiz:

- **Bypass.** Say "just do it", "ship it", "no socratic", "just write it", "skip the questions" or "I'm in a hurry" and Claude does the work directly for that move. Trivial work (typos, renames, formatting, boilerplate) is bypassed automatically.
- **Escape valve.** If you've struggled through about two rounds of questions on the same point, Claude stops, explains directly, then asks one check-for-understanding question.

The full method, anti-patterns and worked examples are in [`skill/SKILL.md`](skill/SKILL.md).

## What's in the repo

| Path | What it is |
|---|---|
| `skill/SKILL.md` | The skill: phases, hint ladder, calibration, anti-patterns, worked examples, mode switching, journal rules, install flow |
| `skill/profile.example.md` | Template for your personal calibration |
| `skill/profile.md` | Your own calibration. **Git-ignored**, never committed. You create it from the example |
| `commands/` | The five slash commands (below) |
| `install.sh` | Links the skill and commands into `~/.claude/` |

## Slash commands

| Command | What it does |
|---|---|
| `/socratic-off` | Turns Socratic mode off for the rest of the session |
| `/socratic-on` | Turns it back on |
| `/socratic-log [topic]` | Proposes a learning-journal entry; appends it only after you approve |
| `/socratic-review [n / #tag / date / text]` | Shows recent journal entries and surfaces one recurring pattern |
| `/socratic-status` | Shows the current mode, phase, session tweaks and any unlogged lesson |

You can also just talk to it: "too many questions, simpler", "push harder, stretch me", "skip the metaphor", "log it".

## Install

Requires [Claude Code](https://claude.com/claude-code), `git`, and a shell that supports symlinks (macOS or Linux; on Windows use WSL).

**1. Clone and link**

```bash
git clone https://github.com/tmoody1973/socratic-builder.git
cd socratic-builder
./install.sh
```

`install.sh` symlinks `skill/` to `~/.claude/skills/socratic-builder` and each command into `~/.claude/commands/`. Because they're links, edits you make in this repo are live in your next Claude Code session. If you already had files at those paths, they're moved to `~/.claude/backups/socratic-builder-<timestamp>/`, never deleted. Running it again is safe.

**2. Add your profile**

```bash
cp skill/profile.example.md skill/profile.md
```

Fill in what you're strong on (Claude confirms and moves on), what you're weaker on (Claude slows down and teaches), metaphors from your own field, and your project tags for the journal. Claude reads it before the first question of each session. Without it, Claude calibrates from the conversation and offers to create one.

**3. Make it always-on**

Claude Code loads a skill when a request matches its description. To make Socratic mode the default for every non-trivial build, add the rule to your `~/.claude/CLAUDE.md`. The exact text is in [`skill/SKILL.md`](skill/SKILL.md) under "The CLAUDE.md rule to inject". Or start Claude Code and say "install the socratic-builder skill", and Claude walks you through it: it reads your existing CLAUDE.md, flags rules that conflict (like "never ask clarifying questions"), backs the file up to `CLAUDE.md.bak`, then adds the rule.

**4. Check it works**

Start a new Claude Code session and ask for help with something small, like "help me write a function to dedupe an array of objects by id". Claude should open with a framing question, not a code block. Then run `/socratic-status` to confirm the commands are registered.

## The learning journal

Lessons are appended to `~/.claude/journal/learning-log.md`. It lives outside the skill on purpose: if you rewrite or remove the skill, your journal survives.

Each entry has the same shape, so it's easy to skim and grep:

```markdown
## 2026-05-12 — Build-time vs runtime env vars

- **Learned:** Values baked in at build can't see secrets set at runtime.
- **Still fuzzy:** How the platform decides which kind a variable is.
- **Pattern to reuse:** Before adding an env var, ask "build or runtime?"
- **Tags:** #deployment #env-vars
```

Claude never writes an entry without your approval, and won't invent a lesson for a session where nothing new landed. To move the journal, change the path in `commands/socratic-log.md` and `commands/socratic-review.md`.

## Improving it

This repo is the live copy, so the loop is short:

1. Edit `skill/SKILL.md` or a file in `commands/`.
2. Start a new Claude Code session to try the change.
3. Commit and push when you're happy.

Personal tuning (strengths, gaps, metaphors, project tags) belongs in `skill/profile.md`, which never leaves your machine. Changes to the method itself belong in `SKILL.md`. If you add a bypass phrase, update both the "Toggling" section of `SKILL.md` and the rule in your CLAUDE.md so they stay in step.

## Uninstall

```bash
rm ~/.claude/skills/socratic-builder
rm ~/.claude/commands/socratic-{on,off,log,review,status}.md
```

These remove only the symlinks; the repo and your journal are untouched. Also remove the "Teaching Mode: Socratic Building" section from your `~/.claude/CLAUDE.md` if you added it.

## License

[MIT](LICENSE)
