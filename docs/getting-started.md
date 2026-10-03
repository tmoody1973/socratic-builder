# Getting started with socratic-builder

A plain-English guide for people new to building with AI. No coding background needed. About 15 minutes to set up.

## Why bother

When AI writes your code, you can ship things faster than you understand them. That works until something breaks and you can't tell why, or until you have to decide whether the AI's change is safe to ship.

socratic-builder fixes this without slowing you down much. While you build, Claude asks you an occasional quick question, like "what do you think happens to the notes you already saved?" Guessing first and then seeing the answer is one of the most reliable ways people learn. When an idea lands, Claude writes it into a learning journal, and brings it back days later so it sticks.

The goal of every session: you understand more, not just ship more.

## What you need

- **Claude Code**, Anthropic's coding assistant that runs in your terminal. If you don't have it yet, install it first: [claude.com/claude-code](https://claude.com/claude-code).
- **A Mac or Linux computer**, or Windows with WSL (a way to run Linux inside Windows).
- **The Terminal app.** On a Mac, press Cmd+Space, type "Terminal", press Enter. You'll paste a few commands into it. That's all the terminal work there is.

## Setup

### 1. Download and install it

Paste this into Terminal and press Enter:

```bash
git clone https://github.com/tmoody1973/socratic-builder.git
cd socratic-builder
./install.sh --hook
```

What each line does:

- `git clone …` downloads the project into a folder called `socratic-builder`.
- `cd socratic-builder` moves into that folder.
- `./install.sh --hook` connects the skill to Claude Code, and turns on a small helper script that runs each time you start Claude. That helper is what makes Claude read the skill every session, brings back old lessons for review, and remembers your settings when a long chat gets summarized. It backs up your Claude Code settings file before changing anything.

You should see lines starting with `linked`, then `Done.`

### 2. Tell it who you are

Start Claude Code by typing `claude` in Terminal and pressing Enter. Then type:

```text
/socratic-profile
```

Claude interviews you with one question at a time, for about 5 minutes: what you build, what you already know, how many questions you want. It shows you the result and saves it only when you say so.

The answers matter. Someone new to a topic gets a short example first; someone who knows it well gets left alone. You can change any answer later.

### 3. Check it works

Open a **new** Claude Code session and ask for something small:

```text
Build a tiny command-line notes app in Node that saves notes to a JSON file.
```

Before writing any code, Claude should read the skill. You'll see a line like `Read(…socratic-builder/skill/SKILL.md)`. If not, see "If something seems off" below.

## Your first session: what it looks like

Here's a real first session, lightly trimmed.

Claude read the skill and the profile, built the notes app, and tested it. Testing was marked *new* in the profile, so instead of quizzing first, it pointed at its own test run as a worked example:

> "That test run is also an example of how to prove something works: try the normal path, then try each way it should refuse."

Then it asked one question:

> "In the test I deleted #1, and the next note came out as #3, not #2. Why might reusing a deleted note's number be a problem?"

The learner guessed:

> "It could overwrite something if it still existed."

Claude said what was right, corrected the rest, and used a comparison from the learner's own background (they'd said radio in their profile):

> "Partly right. By the time a number would be reused, the old note is already gone, so there's nothing left to overwrite. The actual danger is mistaken identity. If you put `rm 2` in a script and #2 gets reused, that script now deletes a note you wanted to keep. It's like reusing a song's catalog number in a radio station's library: old playlists would call up the wrong track."

Then it saved the lesson to the journal as a draft, with one line left blank for the learner to fill in.

Notice what *didn't* happen: no stack of questions, no lecture, no refusing to build until the learner got it right. The guess was wrong, and that's fine. A wrong guess followed by the answer still helps you learn.

## Things you can say

| Say this | What happens |
|---|---|
| "just do it", "ship it", "I'm in a hurry" | Claude builds without questions, this time only |
| `/socratic-off` | No questions for the rest of this session |
| "simpler" | Plainer words from here on |
| "more technical" | Real technical terms from here on |
| "too many questions" | Fewer questions |
| "skip" | Skips a review question |
| "Let's do a deep dive on …" | A slower, step-by-step walkthrough of something important |

Small things like typo fixes never get questions.

## Your journal

Your lessons live in one file: `~/.claude/journal/learning-log.md` (the `~` means your home folder).

Each entry has one line left blank: **"In my words"**. Fill it in with one sentence, your own way of saying what you learned. This is the step that matters most: putting an idea in your own words is where most of the learning happens. Claude will never fill it in for you.

The next day, at the start of a session, Claude asks you that lesson's recall question once. Get it right and it comes back in a week, then a month, then three months. Get it wrong and it comes back tomorrow. You'll also be asked how sure you felt, from 1 to 5. Over time, "felt sure but was wrong" shows you where your blind spots are.

Want a website of what you've learned? Run `/socratic-site`. It only includes entries where you've written your own sentence.

## Your first week

- **Leave the settings alone for a few sessions.** Get a feel for it before tuning.
- **Fill in "In my words" within a day or two**, while it's fresh. `/socratic-review` lists the ones still waiting.
- **After a week, run `/socratic-profile update`** and adjust anything that felt too slow or too easy.

## If something seems off

- **Claude never asks anything, and never reads the skill.** The helper script probably isn't on. From the `socratic-builder` folder, run `./install.sh --hook` (safe to run again), then start a new session. If `/socratic-status` says Off, run `/socratic-on`.
- **Too many questions.** Say "too many questions", or set your question budget to *light* with `/socratic-profile update`.
- **Questions are too basic or too hard.** Say "more technical" or "simpler". To make it stick, update your topic levels in the profile.
- **You just need to get something done.** Say "just do it". It's your session.

## Where to go next

- [`profile-guide.md`](profile-guide.md): every profile setting explained, with example profiles.
- [`../README.md`](../README.md): the full picture, including the research behind the method and how to uninstall.
