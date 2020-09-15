const filesToCache = [
    '/',
    'Style.css',
    'Script.js',
    'Images/BG.jpg',
    'Images/bloddy-texture.jpg',
    'Index.html'
  ];
  
  const staticCacheName = 'movies-store-cache';
  
  self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
    );
  });

  self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)
  
        // TODO 4 - Add fetched files to the cache
        .then(response => {

            if (response.status === 404) {
                return caches.match('pages/404.html');
            }

            // TODO 5 - Respond with custom 404 page
            return caches.open(staticCacheName).then(cache => {
              cache.put(event.request.url, response.clone());
              return response;
            });
          });


  
      }).catch(error => {
  
        // TODO 6 - Respond with custom offline page
        console.log('Error, ', error);
        return caches.match('pages/offline.html');
  
      })
    );
  });
