import { Given, When, Then } from '@cucumber/cucumber';
import { getEnvironment } from '../../src/config/environment.js';
import type { CustomWorld } from '../support/world.js';

Given('I am on the sign-in page', async function (this: CustomWorld) {
  if (!this.loginPage) {
    throw new Error('LoginPage is not initialized.');
  }

  await this.loginPage.goto();
});

When('I sign in with valid credentials', async function (this: CustomWorld) {
  const environment = getEnvironment();

  if (!this.loginPage) {
    throw new Error('LoginPage is not initialized.');
  }

  await this.loginPage.signIn(environment.username, environment.password);
});

When('I sign in with an invalid password', async function (this: CustomWorld) {
  const environment = getEnvironment();

  if (!this.loginPage) {
    throw new Error('LoginPage is not initialized.');
  }

  await this.loginPage.signIn(environment.username, 'incorrect-password');
});

Then('I should see the welcome page', async function (this: CustomWorld) {
  if (!this.loginPage) {
    throw new Error('LoginPage is not initialized.');
  }

  await this.loginPage.expectWelcome();
});

Then('I should see the login error {string}', async function (this: CustomWorld, message: string) {
  if (!this.loginPage) {
    throw new Error('LoginPage is not initialized.');
  }

  await this.loginPage.expectLoginError(message);
});
