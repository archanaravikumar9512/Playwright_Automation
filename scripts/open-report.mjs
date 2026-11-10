import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { execFile } from 'node:child_process';
import { platform } from 'node:process';

const report = 'reports/html/index.html';

try {
  await access(report, constants.R_OK);
} catch {
  console.error('HTML report not found. Run "npm run report:generate" first.');
  process.exit(1);
}

if (platform === 'win32') {
  execFile('cmd', ['/c', 'start', '', report]);
} else if (platform === 'darwin') {
  execFile('open', [report]);
} else {
  execFile('xdg-open', [report]);
}
