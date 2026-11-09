export function secureApiUrl(configured: string | undefined): string {
  if (!configured) throw new Error('EXPO_PUBLIC_API_URL or expo.extra.apiUrl must configure the API origin');
  let url: URL;
  try { url = new URL(configured); } catch {
    throw new Error('The API origin must be a valid HTTPS URL');
  }
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash
    || host === 'localhost' || host.endsWith('.localhost') || host === '::1' || host === '0.0.0.0' || /^127\./.test(host)) {
    throw new Error('The API origin must be HTTPS and must not use a local host');
  }
  return url.origin;
}
