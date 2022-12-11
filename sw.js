const staticCache = "Static-v"
const dynamicCache = "Dynamic-cache-v1"

const assets = (
    "/",
    "/hha.html",
    "/fallback.html",
    "/calendar.html",
    "/clienta.html",
    "/clientaclockin.html",
    "/clientamessage.html",
    "/clientanotes.html",
    "/clientatodo.html",
    "/clientavitals.html",
    "/clientb.html",
    "/clientbclockin.html",
    "/clientbmessage.html",
    "/clientbnotes.html",
    "/clientbtodo.html",
    "/clientbvitals.html",
    "/clientc.html",
    "/clientcclockin.html",
    "/clientcmessage.html",
    "/clientcnotes.html",
    "/clientctodo.html",
    "/clientcvitals.html",
    "/clientlist.html",
    "/messageboard.html",
    "/profile.html",
    "/js/app.js",
    "/js/materialize.min.js",
    "https://fonts.googleapis.com/icon?family-Material+Icons"
);

// self.addEventListener('install', function (event) {
//     event.waitUntil(
//         caches.open('staticCache').then(function (cache) {
//             return cache.addAll(assets);
//         })
//     );
// });

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open('staticCache')
        .then((cache) => {
            return cache.addAll('staticCache')
        })
        .catch((error) => {
            console.error(err)
        })
    );
})

self.addEventListener("activate", function (event) {
    //console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(
        caches.keys().then((keys => {
            return Promise.all(
                keys
                .filter(key => key !== staticCache)
                .map((key) => caches.delete(key))
            )
        })
    ));
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            return response || fetch(event.request);
        })
    );
});

// self.addEventListener("fetch", function (event) {
//     //console.log(`SW: Fetching ${event.request.url}`);
//     event.respondWith(
//         caches
//         .match(event.request)
//         .then((response) => {
//             return (
//                 response || 
//                 fetch(event.request).then(fetchClients => {
//                     return caches.open(dynamicCache).then(cache => {
//                         cache.put(event.request.url, fetchClients.clone())
//                         return fetchClients;
//                     })
//                 })
//             );
//         // if(response) {
//         //     return response
//         // } else {
//         //     return fetch(event.request);
//         // }
//         }).cache(() => caches.match("/fallback.html"))
//     );
// });