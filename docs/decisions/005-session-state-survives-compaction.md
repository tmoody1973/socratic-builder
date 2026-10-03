# 005 — Session state survives compaction

**Decision** — A small per-session file records Socratic mode, session tweaks, deep-dive phase and any question still waiting for an answer. The existing startup hook now also runs after a resume or a compaction (when Claude Code summarizes a long chat to free space) and pastes that file back in.

**Why this came up** — Comparing this project with [VibeWise](https://github.com/nykooi1/vibe-wise), a similar learning plugin, showed it restoring its state on every compaction while ours only ran at startup. A long session that gets compacted could forget "Socratic off" and start quizzing someone who asked it to stop, or drop a deep-dive question halfway through. Both break trust in the tool silently.

**Options**
- Do nothing and trust the compaction summary to keep the mode: no work, but the summary decides what survives and nobody can check it.
- A state file inside each project folder, as VibeWise does: also remembers things per codebase, but adds a folder to every project that users have to keep out of git.
- One small file per session under `~/.claude/socratic-builder/sessions/`, named by the session id the hook already receives: nothing touches the user's projects, and two sessions running at once can't overwrite each other.

**What we chose and why** — The per-session file. Claude proposed it after the VibeWise comparison; Tarik approved building it. Socratic mode is about the session, not the codebase, so session-scoped storage fits. Claude writes the file only when mode, tweaks, a deep-dive phase or a waiting question changes, never for the everyday 30-second loop, so normal turns cost nothing extra.

**What we gave up** — Every session now gets one extra line of context (the state file's path), about 40 tokens, even when the journal is quiet. Before this, a quiet journal cost zero. Saving still depends on Claude remembering to write the file; the hook can't infer state from the transcript. Files older than 14 days are pruned automatically, so resuming a session after two weeks restores nothing.

**How we'll know if this was right** — In a real session: turn Socratic off, run `/compact`, then ask for a build. Claude should stay off without being told again. Also, `/socratic-status` should report the same mode before and after a compaction.

**What actually happened** —
