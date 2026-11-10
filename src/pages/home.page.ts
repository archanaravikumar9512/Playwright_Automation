import { expect, type Page } from 'playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  private get heading() {
    return this.page.getByRole('heading', { name: 'Quality-first demo application' });
  }

  private get searchInput() {
    return this.page.getByLabel('Search products');
  }

  private get searchButton() {
    return this.page.getByRole('button', { name: 'Search' });
  }

  private get results() {
    return this.page.getByTestId('search-results');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async searchFor(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async expectSearchResult(name: string): Promise<void> {
    await expect(this.results.getByText(name, { exact: true })).toBeVisible();
  }
}
