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

//activate
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== 'restaurant' && key !== 'dynamic') {
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

//handle the cache
self.addEventListener('fetch', function (e) {
  const request = e.request;
  const url = new URL(request.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(request));
  } else {
    e.respondWith(networkFirst(request));
  }
});

async function cacheFirst(req) {
  const cachedRes = await caches.match(req);
  return cachedRes || fetch(req);
}

async function networkFirst(req) {
  const cache = await caches.open('dynamic');
  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (err) {
    return await cache.match(req);
  }
}