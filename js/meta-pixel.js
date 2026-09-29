/**
 * Meta (Facebook) Pixel — un solo ID su tutto il sito (da /api/config).
 */
(function () {
  'use strict';

  var cfg = null;
  var activeId = '';
  var inited = false;
  var pageViewSent = false;

  function resolveId(pixelCfg) {
    if (!pixelCfg || !pixelCfg.enabled) return '';
    return pixelCfg.defaultId || '';
  }

  function ensureFbq() {
    if (window.fbq) return;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  }

  function initWithId(id) {
    id = String(id || '').replace(/\D/g, '');
    if (!id) return false;
    ensureFbq();
    if (activeId === id && inited) return true;
    try {
      window.fbq('init', id);
      activeId = id;
      inited = true;
      return true;
    } catch (e) {
      return false;
    }
  }

  function track() {
    if (!inited || !window.fbq) return;
    try {
      window.fbq.apply(null, arguments);
    } catch (e) {}
  }

  function sendPageView() {
    if (pageViewSent) return;
    if (!initWithId(activeId)) return;
    track('track', 'PageView');
    pageViewSent = true;
  }

  function applyConfig(pixelCfg) {
    cfg = pixelCfg || null;
    activeId = resolveId(cfg);
    if (!activeId) return;
    if (initWithId(activeId)) sendPageView();
  }

  function boot() {
    fetch('/api/config')
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.ok) return;
        applyConfig(data.metaPixel || null);
        try {
          window.dispatchEvent(new CustomEvent('lux-meta-pixel-ready', { detail: { id: activeId, cfg: cfg } }));
        } catch (e) {}
      })
      .catch(function () {});
  }

  window.LuxMetaPixel = {
    getId: function () {
      return activeId;
    },
    getConfig: function () {
      return cfg;
    },
    track: function (eventName, params) {
      if (!cfg || !cfg.enabled) return;
      if (cfg.trackFunnelEvents === false) return;
      if (!activeId) activeId = resolveId(cfg);
      if (!initWithId(activeId)) return;
      if (params) track('track', eventName, params);
      else track('track', eventName);
    },
    trackCustom: function (eventName, params) {
      if (!cfg || !cfg.enabled) return;
      if (cfg.trackFunnelEvents === false) return;
      if (!activeId) activeId = resolveId(cfg);
      if (!initWithId(activeId)) return;
      if (params) track('trackCustom', eventName, params);
      else track('trackCustom', eventName);
    },
    setLandingVariant: function () {},
    refresh: boot,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
