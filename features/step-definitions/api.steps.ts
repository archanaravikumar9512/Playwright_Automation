import { When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { buildPost } from '../../src/factories/post.factory.js';
import type { CustomWorld } from '../support/world.js';

When('I request public API resource {string}', async function (this: CustomWorld, path: string) {
  if (!this.api) throw new Error('API client is not initialized.');
  this.apiResult = await this.api.get<unknown>(path);
});

When('I create a public API post', async function (this: CustomWorld) {
  if (!this.api) throw new Error('API client is not initialized.');
  this.apiResult = await this.api.post<unknown>(
    '/posts',
    buildPost({ title: 'Automation API contract check' }),
  );
});

Then('the API response status should be {int}', function (this: CustomWorld, status: number) {
  expect(this.apiResult?.status).toBe(status);
});

Then(
  'the API response should contain field {string} with value {string}',
  function (this: CustomWorld, field: string, value: string) {
    const body = this.apiResult?.body;
    expect(body).toBeTruthy();
    expect(String((body as Record<string, unknown>)[field])).toBe(value);
  },
);
