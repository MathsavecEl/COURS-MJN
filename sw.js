/* Cache léger : les pages de cours sont mises en cache après consultation, pas toutes au premier chargement. */
const CACHE = 'mjn-cours-v31';
const CORE = [
  './',
  './index.html',
  './style.css?v=22',
  './cours.js?v=29',
  './recherche-index.js?v=7',
  './recherche-correctif.js?v=3',
  './progression.js?v=2',
  './encouragement.js?v=3',
  './mjn-latex-conversion.js?v=2',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './sources.html',
  './pedagogie.html',
  './raisonnement.html'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith('mjn-cours-') && key !== CACHE)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  const request = event.request;
  event.respondWith(
    fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy)).catch(() => {});
      }
      return response;
    }).catch(() => caches.match(request).then(cached => {
      if (cached) return cached;
      if (request.mode === 'navigate') return caches.match('./index.html');
      return Response.error();
    }))
  );
});