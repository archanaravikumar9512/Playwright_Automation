import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world.js';

Given('I am on the home page', async function (this: CustomWorld) {
  if (!this.homePage) {
    throw new Error('HomePage is not initialized.');
  }

  await this.homePage.goto();
});

When('I search for {string}', async function (this: CustomWorld, term: string) {
  if (!this.homePage) {
    throw new Error('HomePage is not initialized.');
  }

  await this.homePage.searchFor(term);
});

Then('I should see the product {string}', async function (this: CustomWorld, product: string) {
  if (!this.homePage) {
    throw new Error('HomePage is not initialized.');
  }

  await this.homePage.expectSearchResult(product);
});
