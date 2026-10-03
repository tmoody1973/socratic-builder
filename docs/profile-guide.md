# Writing a useful profile

Your `profile.md` tells Claude how to teach *you*. A good profile is the difference between questions that feel like help and questions that feel like a quiz.

The fastest way to make one is `/socratic-profile`: Claude interviews you one question at a time and writes the file. This guide explains what each part does, so you can make it better by hand.

Your profile lives at `~/.claude/skills/socratic-builder/profile.md`. It's git-ignored, so it never leaves your machine.

## The one idea behind it

Research on learning finds that **beginners and experts need opposite things.** A beginner learns more from seeing a worked example than from being asked questions. An expert finds the same example slow and a little insulting. So the profile isn't a list of facts about you. It's a set of **dials** that tell Claude how much support to give, and where.

## Each part, and why it matters

### Role

`vibe coder` · `AI director` · `developer` · `senior engineer`

This sets sensible starting values for everything else. Pick the one that describes most of your building:

- **Vibe coder:** you describe what you want and the AI builds it. You don't read the code.
- **AI director:** you plan the work, direct AI agents, and want to be able to check what they did.
- **Developer:** you write code yourself, with AI helping.
- **Senior engineer:** you've built and run real systems, and you want depth, not basics.

### Goal

This is the most important dial. It decides what "understanding" means for you:

- **understand-to-verify:** the AI writes the code, and you want to understand it well enough to check it, explain it and catch mistakes. Claude will *never* ask you to write code. It teaches you to read changes, spot risks and prove things work.
- **write-it-myself:** you want to get better at writing code. Claude asks you to take the next step and reviews what you write.
- **go-deeper:** you already build well. Claude pushes on trade-offs, failure modes and alternatives.

Be honest here. Many people pick "write-it-myself" because it sounds more serious. If you actually spend your time directing AI, "understand-to-verify" teaches you the skill you use every day.

### Question budget

How many questions you can take before it gets annoying:

- **light:** at most one question per chunk of work. Good if you're busy, tired, or new to this.
- **standard:** one question per message.
- **push-me:** two or three per message, and harder ones.

Start lighter than you think. You can say "push harder" anytime.

### Explanation style

- **plain:** everyday words, one idea per sentence. The default for everyone.
- **define-inline:** real technical terms, each defined the first time. Good if you want to learn the vocabulary.
- **technical:** precise terms, no definitions. For experienced engineers.

You can override the style per topic, for example technical on APIs but plain on databases.

### Attention

Anything about how you take in information: "one idea per message", "short messages", "show me proof, not claims", "I have ADHD; keep it tight". Claude treats these as rules, not suggestions.

### Topic levels

For each area you care about, pick one:

- **new:** show me a worked example first.
- **familiar:** ask me questions.
- **fluent:** stay out of my way unless I ask.

Rate by what you can *do*, not what you've heard of. A quick test: could you explain it to a friend without looking anything up? If not, it's "new" or "familiar", not "fluent".

Useful areas to rate: product and UX thinking, reading a diff (a before-and-after view of changed code), data models, APIs, authentication (logins), deployment, testing, debugging, performance, security.

### Learning goals

Up to three. Each one needs a finish line: **"I'll know I've got it when I can…"**

- Weak: "Learn databases."
- Strong: "I'll know I've got it when I can look at a change to a table and say what could break for existing data."

The finish line is what makes a goal teachable. Claude steers the teaching moments that come up toward your goals.

### Blind spots

Things you *feel* confident about but have never really been tested on. This matters more than it looks. Studies of AI-assisted learning keep finding that people don't notice their own gaps. Claude checks these first, gently.

### Metaphors

What you know deeply outside software: your old job, a craft, a sport, music, cooking. When you're stuck, Claude explains new ideas through these. An architect hears "this function is load-bearing"; a chef hears "this is your mise en place".

### Reference skills (optional)

Other installed skills Claude should teach *from*: a book or method you're studying. When a teaching moment touches that subject, Claude uses the skill's terms and decision rules, and tags the journal entry with where the idea came from.

```markdown
- **bratsis-ai-pm** (The AI Product Manager's Handbook): use its decision rules in
  AI-product teaching moments. Tag those entries #ai-pm plus the chapter, e.g. #bratsis-ch08.
```

Name what doesn't apply, too. A handbook built around training ML models only partly fits an app that calls an LLM, and saying so stops Claude from teaching the parts that don't fit.

This is a newer field, tested lightly: Claude follows it because it reads your profile, not because the skill has a built-in setting for it.

### Journal

- **Journal path:** where your learning log lives (the default is fine).
- **Project tags:** short tags for your projects, so entries can be grouped.
- **Site:** whether `/socratic-site` can build a browsable website of your log. Publishing is always a separate, confirmed step.
- **Audience (optional):** who will read your entries besides you. Set it if you'll publish the journal, for example in a portfolio: "Write every entry so a hiring manager who wasn't there can follow it: plain English, and name what I was building in one clause." Your "In my words" line stays yours either way, and the site only publishes entries where you've written it. Newer, tested lightly.

## Three example profiles

### A vibe coder

```markdown
- Role: vibe coder
- Background: Small bakery owner. I build tools for my shop with AI.
- Goal: understand-to-verify
- Question budget: light
- Explanation style: plain
- Attention: No jargon. If you must use a tech word, explain it like I'm new.

| Topic | Level |
|---|---|
| What my app does for customers | fluent |
| Where my data is stored | new |
| Getting my app online | new |
| Logins and passwords | new |

Learning goals
1. Know where my customer data lives. I'll know I've got it when I can tell a customer, in one sentence, what we store about them and where.
2. Spot when the AI broke something. I'll know I've got it when I can name one thing to test after every change.

Blind spots
- I assume the AI's code is safe because it runs.

Metaphors
- Baking: recipes, proofing, prep vs service.
```

### An AI director

```markdown
- Role: AI director
- Background: Product manager, trained as an architect.
- Goal: understand-to-verify
- Question budget: standard
- Explanation style: plain
- Attention: One idea per message. Show evidence, not claims.

| Topic | Level |
|---|---|
| Product and UX | fluent |
| APIs | familiar |
| Reading a diff | new |
| Data models | new |
| Testing | new |

Learning goals
1. Review an AI change. I'll know I've got it when I can name one real risk in a diff before it ships.
2. Reason about data. I'll know I've got it when I can state the rule a table must always obey.

Blind spots
- Environment variables: I think I get them, but they've bitten me.

Metaphors
- Architecture: load-bearing vs decorative, foundation vs facade.
```

### A senior engineer

```markdown
- Role: senior engineer
- Background: 12 years backend (Go, Postgres). New to frontend and LLM apps.
- Goal: go-deeper
- Question budget: push-me
- Explanation style: technical
- Attention: Skip basics. Challenge my assumptions.

| Topic | Level |
|---|---|
| Postgres, indexing, transactions | fluent |
| Distributed systems | fluent |
| React and client state (style: define-inline) | new |
| Prompting and evaluating LLM output (style: define-inline) | new |

Learning goals
1. Evaluate LLM features rigorously. I'll know I've got it when I can design an eval that catches a regression before users do.
2. Reason about client-side state. I'll know I've got it when I can predict a re-render bug from reading the component.

Blind spots
- I assume my backend instincts transfer to the frontend.

Metaphors
- Distributed systems: consistency, backpressure, idempotency.
```

Notice the senior engineer overrides the style to `define-inline` on their new topics. Expertise is per topic, not per person.

## Keeping it current

- When Claude notices you're stronger or weaker than your profile says, it offers once to update it.
- Revisit it roughly every month. Move topics up a level as you master them: a profile that never changes means the teaching never fades.
- Run `/socratic-profile` again anytime to update it through the interview.
