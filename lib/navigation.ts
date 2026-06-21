export const blurActiveElement = () => {
  if (typeof document === 'undefined') {
    return;
  }

  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLElement) {
    activeElement.blur();
  }
};

type RouterLike = {
  replace: (href: string) => void;
  push?: (href: string) => void;
  back?: () => void;
};

export const replaceRoute = (router: RouterLike, href: string) => {
  blurActiveElement();
  router.replace(href);
};

export const pushRoute = (router: RouterLike, href: string) => {
  blurActiveElement();
  router.push?.(href);
};

export const goBackOrReplace = (router: RouterLike, fallbackHref: string) => {
  blurActiveElement();
  if (router.back) {
    router.back();
    return;
  }

  router.replace(fallbackHref);
};
