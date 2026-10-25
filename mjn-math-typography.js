/* MJN COURS — distinction visuelle entre la variable x et le signe × */
(function () {
  'use strict';
  if (document.getElementById('mjn-math-typography-style')) return;
  var style = document.createElement('style');
  style.id = 'mjn-math-typography-style';
  style.textContent = '.mjn-variable-x{font-family:"Cambria Math","STIX Two Math","Times New Roman",serif!important;font-style:italic!important;font-weight:400;letter-spacing:.01em}';
  document.head.appendChild(style);

  var skip = 'script,style,noscript,textarea,input,select,option,button,svg,math,code,pre,.mjn-variable-x';
  function convert(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !/[xX]/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        var p = node.parentElement;
        if (!p || p.closest(skip)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var value = node.nodeValue;
      var re = /(^|[^A-Za-zÀ-ÿ0-9])([xX])(?=$|[^A-Za-zÀ-ÿ0-9])/g;
      var last = 0, match, frag = document.createDocumentFragment(), found = false;
      while ((match = re.exec(value))) {
        found = true;
        if (match.index > last) frag.appendChild(document.createTextNode(value.slice(last, match.index)));
        frag.appendChild(document.createTextNode(match[1]));
        var span = document.createElement('span');
        span.className = 'mjn-variable-x';
        span.textContent = match[2];
        span.setAttribute('aria-label', match[2] === 'x' ? 'x, variable mathématique' : 'X, variable mathématique');
        frag.appendChild(span);
        last = match.index + match[0].length;
      }
      if (found) {
        if (last < value.length) frag.appendChild(document.createTextNode(value.slice(last)));
        node.parentNode.replaceChild(frag, node);
      }
    });
  }
  function run() { convert(document.body); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  var root = document.body;
  if (root && window.MutationObserver) {
    var queued = false;
    new MutationObserver(function (records) {
      if (queued) return;
      queued = true;
      Promise.resolve().then(function () {
        queued = false;
        records.forEach(function (record) {
          record.addedNodes.forEach(function (node) {
            if (node.nodeType === 1 && !node.matches('script,style')) convert(node);
            else if (node.nodeType === 3 && node.parentElement && !node.parentElement.closest(skip)) convert(node.parentElement);
          });
        });
      });
    }).observe(root, {childList:true,subtree:true});
  }
})();
