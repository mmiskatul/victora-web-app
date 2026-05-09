import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

function decodeJwtPayload(token: string): { exp?: number } | null {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    if (typeof globalThis.atob !== 'function') {
      return null;
    }

    const json = globalThis.atob(padded);
    return JSON.parse(json) as { exp?: number };
  } catch {
    return null;
  }
}

function isJwtExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) {
    return true;
  }

  return payload.exp * 1000 <= Date.now();
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

  if (tokens) {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
  } else {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
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

  const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
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

async function refreshWithSessionToken(sessionToken: string): Promise<AuthTokens | null> {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ session_token: sessionToken }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as AuthResponse;
  return {
    access_token: data.access_token,
    session_token: data.session_token,
  };
}

export async function getValidAuthTokens() {
  await ensureAuthTokensLoaded();

  if (!authTokens) {
    return null;
  }

  if (authTokens.access_token && !isJwtExpired(authTokens.access_token)) {
    return authTokens;
  }

  if (!authTokens.session_token || isJwtExpired(authTokens.session_token)) {
    await clearAuthTokens();
    return null;
  }

  const refreshed = await refreshWithSessionToken(authTokens.session_token);
  if (!refreshed) {
    await clearAuthTokens();
    return null;
  }

  await setAuthTokens(refreshed);
  return refreshed;
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
