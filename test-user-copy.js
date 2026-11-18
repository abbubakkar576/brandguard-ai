const fs = require('fs');
const vm = require('vm');

const window = {};
vm.runInNewContext(fs.readFileSync('js/data/defaultGuidelines.js', 'utf8'), { window });
vm.runInNewContext(fs.readFileSync('js/services/ruleEngine.js', 'utf8'), { window });

const testText = "Our product is the best in the world. We guarantee 100% security and perfect results for every customer. Buy now and never worry about any problem again.";

console.log("=================================================");
console.log("  EXACT USER TEST COPY VERIFICATION");
console.log("=================================================\n");
console.log("Input Text:\n\"" + testText + "\"\n");

const result = window.RuleEngine.analyze(testText, "social", window.defaultGuidelines);

console.log(`Compliance Score: ${result.brandScore} / 100`);
console.log(`Score Tier: ${result.scoreTier}`);
console.log(`Explanation: ${result.scoreExplanation}\n`);

console.log(`Critical Violations: ${result.counts.critical}`);
console.log(`Warning Violations:  ${result.counts.warning}`);
console.log(`Suggestions:         ${result.counts.suggestion}`);
console.log(`Total Issues:        ${result.issues.length}\n`);

console.log("Category Scores:");
Object.entries(result.categoryScores).forEach(([cat, val]) => {
  console.log(`  - ${cat.padEnd(14)}: ${val}%`);
});

console.log("\nDetailed Issues Flagged:");
result.issues.forEach((iss, index) => {
  console.log(`\n[Issue ${index + 1}]`);
  console.log(`  Title:      ${iss.title}`);
  console.log(`  Severity:   ${iss.severity.toUpperCase()}`);
  console.log(`  Category:   ${iss.category}`);
  console.log(`  Snippet:    "${iss.originalText}"`);
  console.log(`  Reason:     ${iss.reason}`);
  console.log(`  Rule:       ${iss.guidelineViolated}`);
  console.log(`  Suggestion: "${iss.suggestedCorrection}"`);
});

// Assertions
if (result.brandScore === 100) {
  throw new Error("FAILED: Score is still 100/100!");
}
if (result.issues.length < 4) {
  throw new Error(`FAILED: Expected at least 4 issues, got ${result.issues.length}`);
}

// Remediation Test
console.log("\n=================================================");
console.log("  TESTING CORRECTION APPLICATION & RE-ANALYSIS");
console.log("=================================================");

let remediated = testText;
result.issues.forEach(iss => {
  if (iss.suggestedCorrection && remediated.includes(iss.originalText)) {
    remediated = remediated.replace(iss.originalText, iss.suggestedCorrection);
  }
});

console.log("\nRemediated Text:\n\"" + remediated + "\"\n");

const recheck = window.RuleEngine.analyze(remediated, "social", window.defaultGuidelines);
console.log(`Re-analysis Brand Score: ${recheck.brandScore} / 100`);
console.log(`Re-analysis Score Tier:  ${recheck.scoreTier}`);
console.log(`Remaining Issues:        ${recheck.issues.length}`);

if (recheck.brandScore < 90) {
  throw new Error(`FAILED: Remediated score ${recheck.brandScore} is not compliant!`);
}

console.log("\n✅ ALL CHECKS PASSED SUCCESSFULLY!");
