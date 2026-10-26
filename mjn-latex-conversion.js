/* MJN COURS — conversion des fractions, racines et angles HTML vers LaTeX.
   Conserve le contenu interactif et traite aussi les exercices injectés dynamiquement. */
(function () {
  'use strict';
  if (window.__mjnLatexConversionInstalled) return;
  window.__mjnLatexConversionInstalled = true;

  var selector = '.mjn-radical, .fr, .mjn-angle-notation, .mjn-angle3, .hat';
  var skip = 'script,style,noscript,textarea,input,select,option,button,svg,math,code,pre,mjx-container';

  function escText(s) {
    return String(s).replace(/\\/g, '\\backslash ')
      .replace(/&/g, '\\&').replace(/%/g, '\\%').replace(/#/g, '\\#')
      .replace(/_/g, '\\_');
  }
  function textTex(s) {
    s = String(s).replace(/\u00a0/g, ' ').replace(/[\t\r\n]+/g, ' ');
    s = s.replace(/×/g, '\\times ').replace(/÷/g, '\\div ')
      .replace(/−/g, '-').replace(/≤/g, '\\leq ').replace(/≥/g, '\\geq ')
      .replace(/≠/g, '\\ne ').replace(/≈/g, '\\approx ')
      .replace(/π/g, '\\pi ').replace(/°/g, '^\\circ ');
    if (!s.trim()) return ' ';
    if (/^[\s\d.,+\-−×÷=<>≤≥≠≈π°(){}\[\]|:;!%]+$/.test(s)) return s;
    return s.split(/(\s+|[+\-=×÷≤≥≠≈(),;:])/).filter(Boolean).map(function (part) {
      if (/^\s+$/.test(part)) return ' ';
      if (/^[+\-=×÷≤≥≠≈(),;:]$/.test(part)) return textTex(part);
      if (/^[A-Za-z]$/.test(part)) return part;
      if (/^\d+(?:[.,]\d+)?$/.test(part)) return part.replace(',', '{,}');
      return '\\text{' + escText(part) + '}';
    }).join('');
  }
  function tex(node) {
    if (node.nodeType === 3) return textTex(node.nodeValue);
    if (node.nodeType !== 1 || node.matches(skip)) return '';
    var cls = node.classList;
    if (cls.contains('mjn-radical')) {
      var content = node.querySelector('.mjn-radical-content');
      return '\\sqrt{' + (content ? childrenTex(content) : childrenTex(node)) + '}';
    }
    if (cls.contains('fr')) {
      var parts = node.children;
      if (parts.length >= 2) return '\\frac{' + childrenTex(parts[0]) + '}{' + childrenTex(parts[1]) + '}';
    }
    if (cls.contains('mjn-angle-notation') || cls.contains('mjn-angle3') || cls.contains('hat')) {
      var letters = node.textContent.replace(/\s+/g, '');
      return letters ? '\\widehat{' + letters.replace(/[^A-Za-z0-9]/g, '') + '}' : '';
    }
    if (node.tagName === 'SUP') return '^{'+childrenTex(node)+'}';
    if (node.tagName === 'SUB') return '_{'+childrenTex(node)+'}';
    if (node.tagName === 'BR') return ' ';
    return childrenTex(node);
  }
  function childrenTex(node) {
    return Array.prototype.map.call(node.childNodes, tex).join('');
  }
  function topmost(root) {
    var found = [];
    if (root.nodeType === 1 && root.matches && root.matches(selector) && !root.closest(skip)) found.push(root);
    if (root.querySelectorAll) {
      root.querySelectorAll(selector).forEach(function (el) {
        if (!el.closest(skip) && !el.parentElement.closest(selector)) found.push(el);
      });
    }
    return found;
  }
  function ensureMathJax() {
    if (window.MathJax && MathJax.typesetPromise) return Promise.resolve();
    if (window.__mjnMathJaxLoading) return window.__mjnMathJaxLoading;
    window.MathJax = window.MathJax || {
      tex: { inlineMath: [['\\\\(', '\\\\)'], ['
    topmost(root).forEach(function (el) {
      if (el.dataset.mjnLatexDone === '1') return;
      var latex = tex(el).trim();
      if (!latex || /\\text\{\s*\}/.test(latex)) return;
      var wrapper = document.createElement('span');
      wrapper.className = 'mjn-latex-converted';
      wrapper.textContent = '\\(' + latex + '\\)';
      el.dataset.mjnLatexDone = '1';
      el.replaceWith(wrapper);
    });
    ensureMathJax().then(function () {
      if (window.MathJax && MathJax.typesetPromise) {
        var targets = root.nodeType === 1 ? [root] : [document.body];
        return MathJax.typesetPromise(targets).catch(function () {});
      }
    });
  }
  function start() {
    convert(document.body);
    if (!window.MutationObserver) return;
    var queued = false, changed = [];
    new MutationObserver(function (records) {
      records.forEach(function (record) {
        record.addedNodes.forEach(function (node) {
          if (node.nodeType === 1 && !node.matches(skip)) changed.push(node);
        });
      });
      if (queued || !changed.length) return;
      queued = true;
      Promise.resolve().then(function () {
        queued = false;
        var batch = changed.splice(0);
        batch.forEach(convert);
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
, '
    topmost(root).forEach(function (el) {
      if (el.dataset.mjnLatexDone === '1') return;
      var latex = tex(el).trim();
      if (!latex || /\\text\{\s*\}/.test(latex)) return;
      var wrapper = document.createElement('span');
      wrapper.className = 'mjn-latex-converted';
      wrapper.textContent = '\\(' + latex + '\\)';
      el.dataset.mjnLatexDone = '1';
      el.replaceWith(wrapper);
    });
    if (window.MathJax && MathJax.typesetPromise) {
      var targets = root.nodeType === 1 ? [root] : [document.body];
      MathJax.typesetPromise(targets).catch(function () {});
    }
  }
  function start() {
    convert(document.body);
    if (!window.MutationObserver) return;
    var queued = false, changed = [];
    new MutationObserver(function (records) {
      records.forEach(function (record) {
        record.addedNodes.forEach(function (node) {
          if (node.nodeType === 1 && !node.matches(skip)) changed.push(node);
        });
      });
      if (queued || !changed.length) return;
      queued = true;
      Promise.resolve().then(function () {
        queued = false;
        var batch = changed.splice(0);
        batch.forEach(convert);
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
]], displayMath: [['\\\\[', '\\\\]'], ['$', '$']] },
      options: { skipHtmlTags: ['script','noscript','style','textarea','pre','code'] },
      startup: { typeset: false }
    };
    window.__mjnMathJaxLoading = new Promise(function(resolve) {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      script.onload = function() { resolve(); };
      script.onerror = function() { resolve(); };
      document.head.appendChild(script);
    });
    return window.__mjnMathJaxLoading;
  }
  function convert(root) {
    topmost(root).forEach(function (el) {
      if (el.dataset.mjnLatexDone === '1') return;
      var latex = tex(el).trim();
      if (!latex || /\\text\{\s*\}/.test(latex)) return;
      var wrapper = document.createElement('span');
      wrapper.className = 'mjn-latex-converted';
      wrapper.textContent = '\\(' + latex + '\\)';
      el.dataset.mjnLatexDone = '1';
      el.replaceWith(wrapper);
    });
    if (window.MathJax && MathJax.typesetPromise) {
      var targets = root.nodeType === 1 ? [root] : [document.body];
      MathJax.typesetPromise(targets).catch(function () {});
    }
  }
  function start() {
    convert(document.body);
    if (!window.MutationObserver) return;
    var queued = false, changed = [];
    new MutationObserver(function (records) {
      records.forEach(function (record) {
        record.addedNodes.forEach(function (node) {
          if (node.nodeType === 1 && !node.matches(skip)) changed.push(node);
        });
      });
      if (queued || !changed.length) return;
      queued = true;
      Promise.resolve().then(function () {
        queued = false;
        var batch = changed.splice(0);
        batch.forEach(convert);
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
