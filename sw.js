const CACHE_NAME = 'checklist-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// Instala o Service Worker e faz o cache dos arquivos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições para carregar mais rápido
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o que está no cache ou faz a requisição na rede
        return response || fetch(event.request);
      })
  );
});
