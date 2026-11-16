const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText,
    filename,
  );
const {
  QUESTIONS,
  calculateRIASEC,
  cosineSimilarity,
  matchTrajectories,
  createDiagnosis,
  restoreDiagnosis,
  applyDiagnosis,
} = require('../lib/diagnosis.ts');
const { DIMENSIONS, hollandCode } = require('../lib/riasec.ts');
const { progression } = require('../lib/progression.ts');
const { PATHWAYS } = require('../lib/pathways.ts');
const answers = (scores) => Object.fromEntries(QUESTIONS.map((q) => [q.id, scores[DIMENSIONS.indexOf(q.dimension)]]));

test('18 distinct items, exactly three for each RIASEC dimension', () => {
  assert.equal(QUESTIONS.length, 18);
  assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, 18);
  for (const d of DIMENSIONS) assert.equal(QUESTIONS.filter((q) => q.dimension === d).length, 3);
});
test('normalization endpoints, neutral midpoint, mixed item sums and fixed dimension order', () => {
  assert.deepEqual(calculateRIASEC(answers([1, 1, 1, 1, 1, 1])), [0, 0, 0, 0, 0, 0]);
  assert.deepEqual(calculateRIASEC(answers([5, 5, 5, 5, 5, 5])), [1, 1, 1, 1, 1, 1]);
  assert.deepEqual(calculateRIASEC(answers([3, 3, 3, 3, 3, 3])), [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]);
  const a = answers([1, 2, 3, 4, 5, 1]);
  a.Q1 = 5;
  assert.equal(calculateRIASEC(a)[0], 1 / 3);
  assert.deepEqual(calculateRIASEC(answers([1, 2, 3, 4, 5, 1])).slice(1), [0.25, 0.5, 0.75, 1, 0]);
});
test('reject missing, extra, fractional, coerced, nonfinite and out of range answers', () => {
  assert.throws(() => calculateRIASEC({}));
  for (const value of [0, 6, 2.5, '5', true, undefined, NaN, Infinity, null])
    assert.throws(() => calculateRIASEC({ ...answers([3, 3, 3, 3, 3, 3]), Q1: value }));
  assert.throws(() => calculateRIASEC({ ...answers([3, 3, 3, 3, 3, 3]), Q19: 5 }));
});
test('cosine: identical=1, orthogonal=0, zero safe, magnitude invariant, invalid rejected', () => {
  assert.ok(Math.abs(cosineSimilarity([1, 2, 3], [1, 2, 3]) - 1) < 1e-12);
  assert.equal(cosineSimilarity([1, 0], [0, 1]), 0);
  assert.equal(cosineSimilarity([0, 0], [1, 1]), 0);
  assert.ok(Math.abs(cosineSimilarity([1, 2], [2, 4]) - 1) < 1e-12);
  for (const pair of [
    [[], []],
    [[1], [1, 2]],
    [[NaN], [1]],
    [[-1], [1]],
    [[1], [Infinity]],
  ])
    assert.throws(() => cosineSimilarity(...pair));
});
test('all eight catalog centroids self-match; codes agree with actual vector order', () => {
  assert.equal(PATHWAYS.length, 8);
  assert.equal(new Set(PATHWAYS.map((p) => p.id)).size, 8);
  const expected = {
    software: 'ICA',
    health: 'SIC',
    design: 'AES',
    energy: 'RIC',
    business: 'ECS',
    agriculture: 'RIE',
    tourism: 'SEA',
    logistics: 'CEI',
  };
  for (const p of PATHWAYS) {
    assert.equal(matchTrajectories(p.riasecVector, PATHWAYS)[0].pathwayId, p.id);
    assert.equal(p.hollandCode, expected[p.id]);
    assert.equal(p.hollandCode, hollandCode(p.riasecVector));
    assert.equal(p.educationalOptions.length, 3);
    for (const o of p.educationalOptions) assert.ok(o.sourceUrl.startsWith('https://'));
  }
});
test('uniform answers at all five levels do not fabricate code, matches or discovery', () => {
  for (let n = 1; n <= 5; n++) {
    const r = createDiagnosis(answers(Array(6).fill(n)));
    assert.equal(r.code, null);
    assert.deepEqual(r.matches, []);
    assert.equal(r.wildcardId, null);
  }
});
test('low interest does not become a high-confidence recommendation just because cosine is scale invariant', () => {
  const r = createDiagnosis(answers([3, 2, 1, 2, 3, 1]));
  assert.equal(r.status, 'low-interest');
  assert.deepEqual(r.topThree, []);
});
test('differentiated profiles yield distinct matches and top-three code; wildcard excludes top three', () => {
  const analytical = createDiagnosis(answers([2, 5, 3, 1, 2, 4]), 'software');
  const interpersonal = createDiagnosis(answers([1, 2, 3, 5, 4, 2]), 'tourism');
  assert.equal(analytical.code, 'ICA');
  assert.equal(interpersonal.code, 'SEA');
  assert.notEqual(analytical.topThree[0], interpersonal.topThree[0]);
  for (const r of [analytical, interpersonal]) {
    assert.equal(r.topThree.length, 3);
    assert.equal(r.matches.length, 8);
    assert.ok(r.wildcardId);
    assert.ok(!r.topThree.includes(r.wildcardId));
    assert.ok(PATHWAYS.find((p) => p.id === r.wildcardId).hollandCode.includes(r.wildcardDimension));
    for (let i = 1; i < 8; i++) assert.ok(r.matches[i - 1].similarity >= r.matches[i].similarity);
  }
});
test('ties explicitly flagged, deterministic and no unsupported zero-interest wildcard', () => {
  const r = createDiagnosis(answers([5, 5, 1, 1, 1, 1]));
  assert.equal(r.tied, true);
  assert.equal(r.code, 'RIA');
  const one = createDiagnosis(answers([1, 5, 1, 1, 1, 1]));
  assert.equal(one.wildcardId, null);
  assert.deepEqual(createDiagnosis(r.answers, '', '2026-10-15T00:00:00Z'), createDiagnosis(r.answers, '', '2026-10-15T00:00:00Z'));
});
test('stored results recompute tampered scores; bad versions, answers, dates, selected paths rejected', () => {
  const r = createDiagnosis(answers([2, 5, 3, 1, 2, 4]), 'design');
  assert.deepEqual(restoreDiagnosis({ ...r, code: 'SSS', vector: [1, 1, 1, 1, 1, 1], matches: [] }), r);
  for (const v of [
    null,
    {},
    { ...r, version: 'old' },
    { ...r, answers: {} },
    { ...r, selectedPathwayId: 'fake' },
    { ...r, completedAt: 'bad' },
  ])
    assert.equal(restoreDiagnosis(v), null);
});
test('1,000 deterministic varied profiles keep scores bounded, ranking stable and selection independent', () => {
  let seed = 42;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return 1 + (seed % 5);
  };
  for (let i = 0; i < 1000; i++) {
    const a = Object.fromEntries(QUESTIONS.map((q) => [q.id, random()]));
    const r = createDiagnosis(a, 'software');
    assert.ok(r.vector.every((n) => n >= 0 && n <= 1));
    assert.ok(r.matches.every((m) => Number.isFinite(m.similarity) && m.matchScore >= 0 && m.matchScore <= 100));
    assert.deepEqual(r.matches, createDiagnosis(a, 'health').matches);
    if (r.wildcardId) assert.ok(!r.topThree.includes(r.wildcardId));
  }
});

test('progression: level boundaries every 250 XP, capped at level 5', () => {
  const at = (xp) => progression(xp);
  assert.deepEqual([at(0).level, at(249).level, at(250).level, at(999).level, at(1000).level, at(99999).level], [1, 1, 2, 4, 5, 5]);
  assert.equal(at(0).percent, 0);
  assert.equal(at(125).percent, 50);
  assert.equal(at(250).percent, 0);
  assert.equal(at(1000).percent, 100);
  assert.equal(at(1000).next, null);
  assert.equal(at(0).next, 250);
});
test('applyDiagnosis sets affinity, onboards, gives 50 XP once and never lowers XP', () => {
  const d = createDiagnosis(answers([2, 5, 3, 1, 2, 4]), 'software');
  const fresh = applyDiagnosis({ xp: 0, name: 'x' }, d);
  assert.equal(fresh.xp, 50);
  assert.equal(fresh.isOnboarded, true);
  assert.equal(fresh.affinity.category, 'Desarrollo de software y web');
  assert.equal(fresh.affinity.percentage, d.matches.find((m) => m.pathwayId === 'software').matchScore);
  assert.equal(applyDiagnosis({ xp: 300 }, d).xp, 300);
  assert.equal(applyDiagnosis(fresh, d).xp, 50);
});
