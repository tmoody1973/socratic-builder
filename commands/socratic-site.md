---
description: Build your learning journal into a browsable website. With "publish", walk through putting it on GitHub Pages (always asks first).
argument-hint: [optional: "publish"]
---

Build the learning-journal website.

## Build (always)

1. Find the journal: `Journal path` in `~/.claude/skills/socratic-builder/profile.md`, else `~/.claude/journal/learning-log.md`. Use the profile's name for the title if there is one (e.g. "Tarik's learning log"), else "Learning log".
2. Run:
   `node ~/.claude/skills/socratic-builder/scripts/build-site.mjs --journal <journal path> --out ~/.claude/journal/site --title "<title>"`
3. Report in plain words: how many lessons went in, how many drafts or private entries were left out, and the path to open (`~/.claude/journal/site/index.html`). Offer to open it.

Drafts (no "In my words" yet) and entries with `Status: private` never go on the site.

## Publish (only with `$ARGUMENTS` = "publish")

Publishing makes the lessons public on the internet. Treat it as irreversible (it can be indexed or cached even if removed later).

1. **Show exactly what will go public:** list every lesson title that's in the site. Ask: "These N lessons will be public at a GitHub Pages address. Anything to mark private first?" Apply any `Status: private` changes the user asks for, and rebuild.
2. **Confirm the destination.** Default: a separate public repo named `learning-log` under the user's GitHub account (check `gh auth status`). Never publish into the socratic-builder repo or any code repo. Ask: "Publish to github.com/<user>/learning-log? (yes / different name / stop)"
3. **Only after an explicit yes:**
   - If the repo doesn't exist: `gh repo create <user>/learning-log --public --description "My learning log"`.
   - Copy the built site into a local working folder (`~/.claude/journal/site-publish`), `git init` if needed, commit with message `docs: update learning log`, and push to `main`.
   - Turn on Pages from `main` / root: `gh api -X POST repos/<user>/learning-log/pages -f "source[branch]=main" -f "source[path]=/"` (if it already exists, skip).
   - The build writes a `.nojekyll` file, so GitHub serves the files as-is.
4. **Report the address** (`https://<user>.github.io/learning-log/`) and note that the first publish can take a minute or two to appear. Verify by fetching the address; if it isn't live yet, say so rather than claiming it is.
5. For later updates, `/socratic-site publish` repeats steps 1, then commits and pushes only if the user confirms again.

Any other static host works too: the site is plain HTML with relative links. For Vercel, run `vercel deploy ~/.claude/journal/site` (also public; same confirmation rules).
