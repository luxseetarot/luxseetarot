(function () {
  var STORAGE_KEY = 'lux_exit_intent';
  var FORM_KEY = 'lux_exit_form';
  var MIN_MS = 6000;
  var shown = false;
  var armed = false;
  var start = Date.now();

  try {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
  } catch (e) {}

  if (document.body && document.body.classList.contains('phase-away')) return;

  var css = [
    '#lux-exit{position:fixed;inset:0;z-index:10050;display:flex;align-items:center;justify-content:center;padding:18px;opacity:0;pointer-events:none;transition:opacity .35s ease}',
    '#lux-exit.is-open{opacity:1;pointer-events:auto}',
    '#lux-exit-backdrop{position:absolute;inset:0;background:rgba(5,4,16,.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}',
    '#lux-exit-card{position:relative;width:100%;max-width:420px;max-height:min(92vh,720px);overflow:auto;background:linear-gradient(165deg,rgba(28,22,48,.97),rgba(12,10,24,.98));border:1px solid rgba(212,175,106,.28);border-radius:18px;padding:28px 26px 24px;box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 60px rgba(212,175,106,.12);transform:translateY(14px) scale(.98);transition:transform .4s cubic-bezier(.22,1,.36,1);color:#ece6d8}',
    '#lux-exit.is-open #lux-exit-card{transform:translateY(0) scale(1)}',
    '#lux-exit-close{position:absolute;top:12px;right:12px;width:36px;height:36px;border:0;border-radius:999px;background:transparent;color:rgba(154,145,168,.85);font-size:22px;line-height:1;cursor:pointer;transition:color .2s,background .2s}',
    '#lux-exit-close:hover{color:#ece6d8;background:rgba(255,255,255,.06)}',
    '#lux-exit-kicker{font-family:Cinzel,serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:rgba(212,175,106,.8);text-align:center;margin:0 0 10px}',
    '#lux-exit-title{font-family:Cinzel,serif;font-weight:500;font-size:clamp(20px,4.5vw,24px);letter-spacing:.04em;text-align:center;color:#d4af6a;margin:0 0 10px;line-height:1.25}',
    '#lux-exit-text{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:17px;line-height:1.5;text-align:center;color:rgba(154,145,168,.98);margin:0 0 22px}',
    '#lux-exit-form .lux-field{margin:0 0 14px}',
    '#lux-exit-form label{display:block;font-family:Inter,system-ui,sans-serif;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#9a91a8;margin:0 0 7px}',
    '#lux-exit-form input,#lux-exit-form textarea{width:100%;box-sizing:border-box;background:rgba(11,10,20,.65);border:1px solid rgba(212,175,106,.28);border-radius:10px;padding:12px 14px;color:#ece6d8;font-family:Inter,system-ui,sans-serif;font-size:16px;outline:none;transition:border .2s,box-shadow .2s;-webkit-user-select:text;user-select:text}',
    '#lux-exit-form input:focus,#lux-exit-form textarea:focus{border-color:#d4af6a;box-shadow:0 0 0 3px rgba(212,175,106,.15)}',
    '#lux-exit-form textarea{resize:none;min-height:88px}',
    '#lux-exit-err{display:none;color:#ff8a8a;font-size:13px;text-align:center;margin:0 0 10px;font-family:Inter,system-ui,sans-serif}',
    '#lux-exit-submit{width:100%;display:inline-flex;align-items:center;justify-content:center;margin-top:4px;padding:14px 18px;border:0;border-radius:12px;cursor:pointer;font-family:Cinzel,serif;font-size:13px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#1a1208;background:linear-gradient(135deg,#e6c587,#b88a3e);box-shadow:0 0 28px rgba(212,175,106,.28);transition:transform .2s,box-shadow .2s}',
    '#lux-exit-submit:hover{transform:translateY(-1px);box-shadow:0 0 42px rgba(212,175,106,.42)}',
    '#lux-exit-note{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:14px;line-height:1.4;text-align:center;color:rgba(154,145,168,.85);margin:14px 0 0}',
    '#lux-exit-note a{color:rgba(212,175,106,.8);text-decoration:none}',
    '@media (max-width:420px){#lux-exit-card{padding:24px 18px 20px}#lux-exit-submit{letter-spacing:.12em;font-size:12px}}',
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
        '<p id="lux-exit-kicker">Lettura gratuita</p>' +
        '<h2 id="lux-exit-title">Prima di andare…</h2>' +
        '<p id="lux-exit-text">Le carte hanno già una risposta per te. Bastano pochi secondi — senza account, senza impegno.</p>' +
        '<form id="lux-exit-form" novalidate>' +
          '<div class="lux-field"><label for="lux-exit-name">Nome</label><input id="lux-exit-name" name="name" maxlength="80" placeholder="Il tuo nome" autocomplete="name" required /></div>' +
          '<div class="lux-field"><label for="lux-exit-birth">Data di nascita</label><input id="lux-exit-birth" name="birth" type="date" min="1920-01-01" required /></div>' +
          '<div class="lux-field"><label for="lux-exit-email">Email</label><input id="lux-exit-email" name="email" type="email" maxlength="120" placeholder="Email" autocomplete="email" required /></div>' +
          '<div class="lux-field"><label for="lux-exit-q">La tua domanda</label><textarea id="lux-exit-q" name="q" maxlength="600" rows="3" placeholder="Scrivi qui le tue domande" required></textarea></div>' +
          '<div id="lux-exit-err"></div>' +
          '<button type="submit" id="lux-exit-submit">Inizia la lettura gratuita</button>' +
        '</form>' +
        '<p id="lux-exit-note">Nessun account richiesto. <a href="/privacy.html">Privacy</a></p>' +
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
      err.textContent = 'Completa tutti i campi. Anno di nascita: 4 cifre (es. 1990).';
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
