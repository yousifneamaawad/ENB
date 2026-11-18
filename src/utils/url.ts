/** Prefix a root-relative path (e.g. "/writing/") with Astro's configured base. */
export function withBase(path = '/'): string {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  if (!path || path === '/') return base;

  return `${base}${path.replace(/^\/+/, '')}`;
}
