# socratic-builder

A Claude Code skill that turns coding sessions into a teaching loop. Instead of jumping to a solution, Claude runs five phases (Frame, Surface, Probe, Bridge, Verify & Reflect), climbs a hint ladder one rung at a time, and keeps an append-only learning journal, so the person building understands more, not just ships more.

## What's here

| Path | What it is |
|---|---|
| `skill/SKILL.md` | The skill: the five phases, hint ladder, calibration, anti-patterns, worked examples, install flow |
| `skill/profile.example.md` | Template for your personal calibration. Copy to `skill/profile.md` (git-ignored) |
| `commands/` | Five slash commands: `/socratic-on`, `/socratic-off`, `/socratic-log`, `/socratic-review`, `/socratic-status` |

## Install

```bash
git clone https://github.com/tmoody1973/socratic-builder.git
cd socratic-builder
./install.sh
```

`install.sh` links the skill and commands into `~/.claude/` so edits in this repo take effect in your next Claude Code session. Then personalise it:

```bash
cp skill/profile.example.md skill/profile.md   # git-ignored; fill in your strengths, gaps and metaphors
```

 Then start a new session and ask for help building something small; Claude should open with a framing question, not a code block.

## Bypass

Say "just do it", "ship it" or "no socratic" to skip the questions for one move, or run `/socratic-off` for the session.
