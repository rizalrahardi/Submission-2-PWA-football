const CACHE_NAME = "infootball-v1";

const urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/detail.html",
    "/pages/standing.html",
    "/pages/teams.html",
    "/pages/saved.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/manifest.json",
    "/js/nav.js",
    "/js/api.js",
    "/js/idb.js",
    "/js/db.js",
    "/js/sw_index.js",
    "/js/sw_detail.js",
    "/push.js",
    "/img/icon/72x72.png",
    "/img/icon/96x96.png",
    "/img/icon/192x192.png",
    "/img/icon/512x512.png",
    "/img/icon/favicon.ico",
    "/img/slider/1.jpg",
    "/img/slider/2.jpg",
    "/img/slider/3.jpg",
    "/img/slider/4.jpg",
    "https://fonts.googleapis.com/icon?family=Material+Icons"

];

self.addEventListener("install", event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", event => {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(event.request).then(response => {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                'ignoreSearch': true
            }).then(response => {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener('push', event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: '/img/icon/72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});