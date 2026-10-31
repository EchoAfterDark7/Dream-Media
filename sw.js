// Dream Media v2.7: offline app shell only. No caching of external catalogue APIs or credentials.
const CACHE_NAME = 'dream-media-shell-v2.8.0';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.filter(name => name.startsWith('dream-media-shell-') && name !== CACHE_NAME)
        .map(name => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // External providers (including TMDB, AniList, posters) stay network-only.
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put('./index.html',copy)));
        }
        return response;
      }).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        return await cache.match('./index.html') || Response.error();
      })
    );
    return;
  }

  // Cache only known app shell resources, not any same-origin private data or API.
  const filename = url.pathname.slice(self.registration.scope.length ? new URL(self.registration.scope).pathname.length : 0);
  const allowed = ['index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png'];
  if (!allowed.includes(filename)) return;
  event.respondWith(
    caches.match(request, {ignoreSearch:true}).then(cached => cached || fetch(request))
  );
});
