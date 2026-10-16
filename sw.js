const CACHE = 'maths-interactives-v7';
const FILES = [
  './', './index.html', './style.css?v=7', './cours.js?v=7', './manifest.webmanifest',
  './maths-4e-416.html', './maths-3e-306.html', './maths-3e-312.html',
  './maths-seconde.html', './maths-premiere-specialite.html', './scratch-pas-a-pas.html',
  './icon-192.png', './icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); }
    return response;
  }).catch(() => caches.match('./index.html'))));
});
