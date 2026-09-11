import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * Tag manager loader.
 *
 * The container id lives in the Cloudflare Pages secret GTM_ID, not in the
 * repository or in any HTML — ten pages are prerendered and have no runtime to
 * read it, so every page asks this Worker route for it instead.
 *
 * It is not hidden from visitors, and cannot be: the browser has to put the id
 * in the googletagmanager.com request. What this buys is that the id is managed
 * in Cloudflare and never committed, and that preview deployments and local dev
 * (which have no GTM_ID) load nothing and stay out of the analytics.
 */
const ID_SHAPE = /^GTM-[A-Z0-9]{4,12}$/;

export const GET: APIRoute = async ({ locals }) => {
  const id = String((locals as any).runtime?.env?.GTM_ID ?? '').trim();

  const body = ID_SHAPE.test(id)
    ? `(function(w,d,i){w.dataLayer=w.dataLayer||[];w.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});` +
      `var s=d.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id='+i;` +
      `d.head.appendChild(s);})(window,document,${JSON.stringify(id)});`
    : '/* tag manager not configured for this environment */';

  return new Response(body, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      // An hour, so a changed id reaches everyone within one without a deploy.
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex'
    }
  });
};
