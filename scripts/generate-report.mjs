import { access, mkdir, rm } from 'node:fs/promises';
import { constants } from 'node:fs';
import { platform, release } from 'node:os';
import { generate } from 'multiple-cucumber-html-reporter';

const jsonDir = './reports';
const reportPath = './reports/html';
const cucumberJson = `${jsonDir}/cucumber-report.json`;

try {
  await access(cucumberJson, constants.R_OK);
} catch {
  console.error(
    'Cucumber JSON report was not found. Run the test suite before generating the HTML report.',
  );
  process.exit(1);
}

await rm(reportPath, { recursive: true, force: true });
await mkdir(reportPath, { recursive: true });

generate({
  jsonDir,
  reportPath,
  openReportInBrowser: false,
  displayDuration: true,
  displayReportTime: true,
  metadata: {
    browser: {
      name: process.env.BROWSER ?? 'chromium',
      version: 'Playwright',
    },
    device: 'Local Test Machine',
    platform: {
      name: platform(),
      version: release(),
    },
  },
  customData: {
    title: 'Automation Execution Summary',
    data: [
      { label: 'Project', value: 'Playwright + Cucumber' },
      { label: 'Framework', value: 'TypeScript' },
      { label: 'Environment', value: process.env.NODE_ENV ?? 'local' },
      { label: 'Node.js', value: process.version },
    ],
  },
});
