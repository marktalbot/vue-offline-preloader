const ACTIONS = {
    INITIALIZE           : 'INITIALIZE',
    PRELOAD              : 'PRELOAD',
    PRELOADING_COMPLETED : 'PRELOADING_COMPLETED',
    RESOURCE_PRELOADED   : 'RESOURCE_PRELOADED',
};

const CACHE = {
    namespace : undefined,
    version   : undefined,
    get name() {
        return `${this.namespace}-${this.version}`;
    },
};

let messageChannelPort;
// let debug = false;

self.addEventListener('install', (event) => {
    event.waitUntil(
        self.skipWaiting().then(() => {
            // Perform install stuff (open caches, etc)
            // caches.open(cacheName).then((cache) => {
            //     console.log('Opened cache:', cacheName);
            //     return cache.addAll(assets);
            // })
        }),
    );
});

self.addEventListener('activate', (event) => {
    // @TODO: Build this out more
});

self.addEventListener('message', (event) => {
   event.waitUntil(handleMessage(event.data));
});

// @TODO: Temp code from Google docs.... switch out
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            },
        ),
    );
});

function handleMessage(action) {
    switch (action.type) {
        case 'INITIALIZE':
            initialize(action.payload);
            break;
        case 'PRELOAD':
            preloadAll(CACHE.name, action.payload);
            break;
        default:
            break;
    }
}

function initialize(data) {
    CACHE.namespace = data.namespace;
    CACHE.version = data.version;
    messageChannelPort = data.messageChannelPort;
}

// @TODO need to build this out more
function preload(cache, asset) {
    return cache.add(asset).then(() => {
        messageChannelPort.postMessage({
            type    : ACTIONS.RESOURCE_PRELOADED,
            payload : { asset },
        });
    });
}

function preloadAll(cacheName, data) {
    return caches
        .open(cacheName)
        .then((cache) => Promise.all(data.map((asset) => preload(cache, asset))))
        .then(() => {
            messageChannelPort.postMessage({
                type    : ACTIONS.PRELOADING_COMPLETED,
                payload : {},
            });
        },
    );
}
