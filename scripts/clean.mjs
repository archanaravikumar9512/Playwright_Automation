import { rm } from 'node:fs/promises';

await Promise.all([
  rm('dist', { recursive: true, force: true }),
  rm('reports/cucumber-report.json', { force: true }),
  rm('reports/cucumber-report.html', { force: true }),
]);
