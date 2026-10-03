// Runs the real SessionStart hook with fake Claude Code events. `node --test tests/`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, existsSync, mkdirSync, utimesSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOOK = join(dirname(fileURLToPath(import.meta.url)), '..', 'skill', 'scripts', 'review-due.mjs');
const JOURNAL = `## 2026-05-12 — Build-time vs runtime settings

- **Recall question:** When is a build-time variable read?
- **In my words:** _(fill in — one sentence)_
- **Review:** due 2026-05-13 · step 0 · history —
- **Status:** draft
`;

function setup() {
  const dir = mkdtempSync(join(tmpdir(), 'socratic-'));
  const env = {
    ...process.env,
    SOCRATIC_JOURNAL: join(dir, 'log.md'),
    SOCRATIC_STATE_DIR: join(dir, 'sessions'),
    SOCRATIC_TODAY: '2026-06-01',
  };
  writeFileSync(env.SOCRATIC_JOURNAL, JOURNAL);
  mkdirSync(env.SOCRATIC_STATE_DIR);
  const run = (event) => spawnSync('node', [HOOK], { env, input: JSON.stringify(event), encoding: 'utf8' });
  const stateFile = (id) => join(env.SOCRATIC_STATE_DIR, `${id}.md`);
  return { run, stateFile };
}

test('startup asks the due review question and names the state file', () => {
  const { run, stateFile } = setup();
  const out = run({ session_id: 'abc', source: 'startup' }).stdout;
  assert.match(out, /When is a build-time variable read\?/);
  assert.ok(out.includes(stateFile('abc')));
});

test('compact restores state and does not ask the review question again', () => {
  const { run, stateFile } = setup();
  writeFileSync(stateFile('abc'), '# Socratic session state\nMode: off\nWaiting on: none\n');
  const out = run({ session_id: 'abc', source: 'compact' }).stdout;
  assert.match(out, /Mode: off/);
  assert.doesNotMatch(out, /spaced-review question is due/);
});

test('startup and clear discard old state for the same session id', () => {
  for (const source of ['startup', 'clear']) {
    const { run, stateFile } = setup();
    writeFileSync(stateFile('abc'), 'Mode: off\n');
    run({ session_id: 'abc', source });
    assert.equal(existsSync(stateFile('abc')), false, source);
  }
});

test('startup prunes state files older than two weeks, keeps recent ones', () => {
  const { run, stateFile } = setup();
  writeFileSync(stateFile('old'), 'Mode: off\n');
  writeFileSync(stateFile('recent'), 'Mode: off\n');
  const month = Date.now() / 1000 - 30 * 86400;
  utimesSync(stateFile('old'), month, month);
  run({ session_id: 'new', source: 'startup' });
  assert.equal(existsSync(stateFile('old')), false);
  assert.equal(existsSync(stateFile('recent')), true);
});

test('a session id that could escape the folder is ignored', () => {
  const { run } = setup();
  const res = run({ session_id: '../../evil', source: 'compact' });
  assert.equal(res.status, 0);
  assert.doesNotMatch(res.stdout, /evil/);
});

test('missing or broken event input still runs the startup path', () => {
  const { run } = setup();
  const res = spawnSync('node', [HOOK], {
    env: { ...process.env, SOCRATIC_JOURNAL: '/nonexistent', SOCRATIC_STATE_DIR: '/nonexistent' },
    input: 'not json', encoding: 'utf8',
  });
  assert.equal(res.status, 0);
  assert.match(run({}).stdout, /spaced-review question is due/);
});

test('startup points Claude at SKILL.md so teaching does not depend on Claude picking the skill', () => {
  const { run } = setup();
  assert.match(run({ session_id: 'abc', source: 'startup' }).stdout, /Read .*SKILL\.md/);
});

test('compact repeats the SKILL.md pointer when on, drops it when the session is off', () => {
  const { run, stateFile } = setup();
  writeFileSync(stateFile('on'), '# Socratic session state\nMode: on\n');
  writeFileSync(stateFile('off'), '# Socratic session state\nMode: off\n');
  assert.match(run({ session_id: 'on', source: 'compact' }).stdout, /Read .*SKILL\.md/);
  assert.doesNotMatch(run({ session_id: 'off', source: 'compact' }).stdout, /Read .*SKILL\.md/);
});
