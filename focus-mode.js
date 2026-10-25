/* MJN COURS — mode lecture sans distractions */
(function () {
  'use strict';
  var style = document.createElement('style');
  style.id = 'mjn-focus-mode-style';
  style.textContent = `
    body.mjn-course-focus { background-image: none !important; }
    body.mjn-course-focus > .top,
    body.mjn-course-focus header.top,
    body.mjn-course-focus .layout > #nav,
    body.mjn-course-focus .layout > nav,
    body.mjn-course-focus > footer,
    body.mjn-course-focus footer.wrap,
    body.mjn-course-focus .foot { display: none !important; }
    body.mjn-course-focus .layout { display: block !important; margin: 0 !important; padding: 0 !important; }
    body.mjn-course-focus #main,
    body.mjn-course-focus #app,
    body.mjn-course-focus main.wrap {
      width: 100% !important; max-width: none !important; margin: 0 !important;
      padding: 14px clamp(12px, 3vw, 40px) 36px !important;
      min-height: 100vh; box-sizing: border-box;
    }
    body.mjn-course-focus #app > .mjn-focus-return,
    body.mjn-course-focus #main > .mjn-focus-return {
      display: flex; position: sticky; top: 0; z-index: 50; align-items: center;
      width: fit-content; max-width: 100%; gap: 8px; margin: 0 0 16px;
      padding: 10px 16px; border: 1px solid #b8d2ff; border-radius: 14px;
      background: var(--card, #fff); color: #1769d2; box-shadow: 0 2px 12px #14284b12;
      font: 700 1rem/1.2 system-ui, sans-serif; cursor: pointer;
    }
    body.mjn-course-focus .subnav { top: 58px !important; }
    body.mjn-course-focus .band { margin-top: 4px; }
    body.mjn-course-focus .sheet { max-width: none; }
    @media (max-width: 600px) {
      body.mjn-course-focus #main, body.mjn-course-focus #app, body.mjn-course-focus main.wrap {
        padding: 10px 10px 28px !important;
      }
      body.mjn-course-focus #app > .mjn-focus-return,
      body.mjn-course-focus #main > .mjn-focus-return { font-size: .94rem; padding: 9px 13px; }
    }
    @media print {
      body.mjn-course-focus #app > .mjn-focus-return,
      body.mjn-course-focus #main > .mjn-focus-return { display: none !important; }
    }`;
  document.head.appendChild(style);

  function inChapter() {
    var h = (location.hash || '').replace(/^#\/?/, '');
    return /^ch\/[^/]+(?:\/.*)?$/.test(h);
  }
  function addReturnButton() {
    var root = document.getElementById('app') || document.getElementById('main');
    if (!root) return;
    var old = root.querySelector(':scope > .mjn-focus-return');
    if (old) old.remove();
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'mjn-focus-return';
    b.innerHTML = '<span aria-hidden="true">←</span><span>Retour aux chapitres</span>';
    b.addEventListener('click', function () {
      location.hash = (location.hash || '').indexOf('#/ch/') === 0 ? '#/chapitres' : '#chapitres';
      if (location.hash === '#chapitres' && !document.querySelector('nav.tabs a[href="#chapitres"]')) location.hash = '#accueil';
    });
    root.insertBefore(b, root.firstChild);
  }
  function apply() {
    var active = inChapter();
    document.body.classList.toggle('mjn-course-focus', active);
    if (active) {
      addReturnButton();
      window.scrollTo(0, 0);
    } else {
      var root = document.getElementById('app') || document.getElementById('main');
      var old = root && root.querySelector(':scope > .mjn-focus-return');
      if (old) old.remove();
    }
  }
  window.addEventListener('hashchange', function () { window.setTimeout(apply, 0); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
  window.setTimeout(apply, 100);
})();
