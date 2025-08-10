const CACHE_NAME = "espenotes-cache-v1";

const FILES_TO_CACHE = [
  "./", // raíz
  "./index.html",
  "./manifest.webmanifest.json",
  "./src/css/app.css",
  "./src/js/app.js",
  "./src/img/icons/icono-144x144.png",
  "./src/img/icons/icono-192x192.png",
  "./src/img/icons/icono-256x256.png",
  "./src/img/icons/icono-384x384.png",
  "./src/img/icons/icono-512x512.png",
  "./src/img/blqueEspe.jpeg",
  "./src/img/espe_fondo.png"
];

// INSTALL: Cachear archivos del App Shell
self.addEventListener("install", (event) => {
  console.log("Instalando y cacheando App Shell...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVATE: Limpiar caches antiguos
self.addEventListener("activate", (event) => {
  console.log("Service Worker activado");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Eliminando caché viejo:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH: Estrategia "Cache First"
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          caches.match("./index.html")
        )
      );
    })
  );
});
