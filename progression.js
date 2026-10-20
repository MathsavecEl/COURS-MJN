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
    bar.setAttribute('aria-label', 'Navigation et impression');
    bar.innerHTML = '<button type="button" class="mjn-nav-btn mjn-back-btn">← Retour</button><a href="./" class="mjn-nav-btn mjn-home-btn">⌂ Accueil</a>';
    document.body.appendChild(bar);
    bar.querySelector('.mjn-back-btn').addEventListener('click', () => {
      if (history.length > 1 && document.referrer && new URL(document.referrer).origin === location.origin) history.back();
      else location.href = HOME;
    });

    // Regrouper les trois actions dans une seule barre pour éviter les boutons superposés.
    const placePrintButton = () => {
      const print = document.getElementById('mjnPrintBtn');
      if (!print || print.parentElement === bar) return !!print;
      print.textContent = '🖨️ PDF exercices';
      print.setAttribute('aria-label', 'Sélectionner des exercices et créer un PDF');
      bar.appendChild(print);
      return true;
    };
    if (!placePrintButton()) {
      const observer = new MutationObserver(() => {
        if (placePrintButton()) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
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
    #mjn-nav{position:fixed;z-index:2147483001;left:50%;transform:translateX(-50%);bottom:calc(10px + env(safe-area-inset-bottom,0px));width:max-content;max-width:calc(100vw - 16px);display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;padding:7px;border:1px solid #dbe4ee;border-radius:18px;background:rgba(248,250,252,.96);box-shadow:0 6px 24px #17203330;backdrop-filter:blur(12px);pointer-events:auto}
    #mjn-nav .mjn-nav-btn,#mjn-nav #mjnPrintBtn{position:static!important;inset:auto!important;transform:none!important;flex:0 0 auto!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:40px!important;max-width:100%!important;margin:0!important;padding:9px 12px!important;border:1px solid #d2dce8!important;border-radius:12px!important;background:#fff!important;color:#183047!important;font:700 13px/1.15 system-ui,sans-serif!important;text-decoration:none!important;white-space:nowrap!important;box-shadow:none!important;cursor:pointer!important}
    #mjn-nav .mjn-home-btn{background:#e5f4eb!important;border-color:#b8ddc7!important;color:#155e43!important}
    #mjn-nav #mjnPrintBtn{background:#2457a7!important;border-color:#2457a7!important;color:#fff!important}
    #mjn-nav .mjn-nav-btn:focus-visible,#mjn-nav #mjnPrintBtn:focus-visible{outline:3px solid #f4c451!important;outline-offset:2px!important}
    .mjn-home-float{display:none!important}
    @media(max-width:420px){#mjn-nav{gap:5px;padding:5px;border-radius:15px;max-width:calc(100vw - 10px)}#mjn-nav .mjn-nav-btn,#mjn-nav #mjnPrintBtn{min-height:38px!important;padding:8px 9px!important;font-size:12px!important}}
    @media print{#mjn-nav,.mjn-home-float{display:none!important}}
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