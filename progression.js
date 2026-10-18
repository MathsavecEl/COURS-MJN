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
    bar.setAttribute('aria-label', 'Navigation du site');
    bar.innerHTML = '<button type="button" class="mjn-nav-btn mjn-back-btn">← Retour</button><a href="./" class="mjn-nav-btn">⌂ Accueil</a>';
    document.body.appendChild(bar);
    bar.querySelector('.mjn-back-btn').addEventListener('click', () => {
      if (history.length > 1 && document.referrer && new URL(document.referrer).origin === location.origin) history.back();
      else location.href = HOME;
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
    if (!last || !last.url || !last.url.endsWith('.html') || last.url.endsWith('/index.html')) return;
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
    #mjn-nav{position:fixed;z-index:9999;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));display:flex;gap:10px;justify-content:space-between;pointer-events:none}
    #mjn-nav .mjn-nav-btn{pointer-events:auto;display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border:1px solid #d7e3dc;border-radius:999px;background:#fff;color:#174c3d;font:600 14px/1.2 system-ui,sans-serif;text-decoration:none;box-shadow:0 4px 18px #0002;cursor:pointer}
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