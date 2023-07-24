const cacheName = 'nicobako';

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) =>
        cache.addAll([
          "/",
          "/index.html",
          "/static/styles.css",
          "/static/reset.css",
          "/static/nico-bako.png",
          "https://md-block.verou.me/md-block.js",
            "https://unpkg.com/htmx.org@1.9.2",
            "https://unpkg.com/hyperscript.org@0.9.8",
        ]),
      ),
  );
});

// Our service worker will intercept all fetch requests
// and check if we have cached the file
// if so it will serve the cached file
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});