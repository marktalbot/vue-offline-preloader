// Initial lifecycle
// --------------------
// 1. download
// 2. install
// 3. activate

// basic worker events
// --------------------
// install
// message
// sync
// activate
// install
// fetch

// Temp stuff
// let namespace = 'mt';
// let version   = 'v1';
// let cacheName = `${namespace}-${version}`;
// let assets    = ['foo.png'];

const ACTIONS = {
    INITIALIZE           : 'INITIALIZE',
    PRELOAD              : 'PRELOAD',
    PRELOADING_COMPLETED : 'PRELOADING_COMPLETED',
    RESOURCE_PRELOADED   : 'RESOURCE_PRELOADED',
}

const CACHE = {
    namespace : undefined,
    version   : undefined,
    get name() {
        return `${this.namespace}-${this.version}`;
    }
};
let messageChannelPort;
let debug = false;

self.addEventListener('install', (event) => {
    // Perform install stuff (open caches, etc)
    event.waitUntil(
        self.skipWaiting().then(() => {
            console.log('EVENT: install', Date.now());
            // caches.open(cacheName).then((cache) => {
            //     console.log('Opened cache:', cacheName);
            //     return cache.addAll(assets);
            // })
        })
    );
});

self.addEventListener('activate', (event) => {
    //@TODO: Build this out more
});

self.addEventListener('message', (event) => {
   event.waitUntil(handleMessage(event.data));
});

// @TODO: Temp code from Google docs.... switch out
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                console.log('fetching...........................');
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// @TODO: Clear out old chaches with same namespace

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
    CACHE.namespace    = data.namespace;
    CACHE.version      = data.version;
    debug              = data.debug;
    messageChannelPort = data.messageChannelPort;
}

function preload(cache, asset) {
    // @TODO need to build this out more
    return cache.add(asset).then(() => {
        messageChannelPort.postMessage({
            type    : ACTIONS.RESOURCE_PRELOADED,
            payload : {},
        });
    });
}

function preloadAll(cacheName, data) {
    return caches
        .open(cacheName)
        .then((cache) => Promise.all(data.map((asset) => preload(cache, asset))))
        .then(() => {
            // @TODO Extract actions into own file and import into Preloader.js and worker.js (Will this break the worker if it's being sym linked?)
            messageChannelPort.postMessage({
                type    : ACTIONS.PRELOADING_COMPLETED,
                payload : {},
            });
        }
    );
}