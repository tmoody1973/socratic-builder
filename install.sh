#!/usr/bin/env bash
# Link this repo's skill and commands into ~/.claude so edits here are live, and optionally
# register the SessionStart hook that surfaces one spaced-review question per session.
#   ./install.sh            interactive (asks before touching settings.json)
#   ./install.sh --hook     also register the hook without asking
#   ./install.sh --no-hook  never touch settings.json
# Existing real files are moved to ~/.claude/backups/socratic-builder-<timestamp>/, never deleted
# (outside skills/ and commands/, so Claude Code doesn't load them as duplicates).
set -euo pipefail
REPO="$(cd "$(dirname "$0")" && pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP="$HOME/.claude/backups/socratic-builder-$STAMP"
HOOK_MODE="ask"
for a in "$@"; do case "$a" in --hook) HOOK_MODE="yes";; --no-hook) HOOK_MODE="no";; esac; done

link() { # link <source> <target>
  local src="$1" dst="$2"
  mkdir -p "$(dirname "$dst")"
  if [ -L "$dst" ]; then rm "$dst"
  elif [ -e "$dst" ]; then mkdir -p "$BACKUP"; mv "$dst" "$BACKUP/"; echo "backed up $dst to $BACKUP"; fi
  ln -s "$src" "$dst"; echo "linked $dst -> $src"
}
link "$REPO/skill" "$HOME/.claude/skills/socratic-builder"
for f in "$REPO"/commands/*.md; do link "$f" "$HOME/.claude/commands/$(basename "$f")"; done

SETTINGS="$HOME/.claude/settings.json"
if [ "$HOOK_MODE" = "ask" ]; then
  if [ -t 0 ]; then
    read -r -p "Register the spaced-review hook in $SETTINGS? It asks you one recall question per session when a lesson is due. [y/N] " ans
    case "$ans" in [yY]*) HOOK_MODE="yes";; *) HOOK_MODE="no";; esac
  else
    HOOK_MODE="no"
  fi
fi

if [ "$HOOK_MODE" = "yes" ]; then
  command -v node >/dev/null || { echo "node not found; skipping the hook (Claude Code needs Node anyway)."; exit 0; }
  [ -f "$SETTINGS" ] && cp "$SETTINGS" "$SETTINGS.bak-socratic-$STAMP" && echo "backed up $SETTINGS"
  SETTINGS="$SETTINGS" node - <<'JS'
const fs = require('fs');
const p = process.env.SETTINGS;
const s = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
const cmd = 'node "$HOME/.claude/skills/socratic-builder/scripts/review-due.mjs"';
s.hooks = s.hooks || {};
const list = (s.hooks.SessionStart = s.hooks.SessionStart || []);
const present = list.some((g) => (g.hooks || []).some((h) => String(h.command || '').includes('socratic-builder/scripts/review-due.mjs')));
if (present) { console.log('review hook already registered; left as is'); process.exit(0); }
list.push({ matcher: 'startup', hooks: [{ type: 'command', command: cmd, timeout: 10 }] });
fs.writeFileSync(p, JSON.stringify(s, null, 2) + '\n');
console.log('registered SessionStart review hook in ' + p);
JS
fi
echo "Done. Next: run /socratic-profile in Claude Code to create your learner profile."
