// BrandGuard AI - Quality Audit Test Suite
const fs = require('fs');

global.window = {};

// Mock localStorage
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

// Load code
eval(fs.readFileSync('js/data/defaultGuidelines.js', 'utf8'));
eval(fs.readFileSync('js/data/demoSamples.js', 'utf8'));
eval(fs.readFileSync('js/services/storageService.js', 'utf8'));
eval(fs.readFileSync('js/services/ruleEngine.js', 'utf8'));
eval(fs.readFileSync('js/services/geminiService.js', 'utf8'));

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('=== BRANDGUARD AI QUALITY AUDIT TEST SUITE ===\n');

// 1. Initial Guidelines & History
console.log('Test Group 1: Persistence & Initial Seeding');
const initialGuidelines = window.StorageService.getGuidelines();
assert(initialGuidelines && initialGuidelines.brandName === 'NovaCloud AI', 'Default guidelines seeded with brand NovaCloud AI');
assert(Array.isArray(initialGuidelines.prohibitedWords) && initialGuidelines.prohibitedWords.length >= 10, 'Prohibited words seeded (>= 10)');
assert(Array.isArray(initialGuidelines.terminology) && initialGuidelines.terminology.length >= 6, 'Approved terminology seeded (>= 6)');
assert(Array.isArray(initialGuidelines.facts) && initialGuidelines.facts.length >= 6, 'Brand facts seeded (>= 6)');
const initialHistory = window.StorageService.getHistory();
assert(Array.isArray(initialHistory) && initialHistory.length >= 4, 'History seeded with realistic records (>= 4)');

// 2. Demo Samples Analysis
console.log('\nTest Group 2: Content Analysis on Demo Samples');
const demoHighRisk = window.BrandGuardDemos.samples[0];
const resHighRisk = window.RuleEngine.analyze(demoHighRisk.content, demoHighRisk.type, initialGuidelines);
assert(resHighRisk.brandScore <= 40, `High-Risk sample received low score (${resHighRisk.brandScore}/100)`);
assert(resHighRisk.scoreTier === 'High Risk', `High-Risk tier identified correctly (${resHighRisk.scoreTier})`);
assert(resHighRisk.issues.length >= 10, `Detected all violations in high-risk copy (${resHighRisk.issues.length} detected)`);

const demoCompliant = window.BrandGuardDemos.samples[2];
const resCompliant = window.RuleEngine.analyze(demoCompliant.content, demoCompliant.type, initialGuidelines);
assert(resCompliant.brandScore === 100, `Compliant sample received perfect score (${resCompliant.brandScore}/100)`);
assert(resCompliant.issues.length === 0, `Compliant sample has zero issues`);

// 3. Dynamic Guideline Usage
console.log('\nTest Group 3: Dynamic Guidelines Enforcement');
// A. Custom Prohibited Word
const customGuidelines = JSON.parse(JSON.stringify(initialGuidelines));
customGuidelines.prohibitedWords.push({
  id: 'custom-banned-1',
  term: 'legacy competitor',
  severity: 'critical',
  category: 'Competitive Policy',
  reason: 'Never name legacy competitors directly.',
  alternatives: ['traditional architectures']
});
const testCopy1 = 'Our platform outperforms any legacy competitor by a mile.';
const resCustomBanned = window.RuleEngine.analyze(testCopy1, 'social', customGuidelines);
assert(resCustomBanned.issues.some(i => i.originalText.toLowerCase() === 'legacy competitor'), 'Dynamically detects newly added prohibited word');

// B. Custom Fact Verification
customGuidelines.facts.push({
  id: 'custom-fact-1',
  key: 'Founding Year',
  fact: 'Founded in 2015 in Austin, TX.',
  verification: 'Corporate Charter'
});
const testCopyFact = 'NovaCloud was founded in 2021 with immense momentum.';
const resCustomFact = window.RuleEngine.analyze(testCopyFact, 'press', customGuidelines);
assert(resCustomFact.issues.some(i => i.category === 'facts' && i.suggestedCorrection.includes('2015')), 'Dynamically uses custom founding year fact (2015)');

// 4. Correction Application & Re-Analysis
console.log('\nTest Group 4: Correction Application & Re-Analysis Workflow');
let currentText = demoHighRisk.content;
const issuesToApply = resHighRisk.issues.filter(i => i.suggestedCorrection);
assert(issuesToApply.length > 0, `Found ${issuesToApply.length} actionable corrections`);

// Apply individual correction
const firstIssue = issuesToApply[0];
assert(currentText.includes(firstIssue.originalText), `Snippet "${firstIssue.originalText}" found in text`);
const updatedText = currentText.replace(firstIssue.originalText, firstIssue.suggestedCorrection);
assert(!updatedText.includes(firstIssue.originalText), `Snippet "${firstIssue.originalText}" successfully replaced`);

// Apply all corrections
let remediatedText = currentText;
issuesToApply.forEach(iss => {
  if (remediatedText.includes(iss.originalText)) {
    remediatedText = remediatedText.replace(iss.originalText, iss.suggestedCorrection);
  }
});
const resRemediated = window.RuleEngine.analyze(remediatedText, demoHighRisk.type, initialGuidelines);
assert(resRemediated.brandScore > resHighRisk.brandScore, `Remediated score (${resRemediated.brandScore}) is higher than original (${resHighRisk.brandScore})`);

// 5. Active Draft Persistence
console.log('\nTest Group 5: Active Draft State Persistence');
window.StorageService.saveActiveDraft({
  title: 'My Custom Draft Title',
  contentType: 'email',
  content: 'Hello team, testing draft auto-save.'
});
const restoredDraft = window.StorageService.getActiveDraft();
assert(restoredDraft && restoredDraft.title === 'My Custom Draft Title', 'Active draft persists and restores from localStorage');

// 6. Review Workflow Transitions
console.log('\nTest Group 6: Review Workflow Persistence & Status Transitions');
const newRecord = {
  id: 'test-wf-001',
  title: 'Webinar Press Release',
  contentType: 'press',
  content: 'NovaCloud enterprise updates.',
  brandScore: 92,
  status: 'pending_approval'
};
window.StorageService.saveCheckRecord(newRecord);
let fetched = window.StorageService.getHistory().find(h => h.id === 'test-wf-001');
assert(fetched && fetched.status === 'pending_approval', 'Saved draft with pending_approval status');

// Transition to approved
fetched.status = 'approved';
fetched.reviewer = 'Jane Doe';
fetched.reviewNote = 'Approved for publication';
window.StorageService.saveCheckRecord(fetched);
fetched = window.StorageService.getHistory().find(h => h.id === 'test-wf-001');
assert(fetched && fetched.status === 'approved' && fetched.reviewer === 'Jane Doe', 'Reviewer successfully approved and stamped draft');

console.log(`\n=== AUDIT SUMMARY: ${passed} PASSED, ${failed} FAILED ===\n`);
if (failed > 0) process.exit(1);
