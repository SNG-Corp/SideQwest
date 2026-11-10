import type { ExpoConfig, ConfigContext } from 'expo/config';

const DEVELOPMENT_API_URL = 'http://localhost:3000';

export default ({ config }: ConfigContext): ExpoConfig => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction && !apiUrl) {
    throw new Error('EXPO_PUBLIC_API_URL is required for production mobile builds.');
  }
  if (apiUrl) {
    let parsed: URL;
    try {
      parsed = new URL(apiUrl);
    } catch {
      throw new Error('EXPO_PUBLIC_API_URL must be an absolute URL.');
    }
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.hostname === 'localhost') {
      throw new Error('EXPO_PUBLIC_API_URL must be an HTTPS URL without embedded credentials or localhost.');
    }
  }

  return {
    ...config,
    extra: {
      ...config.extra,
      ...(apiUrl ? { apiUrl } : !isProduction ? { apiUrl: DEVELOPMENT_API_URL } : {}),
    },
    ios: {
      ...config.ios,
      buildNumber: process.env.IOS_BUILD_NUMBER ?? config.ios?.buildNumber ?? '1',
    },
    android: {
      ...config.android,
      versionCode: Number(process.env.ANDROID_VERSION_CODE ?? config.android?.versionCode ?? 1),
    },
  };
};
