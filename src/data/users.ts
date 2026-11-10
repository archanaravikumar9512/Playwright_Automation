export interface UserCredentials { username: string; password: string; expected: 'success' | 'failure'; }

export const userScenarios: Record<string, UserCredentials> = {
  valid: { username: 'test.user@example.com', password: 'ChangeMe', expected: 'success' },
  invalidPassword: { username: 'test.user@example.com', password: 'incorrect-password', expected: 'failure' },
  unknownUser: { username: 'unknown@example.com', password: 'ChangeMe', expected: 'failure' },
};
