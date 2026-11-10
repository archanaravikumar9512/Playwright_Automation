export interface NewPost { title: string; body: string; userId: number; }

export function buildPost(overrides: Partial<NewPost> = {}): NewPost {
  return {
    title: `Automation test ${Date.now()}`,
    body: 'Created by the Playwright Cucumber API suite.',
    userId: 1,
    ...overrides,
  };
}
