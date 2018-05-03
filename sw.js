var CACHE_NAME = 'restaurant-v7';

//Assests
var assets = [
  './',
  './index.html',
  './restaurant.html',
  './dist/css/styles.css',
  './dist/js/idb.js',
  './dist/js/dbhelper.js',
  './dist/js/main.js',
  './dist/js/restaurant_info.js',
  './dist/js/dlib.js',
  './dist/js/swipe.js',
  './dist/js/ui.js',
  './dist/img/1.jpg',
  './dist/img/2.jpg',
  './dist/img/3.jpg',
  './dist/img/4.jpg',
  './dist/img/5.jpg',
  './dist/img/6.jpg',
  './dist/img/7.jpg',
  './dist/img/8.jpg',
  './dist/img/9.jpg',
  './dist/img/10.jpg',
  './dist/img/icons/menu.svg',
  './dist/img/icons/cross.svg',
  './restaurant.html?id=1',
  './restaurant.html?id=2',
  './restaurant.html?id=3',
  './restaurant.html?id=4',
  './restaurant.html?id=5',
  './restaurant.html?id=6',
  './restaurant.html?id=7',
  './restaurant.html?id=8',
  './restaurant.html?id=9',
  './restaurant.html?id=10'
];

//register the service worker

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js', { scope: "./" })
    .then(function (response) {
      console.log("Service worker registered")
    })
    .catch(function (err) {
      console.log("Failed to register sw");
    });
}

//Install a service worker
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('restaurant')
      .then(function (cache) {
        cache.addAll(assets);
      })
  );

});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
    .then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      if (res) return res;
      else {
        return fetch(e.request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(e.request.url, response.clone());
            return response;
          }).catch(err => caches.match(e.request));
        });
      }
    })
  );
});
