const cacheName = 'nicobako';

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) =>
        cache.addAll([
          "/",
          "/index.html",
          "/static/pico.min.css",
          "/static/nico-bako.png",
          "/pages/about_me.html",
          "/pages/about_site.html",
          "/pages/other_work.html",
          "/pages/other_links.html",
          "https://unpkg.com/htmx.org@1.9.2",
          "https://unpkg.com/hyperscript.org@0.9.8",
        ]),
      ),
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
      }

      // If we didn't find a match in the cache, use the network.
      console.log("resource not found in cache");
      return fetch(event.request);
    })(),
  );
});
