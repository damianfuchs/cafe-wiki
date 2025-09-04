const cacheName = 'cafewiki-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/estilos/style.css',
  '/estilos/beneficioscafe.css',
  '/estilos/contacto.css',
  '/estilos/footer.css',
  '/estilos/historia.css',
  '/estilos/tipomolienda.css',
  '/estilos/tostado.css',
  '/estilos/variedades.css',
  '/modulos/beneficioscafe.html',
  '/modulos/contacto.html',
  '/modulos/historia.html',
  '/modulos/tipomolienda.html',
  '/modulos/tostado.html',
  '/modulos/variedades.html'
  // agregá las imágenes si querés cachearlas
];

// Instalar SW y cachear archivos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

// Activar SW y limpiar caches antiguos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)))
    )
  );
});

// Interceptar requests y servir del cache
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
