/**
 * Resolves static media/asset paths.
 * In AI Studio preview: returns the root relative path (e.g. /portfolio/demo.webp).
 * In WordPress production (eferz.com): prefixes with window.__EFERZ_THEME_URI__
 * (e.g. https://eferz.com/wp-content/themes/EFerz-Website/portfolio/demo.webp).
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const themeUri =
    typeof window !== 'undefined'
      ? (window as unknown as { __EFERZ_THEME_URI__?: string }).__EFERZ_THEME_URI__
      : '';

  if (themeUri) {
    const cleanThemeUri = themeUri.replace(/\/+$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanThemeUri}${cleanPath}`;
  }

  return path;
}
