#!/usr/bin/env bash
# Link this repo's skill and commands into ~/.claude so edits here are live.
# Existing real files are moved to ~/.claude/backups/socratic-builder-<timestamp>/, never deleted
# (outside skills/ and commands/, so Claude Code doesn't load them as duplicates).
set -euo pipefail
REPO="$(cd "$(dirname "$0")" && pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP="$HOME/.claude/backups/socratic-builder-$STAMP"
link() { # link <source> <target>
  local src="$1" dst="$2"
  mkdir -p "$(dirname "$dst")"
  if [ -L "$dst" ]; then rm "$dst"
  elif [ -e "$dst" ]; then mkdir -p "$BACKUP"; mv "$dst" "$BACKUP/"; echo "backed up $dst to $BACKUP"; fi
  ln -s "$src" "$dst"; echo "linked $dst -> $src"
}
link "$REPO/skill" "$HOME/.claude/skills/socratic-builder"
for f in "$REPO"/commands/*.md; do link "$f" "$HOME/.claude/commands/$(basename "$f")"; done
