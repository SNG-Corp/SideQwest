import { secureApiUrl } from './api-config';

describe('secure API origin configuration', () => {
  test('accepts a configured HTTPS origin', () => {
    expect(secureApiUrl('https://api.sidequest.co.ke/')).toBe('https://api.sidequest.co.ke');
  });

  test.each([
    undefined,
    'http://api.sidequest.co.ke',
    'https://localhost:3000',
    'https://127.0.0.1:3000',
    'https://[::1]:3000',
    'https://service.localhost',
    'https://user:password@api.sidequest.co.ke',
    'https://api.sidequest.co.ke/v1',
    'https://api.sidequest.co.ke?debug=true',
  ])('rejects invalid API origin %s', (url) => {
    expect(() => secureApiUrl(url)).toThrow();
  });
});
