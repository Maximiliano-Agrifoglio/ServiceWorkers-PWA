const nombreCache = 'apv-v7';
const archivos = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'
];


//cuando se instala el service Worker. 
self.addEventListener('install', e => {
    console.log('instalado el service worker...')
    
    e.waitUntil(
        caches.open(nombreCache)
        .then( cache => {
            console.log('cacheando...')
            cache.addAll(archivos)
        })
    )
});

//Activar el service worker. 
self.addEventListener('activate', e => {
    console.log('service worker activado.....')
    
    e.waitUntil(
        caches.keys()
        .then( keys => {
             console.log(keys)

            return Promise.all(
                keys.filter( key => key !== nombreCache)
                .map( key => caches.delete(key)) //borra los demas. 
            )
        })
    )
});

//Evento fetch para descargar archivos estatico.
self.addEventListener('fetch', e => {
     console.log('fetch...', e);

     e.respondWith(
        caches.match(e.request)
        .then( respuestaCache => {
            return respuestaCache
        })
        .catch( () => caches.match('/error.html') )
     )
});