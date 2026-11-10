export type BrowserName = 'chromium' | 'firefox' | 'webkit';

export interface TestEnvironment {
  baseUrl: string;
  username: string;
  password: string;
  browser: BrowserName;
  headless: boolean;
}

function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) {
    return defaultValue;
  }

  return value.toLowerCase() !== 'false';
}

function parseBrowser(value: string | undefined): BrowserName {
  if (value === 'firefox' || value === 'webkit' || value === 'chromium') {
    return value;
  }

  return 'chromium';
}

export function getEnvironment(): TestEnvironment {
  return {
    baseUrl: process.env.BASE_URL ?? 'http://127.0.0.1:4173',
    username: process.env.E2E_USERNAME ?? 'test.user@example.com',
    password: process.env.E2E_PASSWORD ?? 'ChangeMe',
    browser: parseBrowser(process.env.BROWSER),
    headless: parseBoolean(process.env.HEADLESS, true),
  };
}
