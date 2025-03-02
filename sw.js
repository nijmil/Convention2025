// sw.js

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

// Firebase messaging integration for background notifications
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

// Firebase configuration (use your own config here)
const firebaseConfig = {
    apiKey: "AIzaSyBJqW1l2-AO0Utpszml1r7S9exdcu1IRNo",
    authDomain: "convention-2025-44080.firebaseapp.com",
    projectId: "convention-2025-44080",
    storageBucket: "convention-2025-44080.firebasestorage.app",
    messagingSenderId: "701394776928",
    appId: "1:701394776928:web:61ed15831f15240c56a405",
    measurementId: "G-4ED38LZRH4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
    console.log('Background Message received: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };

    // Show a notification
    self.registration.showNotification(notificationTitle, notificationOptions);
});
