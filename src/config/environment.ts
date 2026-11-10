import { existsSync } from 'node:fs';

// Load local .env for developer runs. CI should inject environment variables/secrets.
if (existsSync('.env')) process.loadEnvFile('.env');

export type BrowserName = 'chromium' | 'firefox' | 'webkit';
export type EnvironmentName = 'local' | 'qa' | 'staging';

export interface TestEnvironment {
  name: EnvironmentName;
  baseUrl: string;
  apiBaseUrl: string;
  username: string;
  password: string;
  apiToken?: string;
  browser: BrowserName;
  headless: boolean;
}

function requiredUrl(name: string, value: string | undefined, fallback: string): string {
  const candidate = value?.trim() || fallback;
  try { new URL(candidate); } catch { throw new Error(`${name} must be a valid absolute URL.`); }
  return candidate.replace(/\/$/, '');
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  if (!['true', 'false'].includes(value.toLowerCase())) throw new Error('HEADLESS must be true or false.');
  return value.toLowerCase() === 'true';
}

export function getEnvironment(): TestEnvironment {
  const name = (process.env.TEST_ENV ?? 'local') as EnvironmentName;
  if (!['local', 'qa', 'staging'].includes(name)) throw new Error(`Unsupported TEST_ENV: ${name}`);
  const browser = process.env.BROWSER ?? 'chromium';
  if (!['chromium', 'firefox', 'webkit'].includes(browser)) throw new Error(`Unsupported BROWSER: ${browser}`);
  const baseUrl = requiredUrl('BASE_URL', process.env.BASE_URL, 'http://127.0.0.1:4173');
  const apiBaseUrl = requiredUrl('API_BASE_URL', process.env.API_BASE_URL, 'https://jsonplaceholder.typicode.com');
  const username = process.env.E2E_USERNAME ?? 'test.user@example.com';
  const password = process.env.E2E_PASSWORD ?? 'ChangeMe';
  if (name !== 'local' && (!process.env.E2E_USERNAME || !process.env.E2E_PASSWORD)) {
    throw new Error('E2E_USERNAME and E2E_PASSWORD must be provided for QA/staging environments.');
  }
  return {
    name, baseUrl, apiBaseUrl, username, password,
    ...(process.env.API_TOKEN ? { apiToken: process.env.API_TOKEN } : {}),
    browser: browser as BrowserName,
    headless: parseBoolean(process.env.HEADLESS, true),
  };
}
