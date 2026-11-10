import { request, type APIRequestContext } from 'playwright/test';

export class ApiClient {
  private context: APIRequestContext | undefined;

  async start(baseURL: string): Promise<void> {
    this.context = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Accept: 'application/json',
      },
    });
  }

  async get<T>(path: string): Promise<T> {
    if (!this.context) {
      throw new Error('API client has not been started.');
    }

    const response = await this.context.get(path);
    if (!response.ok()) {
      throw new Error(`GET ${path} failed with HTTP ${response.status()}.`);
    }

    return (await response.json()) as T;
  }

  async dispose(): Promise<void> {
    await this.context?.dispose();
    this.context = undefined;
  }
}
