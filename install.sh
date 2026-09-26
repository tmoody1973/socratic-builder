#!/usr/bin/env bash
# Link this repo's skill and commands into ~/.claude so edits here are live.
# Existing real files are moved aside to *.bak-<timestamp>, never deleted.
set -euo pipefail
REPO="$(cd "$(dirname "$0")" && pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
link() { # link <source> <target>
  local src="$1" dst="$2"
  mkdir -p "$(dirname "$dst")"
  if [ -L "$dst" ]; then rm "$dst"
  elif [ -e "$dst" ]; then mv "$dst" "$dst.bak-$STAMP"; echo "backed up $dst"; fi
  ln -s "$src" "$dst"; echo "linked $dst -> $src"
}
link "$REPO/skill" "$HOME/.claude/skills/socratic-builder"
for f in "$REPO"/commands/*.md; do link "$f" "$HOME/.claude/commands/$(basename "$f")"; done
