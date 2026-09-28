import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const browser = process.argv[2] ?? 'unknown browser';
const reportPath = resolve('test-results/results.json');
const summaryPath = resolve('test-results/business-summary.md');

function writeSummary(markdown) {
  mkdirSync(dirname(summaryPath), { recursive: true });
  writeFileSync(summaryPath, markdown);

  const githubSummary = process.env.GITHUB_STEP_SUMMARY;
  if (githubSummary) {
    appendFileSync(githubSummary, `${markdown}\n`);
  }
}

if (!existsSync(reportPath)) {
  writeSummary(
    `# Release readiness — ${browser}\n\n**Decision: NOT READY**\n\nNo JSON test result was produced. Review the workflow logs before release.\n`,
  );
  process.exit(0);
}

const report = JSON.parse(readFileSync(reportPath, 'utf8'));
const stats = report.stats ?? {};
const passed = Number(stats.expected ?? 0);
const failed = Number(stats.unexpected ?? 0);
const flaky = Number(stats.flaky ?? 0);
const skipped = Number(stats.skipped ?? 0);
const total = passed + failed + flaky + skipped;
const durationSeconds = (Number(stats.duration ?? 0) / 1000).toFixed(1);
const ready = total > 0 && failed === 0 && flaky === 0;
const decision = ready ? 'READY' : 'NOT READY';
const icon = ready ? '✅' : '❌';

const markdown = `# ${icon} Release readiness — ${browser}

**Decision: ${decision}**

| Measure | Result |
| --- | ---: |
| Total scenarios | ${total} |
| Passed as expected | ${passed} |
| Unexpected failures | ${failed} |
| Flaky | ${flaky} |
| Skipped | ${skipped} |
| Duration | ${durationSeconds}s |

Release gate: at least one scenario executed, with zero unexpected failures and zero flaky scenarios.

Business coverage: customer access, product discovery, cart integrity, checkout completion and session control.
`;

writeSummary(markdown);
console.log(`Business release summary written to ${summaryPath}`);
