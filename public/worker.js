importScripts('/js/serviceworker-cache-polyfill.js');

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('cache')
            .then(function(cache) {
                return cache.addAll([
                    '/css/styles.css',
                    '/js/main.js'
                ]);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            var fetchRequest = event.request.clone();
            return fetch(fetchRequest)
                .then(function(r) {
                    if(!r || r.status !== 200 || r.type !== 'basic') {
                        return r;
                    }
                    var responseToCache = r.clone();
                    caches.open('cache').then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                    return r;
                });
        })
    );
});