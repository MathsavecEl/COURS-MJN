(() => {
  const HOME = './';
  const KEY = 'coursMJN:lastProgress';
  const SCROLL_PREFIX = 'coursMJN:scroll:';
  const isHome = location.pathname.endsWith('/') || location.pathname.endsWith('/index.html');
  const safeRead = key => { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (_) { return null; } };
  const safeWrite = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {} };

  function addToolbar() {
    if (isHome || document.getElementById('mjn-nav')) return;
    const bar = document.createElement('nav');
    bar.id = 'mjn-nav';
    bar.setAttribute('aria-label', 'Navigation et impression des exercices');
    bar.innerHTML = '<button type="button" class="mjn-nav-btn mjn-back-btn">← Retour</button><a href="./index.html" class="mjn-nav-btn mjn-home-btn">⌂ Accueil</a><button type="button" class="mjn-nav-btn mjn-print-btn">🖨️ PDF exercices</button>';
    document.body.appendChild(bar);
    bar.querySelector('.mjn-back-btn').addEventListener('click', () => {
      let sameSite = false;
      try { sameSite = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (_) {}
      if (history.length > 1 && sameSite) history.back();
      else location.href = HOME + 'index.html';
    });
    // Déclenche le véritable outil d'impression existant, avec sélection et code.
    bar.querySelector('.mjn-print-btn').addEventListener('click', () => {
      const original = document.getElementById('mjnPrintBtn');
      if (original) { original.click(); return; }
      const observer = new MutationObserver(() => {
        const btn = document.getElementById('mjnPrintBtn');
        if (btn) { observer.disconnect(); btn.click(); }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      window.setTimeout(() => observer.disconnect(), 8000);
    });
  }

  function trackPage() {
    if (isHome) return;
    const here = location.pathname + location.search;
    const savedScrollBeforeLoad = safeRead(SCROLL_PREFIX + location.pathname);
    const shouldResume = sessionStorage.getItem('coursMJN:resume') === '1';
    const save = () => {
      safeWrite(KEY, { url: here, title: document.title || 'Ma ressource', scroll: window.scrollY || 0, updated: Date.now() });
      safeWrite(SCROLL_PREFIX + location.pathname, window.scrollY || 0);
    };
    let wait;
    window.addEventListener('scroll', () => { clearTimeout(wait); wait = setTimeout(save, 250); }, { passive: true });
    window.addEventListener('pagehide', save);
    window.addEventListener('beforeunload', save);
    save();

    if (shouldResume) {
      sessionStorage.removeItem('coursMJN:resume');
      const y = typeof savedScrollBeforeLoad === 'number' ? savedScrollBeforeLoad : 0;
      if (y > 0) setTimeout(() => window.scrollTo(0, y), 350);
    }
  }

  function addResumePanel() {
    if (!isHome) return;
    const last = safeRead(KEY);
    if (!last || !last.url) return;
    let lastPath = '';
    try { lastPath = new URL(last.url, location.href).pathname; } catch (_) { return; }
    if (!lastPath.endsWith('.html') || lastPath.endsWith('/index.html')) return;
    const panel = document.createElement('section');
    panel.id = 'mjn-resume';
    panel.innerHTML = '<div><strong>Reprendre là où tu t’étais arrêté ?</strong><p></p></div><div class="mjn-resume-actions"><button type="button" id="mjn-continue">Continuer</button><button type="button" id="mjn-reset">Recommencer à zéro</button></div>';
    panel.querySelector('p').textContent = 'Dernière ressource consultée : ' + (last.title || last.url.split('/').pop());
    const hero = document.querySelector('.hero');
    if (hero && hero.parentNode) hero.insertAdjacentElement('afterend', panel);
    else document.body.prepend(panel);
    panel.querySelector('#mjn-continue').addEventListener('click', () => {
      sessionStorage.setItem('coursMJN:resume', '1');
      location.href = last.url;
    });
    panel.querySelector('#mjn-reset').addEventListener('click', () => {
      try {
        Object.keys(localStorage).filter(k => k.startsWith('coursMJN:')).forEach(k => localStorage.removeItem(k));
        sessionStorage.removeItem('coursMJN:resume');
      } catch (_) {}
      panel.remove();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const style = document.createElement('style');
  style.textContent = `
    #mjn-nav{position:fixed!important;z-index:2147483001!important;left:50%!important;right:auto!important;transform:translateX(-50%)!important;bottom:calc(10px + env(safe-area-inset-bottom,0px))!important;width:max-content!important;max-width:calc(100vw - 12px)!important;display:flex!important;flex-wrap:nowrap!important;gap:6px!important;align-items:center!important;justify-content:center!important;padding:6px!important;border:1px solid #dbe4ee!important;border-radius:16px!important;background:rgba(248,250,252,.97)!important;box-shadow:0 6px 24px #17203340!important;backdrop-filter:blur(12px)!important}
    #mjn-nav .mjn-nav-btn{position:static!important;inset:auto!important;transform:none!important;flex:0 1 auto!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:40px!important;min-width:0!important;max-width:100%!important;margin:0!important;padding:9px 11px!important;border:1px solid #d2dce8!important;border-radius:11px!important;background:#fff!important;color:#183047!important;font:700 13px/1.15 system-ui,sans-serif!important;text-decoration:none!important;white-space:nowrap!important;box-shadow:none!important;cursor:pointer!important}
    #mjn-nav .mjn-home-btn{background:#e5f4eb!important;border-color:#b8ddc7!important;color:#155e43!important}
    #mjn-nav .mjn-print-btn{background:#2457a7!important;border-color:#2457a7!important;color:#fff!important}
    #mjn-nav .mjn-nav-btn:focus-visible{outline:3px solid #f4c451!important;outline-offset:2px!important}
    #mjnPrintBtn{display:none!important}
    .mjn-home-float{display:none!important}
    @media(max-width:420px){#mjn-nav{gap:4px!important;padding:5px!important;border-radius:13px!important;max-width:calc(100vw - 8px)!important}#mjn-nav .mjn-nav-btn{min-height:38px!important;padding:8px 7px!important;font-size:11px!important}}
    @media(max-width:350px){#mjn-nav .mjn-nav-btn{font-size:10px!important;padding:8px 5px!important}}
    @media print{#mjn-nav,.mjn-home-float,#mjnPrintBtn{display:none!important}}
    #mjn-resume{max-width:1040px;margin:18px auto;padding:16px 20px;border:1px solid #b9d9c8;border-radius:16px;background:#eef8f1;color:#14251c;display:flex;gap:16px;align-items:center;justify-content:space-between;flex-wrap:wrap;font-family:system-ui,sans-serif}
    #mjn-resume p{margin:4px 0 0;font-size:.92rem}
    #mjn-resume .mjn-resume-actions{display:flex;gap:8px;flex-wrap:wrap}
    #mjn-resume button{border:0;border-radius:999px;padding:10px 14px;background:#176b55;color:#fff;font-weight:600;cursor:pointer}
    #mjn-resume #mjn-reset{background:#e2e8e4;color:#173328}
    @media(max-width:520px){#mjn-resume{margin:12px;padding:14px}#mjn-nav .mjn-nav-btn{font-size:12px;padding:10px 12px}}
  `;
  document.head.appendChild(style);
  addToolbar();
  trackPage();
  addResumePanel();
})();