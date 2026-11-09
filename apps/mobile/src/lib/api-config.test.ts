import { resolveApiUrl } from './api-config';

describe('resolveApiUrl', () => {
  test('allows the local default in development only', () => {
    expect(resolveApiUrl(undefined, true)).toBe('http://localhost:3000');
    expect(() => resolveApiUrl(undefined, false)).toThrow(/required outside development/);
  });

  test('requires an absolute HTTPS endpoint', () => {
    expect(resolveApiUrl('https://api.example.test/', false)).toBe('https://api.example.test');
    expect(() => resolveApiUrl('http://api.example.test', true)).toThrow(/must be HTTPS/);
    expect(() => resolveApiUrl('not-a-url', false)).toThrow(/absolute URL/);
  });

  test('rejects credentials and localhost endpoints', () => {
    expect(() => resolveApiUrl('https://user:pass@api.example.test', false)).toThrow(/must be HTTPS/);
    expect(() => resolveApiUrl('https://localhost:3000', false)).toThrow(/must be HTTPS/);
  });
});
