console.log('success');

self.addEventListener('install',evt => {
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
  evt.waitUntil(
    caches.open('storage').then(function(cache){
      cache.addAll(files);
      })
  )
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      if(response){
        return response;
      }
      else {
        fetch(evt.request);
      }
    }).catch((reject) => {
      console.log('unsuccessful');
    })
  )
});
