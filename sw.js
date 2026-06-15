const CACHE = 'lyguy-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/favicon.svg',
  '/manifest.json',
  '/img/hero-bg.jpg',
  '/img/hero-fallback.jpg',
  '/img/bio.jpg',
  '/img/univers.jpg',
  '/img/tchad.jpg',
  '/img/aba.jpg',
  '/img/gallery-01.jpg',
  '/img/gallery-02.jpg',
  '/img/gallery-03.jpg',
  '/img/gallery-04.jpg',
  '/img/gallery-05.jpg',
  '/img/gallery-06.jpg',
  '/img/gallery-07.jpg',
  '/img/gallery-08.jpg',
  '/img/gallery-09.jpg',
  '/img/gallery-10.jpg',
  '/img/gallery-11.jpg',
  '/img/gallery-12.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
