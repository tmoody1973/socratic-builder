#!/usr/bin/env node
// Builds a static, dependency-free website from the socratic-builder learning journal.
//   node build-site.mjs [--journal <file>] [--out <dir>] [--title "My learning log"]
// Drafts and entries marked private are never included. All links are relative, so the
// output works opened from disk and hosted under a GitHub Pages subpath.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE_SRC = resolve(HERE, '..', 'site');

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const expand = (p) => p.replace(/^~(?=$|\/)/, homedir());
const JOURNAL = expand(arg('journal', process.env.SOCRATIC_JOURNAL || '~/.claude/journal/learning-log.md'));
const OUT = resolve(expand(arg('out', join(dirname(JOURNAL), 'site'))));
const TITLE = arg('title', 'Learning log');
const TODAY = process.env.SOCRATIC_TODAY || new Date().toISOString().slice(0, 10);
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const inline = (s = '') => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
const slug = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'entry';
const shortDate = (d) => { const [, m, day] = d.split('-'); return `${MONTHS[+m - 1]} ${+day}`; };

function parse(text) {
  return text.split(/^## (?=\d{4}-\d{2}-\d{2})/m).slice(1).map((block) => {
    const head = block.split('\n')[0];
    const date = head.slice(0, 10);
    const title = head.replace(/^\d{4}-\d{2}-\d{2}\s*[—–-]\s*/, '').trim();
    const field = (name) => (block.match(new RegExp(`\\*\\*${name}:\\*\\*[ \\t]*(.*)`)) || [])[1]?.trim() || '';
    const review = field('Review');
    const history = (review.match(/history\s+(.*)$/) || [])[1] || '';
    const marks = [...history.matchAll(/([✓✗])\s*(\d)?/g)].map((m) => ({ hit: m[1] === '✓', conf: m[2] ? +m[2] : null }));
    return {
      date, title,
      thought: field('I thought'), actually: field('Actually'), check: field("How I'd check next time"),
      words: field('In my words'), question: field('Recall question'),
      confidence: (field('Confidence').match(/(\d)\s*\/\s*5/) || [])[1] || '',
      due: (review.match(/due (\d{4}-\d{2}-\d{2})/) || [])[1] || '',
      status: field('Status').toLowerCase(),
      tags: (field('Tags').match(/#[\w-]+/g) || []).map((t) => t.slice(1)),
      marks,
    };
  });
}

const ICON = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  flip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9a8 8 0 0 1 14-3l2 2M20 15a8 8 0 0 1-14 3l-2-2"/><path d="M20 4v4h-4M4 20v-4h4"/></svg>',
  hit: '<svg class="mark mark--hit" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4"/></svg>',
  miss: '<svg class="mark mark--miss" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>',
};

function shell({ title, root, body, description }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="stylesheet" href="${root}assets/style.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<aside class="spine" aria-label="${esc(TITLE)}">
  <div class="spine__stripe" aria-hidden="true"><span></span><span></span></div>
  <a class="spine__title" href="${root}index.html">${esc(TITLE)}</a>
  <div class="spine__sides" aria-hidden="true">A<br>B</div>
</aside>
<main class="page" id="main">
${body}
<p class="foot">Made with <a href="https://github.com/tmoody1973/socratic-builder">socratic-builder</a> · built ${esc(shortDate(TODAY))}</p>
</main>
<script src="${root}assets/site.js"></script>
</body>
</html>
`;
}

function marksHtml(e) {
  if (!e.marks.length) return '';
  const label = e.marks.map((m) => `${m.hit ? 'recalled' : 'missed'}${m.conf ? ` at ${m.conf}/5` : ''}`).join(', ');
  return `<span class="marks" role="img" aria-label="Reviews: ${label}">${e.marks.map(markIcon).join('')}</span>`;
}
const markIcon = (m) => (m.hit ? ICON.hit : !m.hit && m.conf >= 4 ? ICON.miss.replace('mark--miss', 'mark--miss mark--sure') : ICON.miss);

function indexPage(entries, tags, stats) {
  const groups = new Map();
  for (const e of [...entries].sort((a, b) => b.date.localeCompare(a.date))) {
    const key = e.date.slice(0, 7);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(e);
  }
  let sideLetter = 0;
  const sides = [...groups.entries()].map(([ym, list]) => {
    const [y, m] = ym.split('-');
    const letter = String.fromCharCode(65 + (sideLetter++ % 26));
    const items = list.map((e, i) => `
    <li data-tape data-tags="${esc(e.tags.join(' '))}" data-text="${esc([e.title, e.question, e.tags.join(' ')].join(' ').toLowerCase())}">
      <a class="track" href="tapes/${e.slug}.html">
        <span class="track__no" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <span class="track__title">${inline(e.title)}</span>
        <span class="track__lead" aria-hidden="true"></span>
        <span class="track__time">${esc(shortDate(e.date))}${marksHtml(e)}</span>
        ${e.question ? `<span class="track__q">${inline(e.question)}</span>` : ''}
      </a>
    </li>`).join('');
    return `
  <section class="side" data-side aria-labelledby="side-${ym}">
    <h2 class="side__head" id="side-${ym}"><span class="side__stamp" aria-hidden="true">${letter}</span>${MONTH_NAMES[+m - 1]} ${y}<span class="side__count">${list.length} ${list.length === 1 ? 'lesson' : 'lessons'}</span></h2>
    <ol class="tracklist">${items}
    </ol>
  </section>`;
  }).join('');

  const body = `
<header class="masthead">
  <h1>${esc(TITLE)}</h1>
  <div class="masthead__rule" aria-hidden="true"></div>
  <p class="tally"><b>${stats.count}</b> ${stats.count === 1 ? 'lesson' : 'lessons'} · <b>${stats.reviews}</b> ${stats.reviews === 1 ? 'review' : 'reviews'}${stats.due ? ` · <b>${stats.due}</b> due` : ''}</p>
  <nav class="nav-links" aria-label="Pages"><a href="calibration.html">Confidence check</a></nav>
</header>
<div class="finder" role="search">
  <label class="search">${ICON.search}<span class="skip">Search lessons</span><input class="caret-fix" type="search" data-search placeholder="Search your tapes" autocomplete="off"></label>
  ${tags.length ? `<div class="labels" role="group" aria-label="Filter by tag">${tags.map((t) => `<button class="label" type="button" data-tag="${esc(t)}" aria-pressed="false">#${esc(t)}</button>`).join('')}</div>` : ''}
</div>
${entries.length ? sides : '<p class="empty">No lessons yet. They appear here once you add your own words to a draft.</p>'}
<p class="empty hidden" data-empty>Nothing on this shelf matches. Try another word or label.</p>`;
  return shell({ title: TITLE, root: '', body, description: `${stats.count} lessons: what I thought, and what's actually true.` });
}

function entryPage(e) {
  const tracks = e.marks.map((m) => `<li class="${m.hit ? '' : m.conf >= 4 ? 'miss miss--sure' : 'miss'}"><span>${m.hit ? 'Recalled it' : 'Missed it'}${m.conf ? ` · felt ${m.conf}/5 sure` : ''}</span><span class="when">${markIcon(m)}</span></li>`).join('');
  const nextDue = e.status === 'retired' ? 'Retired: remembered four times running.' : e.due ? `Next review <b>${esc(shortDate(e.due))}</b>${e.due <= TODAY ? ' (due now)' : ''}` : '';
  const quiz = Boolean(e.thought && e.actually);
  const reveal = `
    <section class="words" aria-labelledby="w"><h2 id="w">In my words</h2><blockquote>${inline(e.words)}</blockquote></section>
    ${e.check ? `<section class="note"><h2>How I'd check next time</h2><p>${inline(e.check)}</p></section>` : ''}`;
  const body = `
<a class="back" href="../index.html">${ICON.back}All tapes</a>
<article class="jcard" aria-labelledby="t">
  <div class="jcard__spine" aria-hidden="true"><span>${inline(e.title)}</span><span>${esc(shortDate(e.date))}</span></div>
  <div class="jcard__body">
    <header class="flap">
      <div>
        <h1 id="t">${inline(e.title)}</h1>
        <p class="flap__meta"><span>${esc(shortDate(e.date))} ${esc(e.date.slice(0, 4))}</span>${e.tags.length ? `<span class="tagline">${e.tags.map((t) => `<a href="../index.html?tag=${encodeURIComponent(t)}">#${esc(t)}</a>`).join(' ')}</span>` : ''}</p>
      </div>
      <div class="brand">
        <div class="brand__slashes" aria-hidden="true"><span></span><span></span><span></span></div>
        ${e.confidence ? `<span class="brand__conf">Felt ${esc(e.confidence)}/5 sure</span>` : ''}
      </div>
    </header>
    <div class="printstripe" aria-hidden="true"><span></span><span></span></div>
    ${quiz ? `
    <section class="deck" aria-label="Quiz yourself">
      ${e.question ? `<div class="recall"><h2>Recall question</h2><p>${inline(e.question)}</p><p class="recall__how">Answer it in your head, then flip.</p></div>` : ''}
      <div class="turn" data-turn>
        <div class="turn__card">
          <div class="face face--a"><h2 class="face__head"><span>Side A</span><span>I thought</span></h2><p>${inline(e.thought)}</p></div>
          <div class="face face--b"><h2 class="face__head"><span>Side B</span><span>Actually</span></h2><p>${inline(e.actually)}</p></div>
        </div>
      </div>
      <button class="flip" type="button" data-flip aria-pressed="false">${ICON.flip}<span>Flip to Side B</span></button>
      <p class="sealed" data-sealed hidden>Your own words and how to check it appear after you flip.</p>
    </section>
    <div class="reveal" data-reveal>${reveal}</div>` : `<div class="reveal">${e.question ? `<div class="recall"><h2>Recall question</h2><p>${inline(e.question)}</p></div>` : ''}${reveal}</div>`}
    ${tracks || nextDue ? `<section class="log" aria-labelledby="l"><h2 id="l">Review log</h2>${tracks ? `<ol class="tracks">${tracks}</ol>` : ''}${nextDue ? `<p class="nextdue">${nextDue}</p>` : ''}</section>` : ''}
  </div>
</article>`;
  return shell({ title: `${e.title} · ${TITLE}`, root: '../', body, description: e.question || e.title });
}

function calibrationPage(entries) {
  const rows = [1, 2, 3, 4, 5].map((c) => {
    const at = entries.flatMap((e) => e.marks).filter((m) => m.conf === c);
    return { c, n: at.length, hits: at.filter((m) => m.hit).length };
  });
  const total = rows.reduce((s, r) => s + r.n, 0);
  const sure = rows.filter((r) => r.c >= 4);
  const sureN = sure.reduce((s, r) => s + r.n, 0);
  const sureHits = sure.reduce((s, r) => s + r.hits, 0);
  const wrongSure = entries.filter((e) => e.marks.some((m) => !m.hit && m.conf >= 4));
  const lede = !total
    ? 'No reviews yet. Each time a recall question comes back and you answer it, your confidence and result land here.'
    : sureN
      ? `When you felt 4 or 5 out of 5 sure, you were right ${sureHits} of ${sureN} times. Learning that feels hard often sticks better than learning that feels easy, so this page is about honesty, not a score.`
      : 'You have not yet answered a review feeling very sure. This page fills in as reviews come back.';
  const bar = (r) => {
    if (!r.n) return `<span class="nodata">No reviews at this level yet</span>`;
    const pct = Math.round((r.hits / r.n) * 100);
    const want = r.c * 20;
    const gap = pct - want;
    const verdict = Math.abs(gap) < 15 ? 'about right' : gap < 0 ? 'more sure than right' : 'more right than sure';
    return `<div class="tallybar" role="img" aria-label="${pct} percent right; at ${r.c}/5 sure you'd expect about ${want} percent: ${verdict}"><i style="width:${pct}%"></i><b style="left:${want}%"></b></div>`;
  };
  const body = `
<a class="back" href="index.html">${ICON.back}All tapes</a>
<section class="ledger" aria-labelledby="c">
  <header class="masthead"><h1 id="c">Confidence check</h1><div class="masthead__rule" aria-hidden="true"></div></header>
  <p class="ledger__lede">${esc(lede)}</p>
  ${total ? `<p class="ledger__key"><span class="ledger__keymark" aria-hidden="true"></span>The upright line marks where each level should land: 1/5 sure ≈ right 1 time in 5; 5/5 sure ≈ right every time.</p>
  <table>
    <thead><tr><th scope="col">How sure</th><th scope="col">Right</th><th scope="col">Against where it should be</th></tr></thead>
    <tbody>${rows.map((r) => `<tr><td class="conf">${r.c}/5</td><td class="count">${r.n ? `${r.hits} of ${r.n}` : '—'}</td><td>${bar(r)}</td></tr>`).join('')}</tbody>
  </table>` : ''}
  ${wrongSure.length ? `<div class="warnings"><h2>Felt sure, wasn't</h2><ul>${wrongSure.map((e) => `<li><a href="tapes/${e.slug}.html">${inline(e.title)}</a></li>`).join('')}</ul></div>` : ''}
</section>`;
  return shell({ title: `Confidence check · ${TITLE}`, root: '', body, description: 'How often I was right when I felt sure.' });
}

function copyDir(src, dst) {
  mkdirSync(dst, { recursive: true });
  for (const f of readdirSync(src, { withFileTypes: true })) {
    if (f.isDirectory()) copyDir(join(src, f.name), join(dst, f.name));
    else copyFileSync(join(src, f.name), join(dst, f.name));
  }
}

function main() {
  if (!existsSync(JOURNAL)) {
    console.error(`No journal at ${JOURNAL}. Nothing to build yet.`);
    process.exit(1);
  }
  const all = parse(readFileSync(JOURNAL, 'utf8'));
  const entries = all.filter((e) => e.words && !/fill in/i.test(e.words) && !['draft', 'private'].includes(e.status));
  const seen = new Map();
  for (const e of entries) {
    let s = `${e.date}-${slug(e.title)}`;
    const n = (seen.get(s) || 0) + 1;
    seen.set(s, n);
    e.slug = n > 1 ? `${s}-${n}` : s;
  }
  const tagCount = new Map();
  entries.forEach((e) => e.tags.forEach((t) => tagCount.set(t, (tagCount.get(t) || 0) + 1)));
  const tags = [...tagCount.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
  const stats = {
    count: entries.length,
    reviews: entries.reduce((s, e) => s + e.marks.length, 0),
    due: entries.filter((e) => e.due && e.due <= TODAY && e.status !== 'retired').length,
  };

  if (existsSync(join(OUT, 'tapes'))) rmSync(join(OUT, 'tapes'), { recursive: true });
  mkdirSync(join(OUT, 'tapes'), { recursive: true });
  copyDir(SITE_SRC, join(OUT, 'assets'));
  writeFileSync(join(OUT, 'index.html'), indexPage(entries, tags, stats));
  writeFileSync(join(OUT, 'calibration.html'), calibrationPage(entries));
  for (const e of entries) writeFileSync(join(OUT, 'tapes', `${e.slug}.html`), entryPage(e));
  writeFileSync(join(OUT, '.nojekyll'), '');

  const skipped = all.length - entries.length;
  console.log(`Built ${entries.length} lesson page(s) into ${OUT}${skipped ? ` (${skipped} draft or private entr${skipped === 1 ? 'y' : 'ies'} left out)` : ''}.`);
  console.log(`Open: ${join(OUT, 'index.html')}`);
}

main();
