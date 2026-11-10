import { request, type APIRequestContext, type APIResponse } from 'playwright/test';

export interface ApiResult<T> {
  status: number;
  headers: Record<string, string>;
  body: T;
}

export class ApiClient {
  private context: APIRequestContext | undefined;

  async start(baseURL: string, headers: Record<string, string> = {}): Promise<void> {
    await this.dispose();
    this.context = await request.newContext({
      baseURL,
      extraHTTPHeaders: { Accept: 'application/json', ...headers },
      timeout: 15_000,
    });
  }

  private get client(): APIRequestContext {
    if (!this.context) throw new Error('API client has not been started.');
    return this.context;
  }

  async get<T>(path: string): Promise<ApiResult<T>> {
    return this.send<T>(this.client.get(path));
  }

  async post<T>(path: string, data: unknown): Promise<ApiResult<T>> {
    return this.send<T>(this.client.post(path, { data }));
  }

  async put<T>(path: string, data: unknown): Promise<ApiResult<T>> {
    return this.send<T>(this.client.put(path, { data }));
  }

  async patch<T>(path: string, data: unknown): Promise<ApiResult<T>> {
    return this.send<T>(this.client.patch(path, { data }));
  }

  async delete<T>(path: string): Promise<ApiResult<T | null>> {
    const response = await this.client.delete(path);
    return this.parse<T | null>(response);
  }

  private async send<T>(responsePromise: Promise<APIResponse>): Promise<ApiResult<T>> {
    return this.parse<T>(await responsePromise);
  }

  private async parse<T>(response: APIResponse): Promise<ApiResult<T>> {
    const text = await response.text();
    let body: T;
    try {
      body = (text ? JSON.parse(text) : null) as T;
    } catch {
      throw new Error(`Expected JSON response but received: ${text.slice(0, 200)}`);
    }
    return { status: response.status(), headers: response.headers(), body };
  }

  async dispose(): Promise<void> {
    await this.context?.dispose();
    this.context = undefined;
  }
}
