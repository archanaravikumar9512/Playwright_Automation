import { expect, type Page } from 'playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private get emailInput() {
    return this.page.getByLabel('Email');
  }

  private get passwordInput() {
    return this.page.getByLabel('Password');
  }

  private get signInButton() {
    return this.page.getByRole('button', { name: 'Sign in' });
  }

  private get errorMessage() {
    return this.page.getByRole('alert');
  }

  async goto(): Promise<void> {
    await this.page.goto('/login.html');
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectWelcome(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  }
}
