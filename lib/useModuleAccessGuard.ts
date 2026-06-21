import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { fetchCurrentUser, getAuthUser, getValidAuthTokens } from './api';
import { getPostAuthRoute, isRouteAllowedForPlan } from './access';

export function useModuleAccessGuard(routePath: string) {
  const router = useRouter();
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let hasGrantedAccessFromCache = false;

    const guard = async () => {
      const applyAccess = async (user: Awaited<ReturnType<typeof getAuthUser>>) => {
        if (!user) {
          return false;
        }

        if (!isRouteAllowedForPlan(routePath, user)) {
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
          router.replace('/login');
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

        if (!isRouteAllowedForPlan(routePath, user)) {
          router.replace(getPostAuthRoute(user));
          return;
        }
      } catch {
        if (!cancelled) {
          if (hasGrantedAccessFromCache) {
            setCheckingAccess(false);
            return;
          }

          router.replace('/login');
          return;
        }
      } finally {
        if (!cancelled) {
          setCheckingAccess(false);
        }
      }
    };

    void guard();

    return () => {
      cancelled = true;
    };
  }, [routePath, router]);

  return checkingAccess;
}
