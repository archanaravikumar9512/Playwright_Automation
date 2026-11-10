# Playwright + Cucumber Automation Framework

A TypeScript-based browser automation framework using **Playwright** and **Cucumber.js** with Gherkin feature files, Page Object Model, scenario-scoped test state, failure screenshots, and an HTML execution report.

## Technology

- Node.js 22.12+ or 24.x (Node 24 is the recommended default)
- TypeScript
- Playwright
- Cucumber.js
- Gherkin
- Page Object Model
- ESLint and Prettier
- `multiple-cucumber-html-reporter`

Cucumber is the test runner. Playwright is used for browser automation and assertions.

## Prerequisites

- Node.js 22.12+ or 24.x (Node 24 is recommended)
- npm 10 or later

Check your versions:

```bash
node --version
npm --version
```

## Install

```bash
npm ci
npm run install:browsers
```

For Linux CI environments:

```bash
npm run install:browsers:ci
```

## Configure the environment

Copy `.env.example` to `.env` and update the values if needed.

PowerShell:

```powershell
Copy-Item .env.example .env
```

The default configuration targets the included local demo application:

```text
BASE_URL=http://127.0.0.1:4173
E2E_USERNAME=test.user@example.com
E2E_PASSWORD=ChangeMe
BROWSER=chromium
HEADLESS=true
CUCUMBER_PARALLEL=1
```

Never commit `.env` or real credentials. `.env.example` contains placeholders only.

## Run the demo application

Open a terminal and start the local application:

```bash
npm run serve
```

Keep this terminal running. The demo application is available at `http://127.0.0.1:4173`.

## Run the tests

Open a second terminal in the project root:

```bash
npm test
```

The test command:

1. Removes previous build output and raw Cucumber JSON.
2. Compiles the TypeScript source into `dist/`.
3. Runs the Cucumber scenarios.
4. Writes the Cucumber JSON report to `reports/cucumber-report.json`.

### Other test commands

```bash
npm run test:headed
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:smoke
npm run test:regression
npm run test:parallel
npm run test:dry
```

The `test:headed` command opens the browser. Firefox and WebKit require their respective Playwright browsers to be installed.

## Generate and open the HTML report

After a test run:

```bash
npm run report
```

This generates the HTML dashboard at:

```text
reports/html/index.html
```

To generate without opening the browser:

```bash
npm run report:generate
```

To open an already generated report:

```bash
npm run report:open
```

The HTML dashboard in `reports/html/` is kept in the repository as a portfolio sample. It remains in place when tests start and is replaced when you generate a fresh report. The raw Cucumber JSON and `dist/` build output are generated locally and excluded from Git. Run the tests and then `npm run report` to refresh the dashboard.

## Project structure

```text
.
├── demo-app/
│   ├── index.html
│   └── login.html
├── features/
│   ├── authentication/
│   │   └── login.feature
│   ├── search/
│   │   └── search.feature
│   ├── step-definitions/
│   │   ├── login.steps.ts
│   │   └── search.steps.ts
│   └── support/
│       ├── hooks.ts
│       └── world.ts
├── reports/
│   └── html/                  # Generated HTML dashboard (portfolio artifact)
├── scripts/
│   ├── clean.mjs
│   ├── generate-report.mjs
│   ├── open-report.mjs
│   └── serve.mjs
├── src/
│   ├── api/
│   │   └── api-client.ts
│   ├── config/
│   │   └── environment.ts
│   └── pages/
│       ├── home.page.ts
│       └── login.page.ts
├── .env.example
├── .gitignore
├── cucumber.mjs
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── .nvmrc
```

## Framework design

```text
Gherkin feature
      |
      v
Step definition
      |
      v
Page Object / API client
      |
      v
Playwright
      |
      v
Browser
```

- **Features:** Describe business behavior in Gherkin.
- **Step definitions:** Map Gherkin steps to reusable actions.
- **Page Objects:** Encapsulate locators and page interactions.
- **Custom World:** Holds scenario-scoped page, context, API client, and page objects.
- **Hooks:** Manage browser lifecycle, cleanup, and failure screenshots.
- **API client:** Provides reusable API request support.

A fresh browser context is created for each scenario. Failed scenarios attach a full-page PNG screenshot to the Cucumber result, which is included in the JSON input used to generate the HTML report.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run format:check
npm run verify
```

## Useful scripts

| Command                   | Purpose                                     |
| ------------------------- | ------------------------------------------- |
| `npm run serve`           | Start the local demo application            |
| `npm test`                | Build and execute all Cucumber scenarios    |
| `npm run report`          | Generate and open the HTML report           |
| `npm run report:generate` | Generate the HTML report only               |
| `npm run report:open`     | Open the existing HTML report               |
| `npm run verify`          | Run type-check, lint, and formatting checks |

## Git hygiene

The repository excludes transient or machine-specific content:

- `node_modules/`
- `dist/`
- `reports/cucumber-report.json`
- `.env`
- Playwright authentication state

Commit `package.json` and `package-lock.json` together so other developers and CI can install the same dependency tree.
