const DEVELOPMENT_API_URL = 'http://localhost:3000';

export function resolveApiUrl(configured: string | undefined, isDevelopment: boolean): string {
  const candidate = configured?.trim();
  if (!candidate) {
    if (isDevelopment) return DEVELOPMENT_API_URL;
    throw new Error('EXPO_PUBLIC_API_URL is required outside development.');
  }

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error('EXPO_PUBLIC_API_URL must be an absolute URL.');
  }

  if (url.protocol !== 'https:' || url.username || url.password || url.hostname === 'localhost') {
    throw new Error('EXPO_PUBLIC_API_URL must be HTTPS and must not contain credentials or use localhost.');
  }
  return url.toString().replace(/\/$/, '');
}
