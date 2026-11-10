import { After, Before, BeforeAll, AfterAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit, type Browser, type BrowserType } from 'playwright';
import { ApiClient } from '../../src/api/api-client.js';
import { getEnvironment } from '../../src/config/environment.js';
import { HomePage } from '../../src/pages/home.page.js';
import { LoginPage } from '../../src/pages/login.page.js';
import type { CustomWorld } from './world.js';

setDefaultTimeout(30_000);

let browser: Browser | undefined;

function getBrowserType(): BrowserType {
  const { browser: browserName } = getEnvironment();

  switch (browserName) {
    case 'firefox':
      return firefox;
    case 'webkit':
      return webkit;
    default:
      return chromium;
  }
}

BeforeAll(async () => {
  const { headless } = getEnvironment();
  browser = await getBrowserType().launch({ headless });
});

Before(async function (this: CustomWorld) {
  if (!browser) {
    throw new Error('Browser was not initialized.');
  }

  const environment = getEnvironment();

  this.context = await browser.newContext({
    baseURL: environment.baseUrl,
  });
  this.page = await this.context.newPage();
  this.homePage = new HomePage(this.page);
  this.loginPage = new LoginPage(this.page);

  this.api = new ApiClient();
  await this.api.start(environment.baseUrl);
});

After(async function (this: CustomWorld, scenario) {
  try {
    if (scenario.result?.status === Status.FAILED && this.page && !this.page.isClosed()) {
      const screenshot = await this.page.screenshot({ fullPage: true });
      this.attach(screenshot, 'image/png');
    }
  } finally {
    try {
      await this.api?.dispose();
    } finally {
      await this.context?.close();
    }
  }
});

AfterAll(async () => {
  await browser?.close();
});
