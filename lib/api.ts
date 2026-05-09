import { Platform } from 'react-native';

declare const process: {
  env?: Record<string, string | undefined>;
};

const RAW_API_URL = process.env?.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000';

function resolveApiUrl(url: string): string {
  if (Platform.OS !== 'android') {
    return url;
  }

  if (url.includes('://127.0.0.1') || url.includes('://localhost')) {
    return url.replace('://127.0.0.1', '://10.0.2.2').replace('://localhost', '://10.0.2.2');
  }

  return url;
}

const API_URL = resolveApiUrl(RAW_API_URL);

type RequestOptions = {
  method?: string;
  body?: unknown;
};

type AuthTokens = {
  access_token: string;
  session_token: string;
};

const AUTH_STORAGE_KEY = 'victory-auth-tokens';

let authTokens: AuthTokens | null = null;
let authTokensLoaded = false;
let authTokensLoadPromise: Promise<void> | null = null;
let secureStoreModule: typeof import('expo-secure-store') | null = null;

async function getSecureStore() {
  if (Platform.OS === 'web') {
    return null;
  }

  if (!secureStoreModule) {
    secureStoreModule = await import('expo-secure-store');
  }

  return secureStoreModule;
}

async function persistAuthTokens(tokens: AuthTokens | null) {
  if (Platform.OS === 'web') {
    if (typeof window === 'undefined') {
      return;
    }

    if (tokens) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    return;
  }

  const secureStore = await getSecureStore();
  if (!secureStore) {
    return;
  }

  if (tokens) {
    await secureStore.setItemAsync(AUTH_STORAGE_KEY, JSON.stringify(tokens));
  } else {
    await secureStore.deleteItemAsync(AUTH_STORAGE_KEY);
  }
}

async function loadPersistedAuthTokens(): Promise<AuthTokens | null> {
  if (Platform.OS === 'web') {
    if (typeof window === 'undefined') {
      return null;
    }

    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthTokens) : null;
  }

  const secureStore = await getSecureStore();
  if (!secureStore) {
    return null;
  }

  const raw = await secureStore.getItemAsync(AUTH_STORAGE_KEY);
  return raw ? (JSON.parse(raw) as AuthTokens) : null;
}

async function ensureAuthTokensLoaded() {
  if (authTokensLoaded) {
    return;
  }

  if (!authTokensLoadPromise) {
    authTokensLoadPromise = loadPersistedAuthTokens()
      .then((stored) => {
        authTokens = stored;
        authTokensLoaded = true;
      })
      .finally(() => {
        authTokensLoadPromise = null;
      });
  }

  await authTokensLoadPromise;
}

export async function setAuthTokens(tokens: AuthTokens) {
  authTokens = tokens;
  authTokensLoaded = true;
  await persistAuthTokens(tokens);
}

export async function clearAuthTokens() {
  authTokens = null;
  authTokensLoaded = true;
  await persistAuthTokens(null);
}

export async function getAuthTokens() {
  await ensureAuthTokensLoaded();
  return authTokens;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
  retryOnUnauthorized = true
): Promise<T> {
  await ensureAuthTokensLoaded();

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (authTokens?.access_token) {
    headers.Authorization = `Bearer ${authTokens.access_token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    credentials: 'include',
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401 && retryOnUnauthorized && authTokens?.session_token) {
    const refreshed = await apiRequest<AuthResponse>(
      '/auth/refresh',
      {
        method: 'POST',
        body: { session_token: authTokens.session_token },
      },
      false
    );
    await setAuthTokens(refreshed);
    return apiRequest<T>(path, options, false);
  }

  if (!response.ok) {
    throw new Error(data.detail || 'Request failed');
  }

  return data as T;
}

export type AuthResponse = {
  access_token: string;
  session_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: string;
    name: string;
    email: string;
    is_verified: boolean;
  };
};
