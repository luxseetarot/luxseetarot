/** Impostazioni commerciali + modello GPT (Upstash Redis o memoria). */

import { funnelStorageMode } from './funnel.js';

const SETTINGS_KEY = 'lux:site:settings';

const ALLOWED_GPT_MODELS = [
  'gpt-4.1-nano',
  'gpt-4.1-mini',
  'gpt-4.1',
  'gpt-4o-mini',
  'gpt-4o',
  'o4-mini',
  'gpt-5-nano',
  'gpt-5-mini',
  'gpt-5',
];

let memSettings = null;

function clampInt(n, min, max, fallback) {
  const v = parseInt(n, 10);
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, v));
}

export function defaultSiteSettings() {
  return {
    fullPriceCents: 490,
    packPriceCents: 990,
    packCredits: 5,
    gptModel: 'gpt-4.1-nano',
    updatedAt: null,
  };
}

export function allowedGptModels() {
  return ALLOWED_GPT_MODELS.slice();
}

export function sanitizeSiteSettings(raw = {}) {
  const base = defaultSiteSettings();
  const model = String(raw.gptModel || base.gptModel).trim();
  return {
    fullPriceCents: clampInt(raw.fullPriceCents, 50, 50000, base.fullPriceCents),
    packPriceCents: clampInt(raw.packPriceCents, 50, 100000, base.packPriceCents),
    packCredits: clampInt(raw.packCredits, 2, 50, base.packCredits),
    gptModel: ALLOWED_GPT_MODELS.includes(model) ? model : base.gptModel,
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : null,
  };
}

async function redisCommand(cmd) {
  const url = (process.env.UPSTASH_REDIS_REST_URL || '').trim();
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN || '').trim();
  if (!url || !token) return null;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cmd),
    });
    if (!res.ok) {
      console.error('Upstash site-settings error:', await res.text());
      return null;
    }
    const data = await res.json();
    return data.result;
  } catch (e) {
    console.error('Upstash site-settings fetch failed:', e);
    return null;
  }
}

export async function getSiteSettings() {
  if (funnelStorageMode() === 'redis') {
    const raw = await redisCommand(['GET', SETTINGS_KEY]);
    if (!raw) return defaultSiteSettings();
    try {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      return sanitizeSiteSettings(parsed || {});
    } catch {
      return defaultSiteSettings();
    }
  }
  return sanitizeSiteSettings(memSettings || {});
}

export async function saveSiteSettings(input = {}) {
  const prev = await getSiteSettings();
  const next = sanitizeSiteSettings({
    ...prev,
    ...input,
    updatedAt: new Date().toISOString(),
  });

  if (funnelStorageMode() === 'redis') {
    await redisCommand(['SET', SETTINGS_KEY, JSON.stringify(next)]);
  } else {
    memSettings = next;
  }
  return { ok: true, settings: next };
}

/** Prodotti Stripe checkout (prezzi in centesimi). */
export async function getCheckoutProducts() {
  const s = await getSiteSettings();
  return {
    full: {
      name: 'Lettura completa Luxseetarot',
      description: 'Sblocco di una lettura simbolica completa (digitale).',
      unit_amount: s.fullPriceCents,
      credits: 1,
    },
    pack: {
      name: `Pack ${s.packCredits} letture Luxseetarot`,
      description: `${s.packCredits} letture complete digitali.`,
      unit_amount: s.packPriceCents,
      credits: s.packCredits,
    },
  };
}

/** Solo campi pubblici (niente modello GPT). */
export async function getPublicPricing() {
  const s = await getSiteSettings();
  return {
    fullPriceCents: s.fullPriceCents,
    packPriceCents: s.packPriceCents,
    packCredits: s.packCredits,
  };
}

export async function getGptModel() {
  const s = await getSiteSettings();
  return s.gptModel;
}
