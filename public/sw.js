/* Corner Spa offline worker.
   One job: if a visitor opens the site with no connection, show the branded
   offline page. Online traffic always goes straight to the network; page
   content is never served from cache. Precache is limited to the offline
   page and the small pebble mark it shows. */
const CACHE = "corner-spa-offline-v1";
const ASSETS = ["/offline.html", "/media/logos/mark-dark.png", "/media/logos/mark-light.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match("/offline.html"))
  );
});
