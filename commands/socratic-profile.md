---
description: Guided interview that creates or updates your socratic-builder learner profile (profile.md), one plain question at a time.
argument-hint: [optional: "update" to change specific parts]
---

Interview the user and write their learner profile for the `socratic-builder` skill. Read `docs/profile-guide.md` in the skill's repo (via the skill folder's parent, or `~/.claude/skills/socratic-builder/../docs/profile-guide.md` if linked) if you need the reasoning behind each field; follow the format of `profile.example.md` in the skill folder exactly.

Profile path: `~/.claude/skills/socratic-builder/profile.md`.

## How to run the interview

- **One question per message.** Never stack questions. Wait for the answer.
- **Plain English throughout**, whoever the user is. Define any technical term in the same sentence.
- **Offer choices** with a one-line meaning each, plus "something else". People answer choices faster than open questions.
- **Adapt as you go.** Skip or simplify questions that clearly don't apply (for example, don't ask a vibe coder to rate "transactions"; don't walk a senior engineer through what an API is).
- **Keep it short:** 10 questions, under 5 minutes. Say so at the start: "About 10 quick questions, 5 minutes. You can say 'skip' to any of them."
- **Reflect back** in one line at the top of the next question's message, after the role and goal answers (after the write-it-myself check if it fires). Don't wait for a reply to the reflection; they can correct you in their answer.
- **Fixed wording is a suggestion.** Reword any question below into plainer words for a vibe coder.

## If a profile already exists

Read it. Show a 5-line summary of what it says. Ask: "Update everything, or just change some parts?" If `$ARGUMENTS` is "update", go straight to asking which parts. Only re-ask the parts they choose. Keep everything else unchanged.

## The questions, in order

1. **Role.** "Which sounds most like you when you build software?"
   - Vibe coder: I describe what I want and the AI builds it; I don't read the code.
   - AI director: I plan the work, direct AI agents, and want to check what they did.
   - Developer: I write code myself, with AI helping.
   - Senior engineer: I've built and run real systems; I want depth.

2. **Background.** "In a sentence or two, what do you do or know well outside of coding?" (This is for metaphors; any field counts.) For a senior engineer, ask instead: "What part of your own stack do you know best? I'll borrow comparisons from it." Fill the profile's "Metaphors" from this answer only, never from the guide's example profiles.

3. **Goal.** "What does 'understanding' mean for you right now?"
   - Understand to check: the AI writes the code, and I want to understand it well enough to check it and catch mistakes.
   - Write it myself: I want to get better at writing the code.
   - Go deeper: I already build; push me on trade-offs and what can go wrong.
   If they chose vibe coder or AI director but pick "write it myself", check once, gently: "Just checking: do you spend most of your time writing code, or directing the AI? 'Understand to check' teaches the skill you'd use every day." Respect their final answer.

4. **Topic levels.** Offer a list of 5–7 areas suited to their role (from the guide's list, in plain words), and ask them to mark each as **new** (show me an example first), **familiar** (ask me questions) or **fluent** (stay out of my way). Give the test: "Could you explain it to a friend without looking anything up? If not, it's new or familiar." Let them add areas. For a vibe coder, offer at most 4 areas, or ask one area per message. If they hedge on an area ("familiar, I think"), offer it back as a possible blind spot at question 9.

5. **Explanation style.** "How should I talk to you?"
   - Plain English: everyday words, one idea at a time.
   - Teach me the words: use real technical terms, but define each one the first time.
   - Technical: precise terms, no definitions needed.
   For a senior engineer, ask as a separate follow-up message: "Any topics where you'd like plain English or definitions anyway?" and record per-topic overrides.

6. **Question budget.** "How many questions can you take while we build?"
   - Light: at most one per chunk of work.
   - Standard: one per message.
   - Push me: two or three, and harder ones.
   Suggest starting lighter, unless they already asked to be pushed.

7. **Attention.** "Anything else about how you take in information best? For example: short messages, show me proof, I'm often tired or in a hurry." Record their words as rules. Don't re-ask anything they already said at question 5.

8. **Learning goals.** "What are one to three things you want to get better at?" For each, help them add a finish line: "How will you know you've got it? Finish this: 'I'll know I've got it when I can…'" Turn vague goals ("learn databases") into concrete ones with them, not for them.

9. **Blind spots.** "Is there anything you *feel* fine about but have never really been tested on, or that's caught you out before?" Explain in one line why it matters: "People using AI often don't notice their own gaps, so I check these first." It's fine to have none.

10. **Journal.** Explain first: "I keep short notes of what you learn, so you can review them later; tags group the notes by project." Then ask: "Any project names you'd like as tags?" In a separate message, after they answer: "Want to be able to turn your journal into a small website you can read back or share? Publishing is always a separate step that asks you first." (on/off)

## Writing the file

1. Draft the full profile in the exact structure of `profile.example.md`, filled with their answers in their own words where possible. Remove the template's `<!-- -->` guidance comments and its intro paragraph about copying the file. Delete unused goal slots and empty bullets rather than leaving placeholders. Journal path stays the default unless they gave one.
2. **Show the draft** and ask: "Look right? Say 'save', or tell me what to change."
3. On "save": if a profile exists, copy it to `profile.md.bak` first, then write `profile.md`. Confirm in one line: `Saved your profile. I'll use it from your next message.`
4. Then, **use it immediately**: switch to the new explanation style and question budget for the rest of this session.
5. End with one line: "You can change any of this by saying so, or by running /socratic-profile update."

Never invent answers. If they skipped a question, use the skill's default where one exists (for a vibe coder, or anyone who seems overwhelmed, the question budget defaults to light); otherwise write `none (skipped)`. Mark either one `(default)` in the file.
