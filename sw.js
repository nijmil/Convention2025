const CACHE_NAME = 'clogging-convention-cache-v3'; // Incremented version number
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/images/convention-icon-72x72.png',
    '/images/convention-icon-96x96.png',
    '/images/convention-icon-144x144.png',
    '/images/convention-icon-192x192.png',
    '/images/convention-icon-512x512.png'
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.skipWaiting(); // Forces waiting service worker to activate immediately
    self.clients.claim(); // Ensures the service worker controls all pages
});

// Serve cached assets when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
