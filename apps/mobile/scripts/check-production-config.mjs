import { readFileSync } from 'node:fs';

const config = JSON.parse(readFileSync(new URL('../app.json', import.meta.url), 'utf8')).expo;
const apiUrl = config.extra?.apiUrl;
if (typeof apiUrl !== 'string') throw new Error('expo.extra.apiUrl must be configured');

const parsed = new URL(apiUrl);
if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.pathname !== '/' || parsed.search || parsed.hash
  || ['localhost', '::1', '0.0.0.0'].includes(parsed.hostname.toLowerCase())
  || parsed.hostname.toLowerCase().endsWith('.localhost') || /^127\./.test(parsed.hostname)) {
  throw new Error('Production API origin must be HTTPS and must not use a local host');
}
if (config.ios?.infoPlist?.NSAppTransportSecurity?.NSAllowsArbitraryLoads !== false) {
  throw new Error('iOS must explicitly disallow arbitrary non-HTTPS loads');
}
if (config.android?.usesCleartextTraffic !== false) {
  throw new Error('Android must explicitly disallow cleartext traffic');
}
