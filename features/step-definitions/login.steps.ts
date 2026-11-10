import { Given, When, Then } from '@cucumber/cucumber';
import { getEnvironment } from '../../src/config/environment.js';
import { userScenarios } from '../../src/data/users.js';
import type { CustomWorld } from '../support/world.js';

Given('I am on the sign-in page', async function (this: CustomWorld) {
  if (!this.loginPage) {
    throw new Error('LoginPage is not initialized.');
  }

  await this.loginPage.goto();
});

When('I sign in with valid credentials', async function (this: CustomWorld) {
  if (!this.loginPage) {
    throw new Error('LoginPage is not initialized.');
  }

  const environment = getEnvironment();

  await this.loginPage.signIn(
    environment.username,
    environment.password
  );
});

When('I sign in with an invalid password', async function (this: CustomWorld) {
  if (!this.loginPage) {
    throw new Error('LoginPage is not initialized.');
  }

  const credentials = userScenarios.invalidPassword;

  if (!credentials) {
    throw new Error('Invalid password test data is missing.');
  }

  await this.loginPage.signIn(
    credentials.username,
    credentials.password
  );
});

Then('I should see the welcome page', async function (this: CustomWorld) {
  if (!this.loginPage) {
    throw new Error('LoginPage is not initialized.');
  }

  await this.loginPage.expectWelcome();
});

Then(
  'I should see the login error {string}',
  async function (this: CustomWorld, message: string) {
    if (!this.loginPage) {
      throw new Error('LoginPage is not initialized.');
    }

    await this.loginPage.expectLoginError(message);
  }
);