import React, { useEffect, useState } from 'react';
import { Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { Colors } from '../constants/Colors';
import { fetchCurrentUser, getAuthUser, getValidAuthTokens, setAuthFailureHandler } from '../lib/api';
import { getPostAuthRoute, isPublicRoute, isRouteAllowedForPlan } from '../lib/access';

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    setAuthFailureHandler(() => {
      router.replace('/login');
    });

    return () => {
      setAuthFailureHandler(null);
    };
  }, [router]);

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }

    let cancelled = false;
    let hasGrantedAccessFromCache = false;

    const guard = async () => {
      const applyAccess = async (user: Awaited<ReturnType<typeof getAuthUser>>) => {
        if (!user) {
          return false;
        }

        if (isPublicRoute(pathname)) {
          router.replace(getPostAuthRoute(user));
          return true;
        }

        if (!isRouteAllowedForPlan(pathname, user)) {
          router.replace(getPostAuthRoute(user));
          return true;
        }

        hasGrantedAccessFromCache = true;
        setCheckingAccess(false);
        return false;
      };

      try {
        const tokens = await getValidAuthTokens();
        if (cancelled) {
          return;
        }

        if (!tokens) {
          if (!isPublicRoute(pathname)) {
            router.replace('/login');
          }
          setCheckingAccess(false);
          return;
        }

        const cachedUser = await getAuthUser();
        if (cancelled) {
          return;
        }

        if (await applyAccess(cachedUser)) {
          return;
        }

        if (cachedUser) {
          return;
        }

        const user = await fetchCurrentUser();
        if (cancelled) {
          return;
        }

        if (isPublicRoute(pathname)) {
          router.replace(getPostAuthRoute(user));
          return;
        }

        if (!isRouteAllowedForPlan(pathname, user)) {
          router.replace(getPostAuthRoute(user));
          return;
        }
        setCheckingAccess(false);
      } catch {
        if (cancelled) {
          return;
        }

        if (hasGrantedAccessFromCache) {
          setCheckingAccess(false);
          return;
        }

        if (!isPublicRoute(pathname)) {
          router.replace('/login');
        }

        setCheckingAccess(false);
      }
    };

    void guard();

    return () => {
      cancelled = true;
    };
  }, [fontsLoaded, pathname, router]);

  if (!fontsLoaded || checkingAccess) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'none',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
