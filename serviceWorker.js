const cacheName = "nicobako";

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) =>
        cache.addAll([
          "/index.html",
          "/favicon.ico",
          "/manifest.webmanifest",
          "/static/css/reset.css",
          "/static/css/style.css",
          "/static/img/nico-bako.png",
          "/static/js/components/index.js",
          "/static/js/components/my-article.js",
          "/static/js/components/toggle-visibility.js",
          "/static/js/components/internal-link-navigator.js",
          "/static/js/components/reading-practice.js",
          "/static/js/components/words.js",
        ])
      )
  );
});

self.addEventListener("fetch", (event) => {
  // Let the browser do its default thing
  // for non-GET requests.
  if (event.request.method !== "GET") return;

  // Prevent the default, and handle the request ourselves.
  event.respondWith(
    (async () => {
      // Try to get the response from a cache.
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(event.request);

      if (cachedResponse) {
        // If we found a match in the cache, return it, but also
        // update the entry in the cache in the background.
        event.waitUntil(cache.add(event.request));
        console.log("resource found in cache");
        return cachedResponse;
      } else {
        // If we didn't find a match in the cache, use the network.
        console.error("resource not found in cache: ", event.request);
        return fetch(event.request);
      }
    })()
  );
});
