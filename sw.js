const CACHE_NAME = "pwa-cache-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/main.js",
  "/js/translations.js",
  "/fonts/interMedium.ttf",
  "/icons/close.png",
  "/icons/false.png",
  "/icons/help.png",
  "/icons/menu.png",
  "/icons/shuffle.png",
  "/icons/s192.png",
  "/icons/true.png",
  "/icons/s-favicon.png",
  "/offline.html",
];

// Install Service Worker and cache files
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("Caching files...");
      for (const url of urlsToCache) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch ${url}`);
          await cache.put(url, response);
        } catch (error) {
          console.error("Failed to cache:", url, error);
        }
      }
    })
  );
});

// Serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          return caches.match("./offline.html"); // Show offline page
        })
      );
    })
  );
});

// Remove old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
