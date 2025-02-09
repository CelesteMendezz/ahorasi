self.addEventListener('install', event => {
    console.log('Service Worker: Instalado');
    event.waitUntil(
        caches.open('mi-cache-v1').then(cache => {
            return cache.addAll([
                "/",
                "/Index.html",
                "/Contactanos.html",
                "/Oferta_educativa.html",
                "/plan.html",
                "/estilos.css",
                "/ofertaE.css",
                "/plan.css",
                "/manifest.json",
                "/app.js",
                "/offline.html",
                "/imagenes/actitud.png",
                "/imagenes/beca.png",
                "/imagenes/benemerita.png",
                "/imagenes/conocimiento.png",
                "/imagenes/escudo.png",
                "/imagenes/escuelasuperior.png",
                "/imagenes/graduacion.png",
                "/imagenes/icon.png",
                "/imagenes/icono1.png",
                "/imagenes/icono2.png",
                "/imagenes/inicio_cap.png",
                "/imagenes/itson.png",
                "/imagenes/logo_unam.png",
                "/imagenes/mujer-removebg-preview.png",
                "/imagenes/multitalentoso.png",
                "/imagenes/papeleria.png",
                "/imagenes/par_students-removebg-preview.png",
                "/imagenes/plan_cap.png",
                "/imagenes/planeta-tierra.png",
                "/imagenes/profesional.jpg",
                "/imagenes/public-service.png",
                "/imagenes/Software.jpg",
                "/imagenes/unam.jpg",
                "/imagenes/valor.png",
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d481940.39948932175!2d-99.76114982656249!3d19.318889500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce00071fca0bad%3A0x9989fa5b4f526717!2sUniversidad%20Nacional%20Aut%C3%B3noma%20de%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1737595528056!5m2!1ses!2smx"
            ]);
        })
    );
});



self.addEventListener('activate', event => {
    console.log('Service Worker: Activado');
    const cacheWhitelist = ['mi-cache-v1'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) 
                    {
                      return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetch', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
        .catch(() => {
            return caches.match('/offline.html').then(response => {
                return response || new Response('Offline', { status: 500 });
            });
        })
    );
});


self.addEventListener('sync', event => {
    if (event.tag === 'sincronizar-datos') {
        console.log('Service Worker: Sincronizando datos');
        event.waitUntil(Promise.resolve()); 
    }
});
