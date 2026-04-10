import { builder } from '@builder.io/sdk';

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

/** Must match the Builder “model” name (default in Builder is often `page`). */
export const BUILDER_PAGE_MODEL =
  process.env.NEXT_PUBLIC_BUILDER_MODEL ?? 'page';

if (apiKey) {
  builder.init(apiKey);
}

function normalizePath(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Loads one entry for URL targeting. In development we also request drafts
 * (`includeUnpublished`), which fixes “empty page” when the entry is saved but not published.
 */
export async function fetchBuilderPage(urlPath: string) {
  if (!apiKey) {
    return null;
  }

  const path = normalizePath(urlPath);
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  const url = base ? `${base}${path}` : path;

  return builder
    .get(BUILDER_PAGE_MODEL, {
      url,
      userAttributes: {
        urlPath: path,
      },
      ...(process.env.NODE_ENV === 'development' && {
        includeUnpublished: true,
        cachebust: true,
      }),
    })
    .toPromise();
}
