const files = [
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/css/styles.css',
  '/index.html',
  '/restaurant.html'
];

/*
Store cached files from 'files' array
*/
self.addEventListener('install',evt => {
  console.log('Installed');
  evt.waitUntil(
    caches.open('storage').then(cache => {
      console.log('Cached Files Installed:',files);
      return cache.addAll(files);
      })
  )
});

/*
Show cache content offline
*/
self.addEventListener('fetch', evt => {
  console.log('Fetched',evt.request.url);
    evt.respondWith(
      caches.match(evt.request).then((response) => {
        if(response){
          console.log('Its already in the Cache',response);
          return response;
        }
        else {
          return fetch(evt.request);
           caches.open('storage').then(cache => {
            console.log('storing new files in cache',response);
            cache.put(evt.request);
            return fetch(response);
          })
        }
      }).catch((reject) => {
        console.log('unsuccessful',reject);
      })
    )
});
