export default {
  paths: ['features/**/*.feature'],
  import: ['dist/features/support/**/*.js', 'dist/features/step-definitions/**/*.js'],
  format: ['progress-bar', 'json:reports/cucumber-report.json'],
  formatOptions: {
    snippetInterface: 'async-await',
  },
  publishQuiet: true,
  worldParameters: {
    baseUrl: process.env.BASE_URL ?? 'http://127.0.0.1:4173',
  },
  retry: process.env.CI ? 1 : 0,
  parallel: Number(process.env.CUCUMBER_PARALLEL ?? 1),
};
