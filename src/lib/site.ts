/**
 * Single source of truth for the site's identity.
 *
 * The domain and brand name used to be typed out in ~250 places across 44
 * files, which is why moving off runthisgame.com touched the whole codebase.
 * New code must read from here so the next change is one line.
 */
export const SITE_DOMAIN = 'pcgamefit.com';
export const SITE_URL = `https://${SITE_DOMAIN}`;

/** Brand, one word — used in titles, schema and the footer. */
export const SITE_NAME = 'PCGameFit';
/** Brand, spaced — used in running prose. */
export const SITE_NAME_SPACED = 'PC Game Fit';

/** The logo renders the first segment in bold. */
export const SITE_NAME_PARTS = { bold: 'PCGame', rest: 'Fit' } as const;

export const CONTACT_EMAIL = `hello@${SITE_DOMAIN}`;

/** Absolute URL for a site-relative path, for canonicals and schema. */
export const absUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
