/* MJN COURS — mode lecture sans distractions, ordinateur et mobile */
(function () {
  'use strict';
  if (window.__mjnFocusModeV2) return;
  window.__mjnFocusModeV2 = true;

  var style = document.createElement('style');
  style.id = 'mjn-focus-mode-style-v2';
  style.textContent = `
    body.mjn-course-focus { background-image: none !important; }
    body.mjn-course-focus > header.top,
    body.mjn-course-focus header.top,
    body.mjn-course-focus > footer,
    body.mjn-course-focus footer.wrap,
    body.mjn-course-focus .foot,
    body.mjn-course-focus nav.tabs { display: none !important; }
    body.mjn-course-focus main#app,
    body.mjn-course-focus main#main,
    body.mjn-course-focus main.wrap,
    body.mjn-course-focus #app,
    body.mjn-course-focus #main {
      display: block !important; width: 100% !important; max-width: none !important;
      margin: 0 !important; padding: 12px clamp(14px, 4vw, 56px) 42px !important;
      min-height: 100vh; box-sizing: border-box !important;
    }
    body.mjn-course-focus .sheet { max-width: none !important; }
    body.mjn-course-focus .subnav { top: 0 !important; position: sticky !important; z-index: 30 !important; }
    body.mjn-course-focus > .mjn-focus-return,
    body.mjn-course-focus main > .mjn-focus-return,
    body.mjn-course-focus #app > .mjn-focus-return,
    body.mjn-course-focus #main > .mjn-focus-return {
      display: inline-flex !important; position: sticky !important; top: 8px !important;
      z-index: 99999 !important; align-items: center; gap: 8px; width: fit-content;
      max-width: 100%; margin: 0 0 14px; padding: 9px 14px;
      border: 1px solid #b8d2ff; border-radius: 12px; background: #fff;
      color: #174ea6; box-shadow: 0 2px 12px #14284b18;
      font: 700 15px/1.2 system-ui, sans-serif; cursor: pointer;
    }
    body.mjn-course-focus [data-mjn-hidden-in-focus="1"] { display: none !important; }
    @media (min-width: 900px) {
      body.mjn-course-focus main#app,
      body.mjn-course-focus main#main,
      body.mjn-course-focus main.wrap,
      body.mjn-course-focus #app,
      body.mjn-course-focus #main { padding-left: clamp(36px, 6vw, 100px) !important; padding-right: clamp(36px, 6vw, 100px) !important; }
    }
    @media (max-width: 600px) {
      body.mjn-course-focus main#app,
      body.mjn-course-focus main#main,
      body.mjn-course-focus main.wrap,
      body.mjn-course-focus #app,
      body.mjn-course-focus #main { padding: 8px 10px 30px !important; }
    }
    @media print { body.mjn-course-focus .mjn-focus-return { display: none !important; } }
  `;
  document.head.appendChild(style);

  function detailRoute() {
    var h = (location.hash || '#/').replace(/^#/, '');
    if (/^\/(?:ch\/[^/]+|dp\/[^/]+|eval\/[^/]+|auto\/[^/]+)(?:\/.*)?$/.test(h)) return h;
    return '';
  }
  function parentRoute(route) {
    if (route.indexOf('/ch/') === 0) return '#/chapitres';
    if (route.indexOf('/dp/') === 0) return '#/decouverte';
    if (route.indexOf('/eval/') === 0) return '#/evals';
    if (route.indexOf('/auto/') === 0) return '#/automatismes';
    return '#/';
  }
  function hideFloatingActions(active) {
    document.querySelectorAll('body *').forEach(function (el) {
      if (el.classList && el.classList.contains('mjn-focus-return')) return;
      if (el.hasAttribute('data-mjn-focus-original-display')) {
        if (!active) {
          el.style.display = el.getAttribute('data-mjn-focus-original-display');
          el.removeAttribute('data-mjn-focus-original-display');
          el.removeAttribute('data-mjn-hidden-in-focus');
        }
        return;
      }
      if (!active) return;
      var cs;
      try { cs = window.getComputedStyle(el); } catch (_) { return; }
      if (cs.position !== 'fixed' || cs.display === 'none') return;
      var bottom = parseFloat(cs.bottom);
      if (Number.isFinite(bottom) && bottom >= 0 && el.id !== 'mjnPdfPanel') {
        el.setAttribute('data-mjn-focus-original-display', el.style.display || '');
        el.setAttribute('data-mjn-hidden-in-focus', '1');
      }
    });
  }
  function addReturnButton(route) {
    var root = document.getElementById('app') || document.getElementById('main');
    if (!root) return;
    var old = root.querySelector(':scope > .mjn-focus-return');
    if (old) old.remove();
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'mjn-focus-return';
    b.innerHTML = '<span aria-hidden="true">←</span><span>Retour</span>';
    b.addEventListener('click', function () { location.hash = parentRoute(route); });
    root.insertBefore(b, root.firstChild);
  }
  function apply() {
    var route = detailRoute();
    var active = !!route;
    document.body.classList.toggle('mjn-course-focus', active);
    var root = document.getElementById('app') || document.getElementById('main');
    if (active) addReturnButton(route);
    else if (root) {
      var old = root.querySelector(':scope > .mjn-focus-return');
      if (old) old.remove();
    }
    hideFloatingActions(active);
    if (active) window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', function () { window.setTimeout(apply, 0); });
  document.addEventListener('click', function (e) {
    if (e.target.closest('.mjn-focus-return')) return;
    window.setTimeout(apply, 0);
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
  window.setTimeout(apply, 120);
  new MutationObserver(function () { apply(); }).observe(document.documentElement, { childList: true, subtree: true });
})();