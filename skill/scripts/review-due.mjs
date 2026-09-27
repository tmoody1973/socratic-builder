#!/usr/bin/env node
// SessionStart hook for socratic-builder.
// Reads the learning journal, picks at most ONE entry whose review is due, and prints a short
// instruction that Claude Code adds to the session's context. Prints nothing when nothing is due,
// so a quiet journal costs zero tokens. Never throws: a broken journal must not break startup.
import { readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const JOURNAL = process.env.SOCRATIC_JOURNAL || join(homedir(), '.claude', 'journal', 'learning-log.md');
const today = (process.env.SOCRATIC_TODAY || new Date().toISOString().slice(0, 10));

function parse(text) {
  // Entries start with "## YYYY-MM-DD — Title"; everything until the next "## " belongs to it.
  return text.split(/^## (?=\d{4}-\d{2}-\d{2})/m).slice(1).map((block) => {
    const title = block.split('\n')[0].replace(/^\d{4}-\d{2}-\d{2}\s*[—-]\s*/, '').trim();
    const field = (name) => (block.match(new RegExp(`\\*\\*${name}:\\*\\*\\s*(.+)`)) || [])[1]?.trim();
    const review = field('Review') || '';
    return {
      title,
      question: field('Recall question'),
      status: (field('Status') || '').toLowerCase(),
      due: (review.match(/due (\d{4}-\d{2}-\d{2})/) || [])[1],
      mine: field('In my words') || '',
    };
  });
}

try {
  if (!existsSync(JOURNAL)) process.exit(0);
  const entries = parse(readFileSync(JOURNAL, 'utf8'));
  const due = entries
    .filter((e) => e.question && e.due && e.due <= today && e.status !== 'retired')
    .sort((a, b) => a.due.localeCompare(b.due)); // most overdue first
  const drafts = entries.filter((e) => e.status === 'draft' && /fill in|^_?\(/i.test(e.mine)).length;
  const lines = [];
  if (due.length) {
    const e = due[0];
    lines.push(
      `[socratic-builder] One spaced-review question is due from the learning journal (${due.length} due in total; ask only this one).`,
      `Entry: "${e.title}". Question: "${e.question}"`,
      'Ask it once, briefly, before the first new piece of work, unless the user opens with a bypass phrase or an urgent task. Ask for a 1-5 confidence rating with the answer. Give one line of feedback, then update that entry\'s Review line per the skill\'s "Spaced review" rules.'
    );
  }
  if (drafts) lines.push(`[socratic-builder] ${drafts} journal draft(s) still need the user's one-sentence "In my words" line. Mention this once, at a natural pause; never nag.`);
  if (lines.length) process.stdout.write(lines.join('\n') + '\n');
} catch {
  process.exit(0);
}
