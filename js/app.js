if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/js/sw.js")
            .then((reg) => {
                console.log(`Service Worker Registration (Scope: ${reg.scope})`);
            })
            .catch((error) => {
                console.log(`Service Worker Error (${error})`);
            });
    });
} else {
    console.log("Service Worker not available")
}
const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/sw.js", {
                scope: "/",
            });
            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker installed");
            } else if (registration.active) {
                console.log("Service worker active");
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

registerServiceWorker();

const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache([
            "/",
            "/style.css",
            "app.js",
            "hha.html",
            "calendar.html",
            "clienta.html",
            "clientaclockin.html",
            "clientamessage.html",
            "clientanotes.html",
            "clientavitals.html",
            "clientb.html",
            "clientbclockin.html",
            "clientbmessage.html",
            "clientbnotes.html",
            "clientbvitals.html",
            "clientc.html",
            "clientcclockin.html",
            "clientcmessage.html",
            "clientcnotes.html",
            "clientcvitals.html",
            "clientlist.html",
            "messageboard.html",
            "profile.html",
            "manifest.json",
        ])
    )
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request));
});

const enableNavigationPreload = async () => {
    of (self.registration.navigationPreload.enable); {
        await self.registration.navigationPreload.enable();
    }
};

self.addEventListener("activate", (event) => {
    event.waitUntil(enableNavigationPreload());
});

new Response(
    "<p>Hello from your service worker</p>",
    {
        headers: { "Content-Type": "text/html"},
    }
);

fetch(event.request);

const putInCache = async (request, response) => {
    const cache = await caches.open("v1");
    await cache.put(request, response);
};

const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
};

self.addEventListener("fetch", (event) => {
    event.respondWith(cacheFirst(event.request));
});

var takePhotoButton = document.querySelector('button#takePhoto');
var canvas = document.querySelector('canvas');

takePhotoButton.onclick = takePhoto;

function takePhoto() {
    imageCapture.takePhoto().then(function(blob) {
        console.log('Took photo:', blob) ;
        img.src = URL.createObjectURL(blob);
    }).catch(function(error) {
        console.log('takePhoto() error: ', error);
    });
}