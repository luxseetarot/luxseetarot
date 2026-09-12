(function () {
  var STORAGE_KEY = 'lux_exit_intent';
  var FORM_KEY = 'lux_exit_form';
  var MIN_MS = 2000;
  var shown = false;
  var armed = false;
  var start = Date.now();

  try {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
  } catch (e) {}

  if (document.body && document.body.classList.contains('phase-away')) return;

  var css = [
    '#lux-exit{position:fixed;inset:0;z-index:10050;display:flex;align-items:center;justify-content:center;padding:14px;opacity:0;pointer-events:none;transition:opacity .35s ease}',
    '#lux-exit.is-open{opacity:1;pointer-events:auto}',
    '#lux-exit-backdrop{position:absolute;inset:0;background:rgba(3,2,12,.78);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}',
    '#lux-exit-card{position:relative;width:100%;max-width:400px;overflow:hidden;background:#120e1f;border:1px solid rgba(232,201,140,.35);border-radius:22px;padding:0;box-shadow:0 28px 70px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.03) inset;transform:translateY(16px) scale(.97);transition:transform .4s cubic-bezier(.22,1,.36,1);color:#f3eee4}',
    '#lux-exit.is-open #lux-exit-card{transform:translateY(0) scale(1)}',
    '#lux-exit-top{position:relative;padding:22px 22px 16px;text-align:center;background:radial-gradient(ellipse at 50% 0%,rgba(212,175,106,.18),transparent 70%),linear-gradient(180deg,#1c152c 0%,#120e1f 100%);border-bottom:1px solid rgba(212,175,106,.14)}',
    '#lux-exit-moon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;margin:0 auto 10px;border-radius:50%;border:1px solid rgba(212,175,106,.4);color:#e8c98c;font-size:18px;line-height:1;box-shadow:0 0 24px rgba(212,175,106,.2)}',
    '#lux-exit-close{position:absolute;top:10px;right:10px;width:34px;height:34px;border:0;border-radius:999px;background:transparent;color:rgba(180,170,196,.8);font-size:22px;line-height:1;cursor:pointer;z-index:2}',
    '#lux-exit-close:hover{color:#fff;background:rgba(255,255,255,.06)}',
    '#lux-exit-title{font-family:Cinzel,Georgia,serif;font-weight:600;font-size:clamp(18px,4.2vw,22px);letter-spacing:.03em;color:#f0d7a0;margin:0 0 8px;line-height:1.25}',
    '#lux-exit-text{font-family:Inter,system-ui,sans-serif;font-size:13px;line-height:1.45;color:rgba(210,200,220,.88);margin:0;font-weight:400}',
    '#lux-exit-body{padding:16px 22px 18px}',
    '#lux-exit-form{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '#lux-exit-form .lux-field{margin:0}',
    '#lux-exit-form .lux-span{grid-column:1 / -1}',
    '#lux-exit-form label{display:block;font-family:Inter,system-ui,sans-serif;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(176,166,194,.9);margin:0 0 5px}',
    '#lux-exit-form input,#lux-exit-form textarea{width:100%;box-sizing:border-box;background:rgba(255,255,255,.04);border:1px solid rgba(212,175,106,.22);border-radius:9px;padding:10px 11px;color:#f3eee4;font-family:Inter,system-ui,sans-serif;font-size:14px;outline:none;transition:border .2s,box-shadow .2s,background .2s;-webkit-user-select:text;user-select:text}',
    '#lux-exit-form input:focus,#lux-exit-form textarea:focus{border-color:rgba(240,215,160,.7);background:rgba(255,255,255,.06);box-shadow:0 0 0 3px rgba(212,175,106,.12)}',
    '#lux-exit-form textarea{resize:none;min-height:54px;max-height:54px;line-height:1.35}',
    '#lux-exit-err{display:none;grid-column:1 / -1;color:#ff9b9b;font-size:12px;text-align:center;margin:0;font-family:Inter,system-ui,sans-serif}',
    '#lux-exit-submit{grid-column:1 / -1;width:100%;display:inline-flex;align-items:center;justify-content:center;margin-top:2px;padding:13px 14px;border:0;border-radius:999px;cursor:pointer;font-family:Cinzel,Georgia,serif;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#1a1208;background:linear-gradient(135deg,#f0d7a0,#c9a05a 55%,#b8893a);box-shadow:0 8px 28px rgba(201,160,90,.35);transition:transform .2s,box-shadow .2s}',
    '#lux-exit-submit:hover{transform:translateY(-1px);box-shadow:0 12px 34px rgba(201,160,90,.45)}',
    '#lux-exit-note{grid-column:1 / -1;font-family:Inter,system-ui,sans-serif;font-size:11px;line-height:1.4;text-align:center;color:rgba(154,145,168,.8);margin:2px 0 0}',
    '#lux-exit-note a{color:rgba(232,201,140,.85);text-decoration:none}',
    '@media (max-width:380px){#lux-exit-form{grid-template-columns:1fr}#lux-exit-card{border-radius:18px}#lux-exit-top,#lux-exit-body{padding-left:16px;padding-right:16px}}',
    '@media (max-height:700px){#lux-exit-top{padding:16px 18px 12px}#lux-exit-body{padding:12px 18px 14px}#lux-exit-moon{display:none}#lux-exit-text{font-size:12px}#lux-exit-form{gap:8px}#lux-exit-form textarea{min-height:46px;max-height:46px}}',
    '@media (prefers-reduced-motion:reduce){#lux-exit,#lux-exit-card{transition:none}}'
  ].join('');

  function markShown() {
    shown = true;
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
  }

  function hasHomeForm() {
    return !!(document.getElementById('form') && document.getElementById('name') && document.getElementById('birth') && document.getElementById('email') && document.getElementById('q'));
  }

  function alreadyEngaged() {
    if (document.body.classList.contains('phase-away')) return true;
    var select = document.getElementById('phase-select');
    var reveal = document.getElementById('phase-reveal');
    if (select && select.classList.contains('active')) return true;
    if (reveal && reveal.classList.contains('active')) return true;
    return false;
  }

  function applyHomeForm(data) {
    var name = document.getElementById('name');
    var birth = document.getElementById('birth');
    var email = document.getElementById('email');
    var q = document.getElementById('q');
    var form = document.getElementById('form');
    if (!name || !birth || !email || !q || !form) return false;
    name.value = data.name || '';
    birth.value = data.birth || '';
    email.value = data.email || '';
    q.value = data.question || '';
    try {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (e) {}
    setTimeout(function () {
      if (typeof form.requestSubmit === 'function') form.requestSubmit();
      else form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 280);
    return true;
  }

  function consumePendingForm() {
    var raw;
    try { raw = sessionStorage.getItem(FORM_KEY); } catch (e) { return; }
    if (!raw || !hasHomeForm()) return;
    try { sessionStorage.removeItem(FORM_KEY); } catch (e) {}
    try {
      var data = JSON.parse(raw);
      markShown();
      applyHomeForm(data);
    } catch (e) {}
  }

  function build() {
    if (document.getElementById('lux-exit')) return;

    var style = document.createElement('style');
    style.id = 'lux-exit-style';
    style.textContent = css;
    document.head.appendChild(style);

    var root = document.createElement('div');
    root.id = 'lux-exit';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'lux-exit-title');
    root.hidden = true;
    root.innerHTML =
      '<div id="lux-exit-backdrop" data-lux-close="1"></div>' +
      '<div id="lux-exit-card">' +
        '<button type="button" id="lux-exit-close" aria-label="Chiudi" data-lux-close="1">×</button>' +
        '<div id="lux-exit-top">' +
          '<div id="lux-exit-moon" aria-hidden="true">☽</div>' +
          '<h2 id="lux-exit-title">Non uscire senza la tua risposta</h2>' +
          '<p id="lux-exit-text">Compila qui e ricevi subito la lettura di 3 carte — gratis, senza account.</p>' +
        '</div>' +
        '<div id="lux-exit-body">' +
          '<form id="lux-exit-form" novalidate>' +
            '<div class="lux-field"><label for="lux-exit-name">Nome</label><input id="lux-exit-name" name="name" maxlength="80" placeholder="Il tuo nome" autocomplete="name" required /></div>' +
            '<div class="lux-field"><label for="lux-exit-birth">Nascita</label><input id="lux-exit-birth" name="birth" type="date" min="1920-01-01" required /></div>' +
            '<div class="lux-field lux-span"><label for="lux-exit-email">Email</label><input id="lux-exit-email" name="email" type="email" maxlength="120" placeholder="La tua email" autocomplete="email" required /></div>' +
            '<div class="lux-field lux-span"><label for="lux-exit-q">La tua domanda</label><textarea id="lux-exit-q" name="q" maxlength="600" rows="2" placeholder="Es. Cosa mi aspetta in amore?" required></textarea></div>' +
            '<div id="lux-exit-err"></div>' +
            '<button type="submit" id="lux-exit-submit">Ricevi la lettura gratis</button>' +
            '<p id="lux-exit-note">Solo 1 minuto · <a href="/privacy.html">Privacy</a></p>' +
          '</form>' +
        '</div>' +
      '</div>';
    document.body.appendChild(root);

    var maxY = new Date().getFullYear() - 12;
    var birth = document.getElementById('lux-exit-birth');
    if (birth) birth.setAttribute('max', maxY + '-12-31');

    root.addEventListener('click', function (e) {
      if (e.target && e.target.getAttribute('data-lux-close') === '1') hide();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.classList.contains('is-open')) hide();
    });

    document.getElementById('lux-exit-form').addEventListener('submit', onSubmit);
  }

  function show() {
    if (shown || alreadyEngaged()) return;
    if (Date.now() - start < MIN_MS) return;
    build();
    var root = document.getElementById('lux-exit');
    if (!root || root.classList.contains('is-open')) return;
    markShown();
    root.hidden = false;
    requestAnimationFrame(function () {
      root.classList.add('is-open');
      var first = document.getElementById('lux-exit-name');
      if (first) setTimeout(function () { try { first.focus(); } catch (e) {} }, 320);
    });
    document.documentElement.style.overflow = 'hidden';
  }

  function hide() {
    var root = document.getElementById('lux-exit');
    if (!root) return;
    root.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    setTimeout(function () {
      if (!root.classList.contains('is-open')) root.hidden = true;
    }, 360);
  }

  function onSubmit(e) {
    e.preventDefault();
    var name = (document.getElementById('lux-exit-name').value || '').trim();
    var birth = (document.getElementById('lux-exit-birth').value || '').trim();
    var email = (document.getElementById('lux-exit-email').value || '').trim().toLowerCase();
    var question = (document.getElementById('lux-exit-q').value || '').trim();
    var err = document.getElementById('lux-exit-err');
    var maxYear = new Date().getFullYear() - 12;
    var yearOk = /^\d{4}-\d{2}-\d{2}$/.test(birth);
    var yearNum = yearOk ? parseInt(birth.slice(0, 4), 10) : 0;

    if (!name || !yearOk || yearNum < 1920 || yearNum > maxYear || !email || email.indexOf('@') < 0 || question.length < 3) {
      err.textContent = 'Completa tutti i campi per ricevere la lettura.';
      err.style.display = 'block';
      return;
    }
    err.style.display = 'none';

    var data = { name: name, birth: birth, email: email, question: question };

    if (hasHomeForm()) {
      hide();
      applyHomeForm(data);
      return;
    }

    try { sessionStorage.setItem(FORM_KEY, JSON.stringify(data)); } catch (err2) {}
    window.location.href = '/?from=exit';
  }

  function armDesktop() {
    document.addEventListener('mouseout', function (e) {
      if (!armed || shown) return;
      if (e.relatedTarget || e.toElement) return;
      if (typeof e.clientY === 'number' && e.clientY > 0) return;
      show();
    });
  }

  function armMobile() {
    var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) return;

    try {
      history.pushState({ luxExit: 1 }, '', location.href);
    } catch (e) {}

    window.addEventListener('popstate', function () {
      if (shown || alreadyEngaged() || !armed) return;
      try { history.pushState({ luxExit: 1 }, '', location.href); } catch (e) {}
      show();
    });

    var lastY = window.scrollY || 0;
    window.addEventListener('scroll', function () {
      if (shown || !armed) return;
      var y = window.scrollY || 0;
      if (y < 40 && lastY - y > 60 && Date.now() - start > 12000) show();
      lastY = y;
    }, { passive: true });
  }

  function init() {
    consumePendingForm();
    if (shown) return;
    build();
    setTimeout(function () { armed = true; }, MIN_MS);
    armDesktop();
    armMobile();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
