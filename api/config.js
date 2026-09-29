import { cors } from './_lib/unlock.js';
import { getPublicPricing, getPublicMetaPixel } from './_lib/site-settings.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ ok: false });

  const pricing = await getPublicPricing();
  const metaPixel = await getPublicMetaPixel();

  return res.status(200).json({
    ok: true,
    turnstileSiteKey: (process.env.CF_TURNSTILE_SITE_KEY || '').trim(),
    pricing,
    landingVariant: pricing.landingVariant || 1,
    metaPixel,
  });
}
