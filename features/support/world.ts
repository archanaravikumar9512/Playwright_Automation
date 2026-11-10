import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import type { BrowserContext, Page } from 'playwright';
import type { ApiClient, ApiResult } from '../../src/api/api-client.js';
import type { HomePage } from '../../src/pages/home.page.js';
import type { LoginPage } from '../../src/pages/login.page.js';

export interface WorldParameters {
  baseUrl: string;
}

export class CustomWorld extends World<WorldParameters> {
  context?: BrowserContext;
  page?: Page;
  api?: ApiClient;
  homePage?: HomePage;
  loginPage?: LoginPage;
  apiResult?: ApiResult<unknown>;

  constructor(options: IWorldOptions<WorldParameters>) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
