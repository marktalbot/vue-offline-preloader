const ACTIONS = {
    INITIALIZE: 'INITIALIZE',
    PRELOAD: 'PRELOAD',
    PRELOADING_COMPLETED: 'PRELOADING_COMPLETED',
    RESOURCE_PRELOADED: 'RESOURCE_PRELOADED',
};

const CACHE = {
    namespace: undefined,
    version: undefined,
    get name() {
        return `${this.namespace}-${this.version}`;
    },
};

let messageChannelPort;

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

self.addEventListener('install', (event) => {
    event.waitUntil(
        self.skipWaiting().then(() => {
            console.info('Service Worker Installed', Date.now());
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        self.clients.claim().then(() => {
            console.info('Service Worker Activated', Date.now());
        })
    );
});

self.addEventListener('message', (event) => {
   event.waitUntil(handleMessage(event.data));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
               if (response) {
                   return response;
               }
               return fetch(event.request);
           }
        )
    );
});

function initialize(data) {
    CACHE.namespace = data.namespace;
    CACHE.version = data.version;
    messageChannelPort = data.messageChannelPort;
    debug = data.debug;

    return Promise.resolve()
        .then(() => caches.keys()) // cleaning old cache keys
        .then((keys) => Promise.all(keys.map(removeCache)))
        .then((keys) => {
            debug && console.log('Offline Service Worker', 'Cache cleaned', keys.filter(key => key), Date.now());
        }
    );
}

function preload(cache, asset) {
    return cache.add(asset).then(() => {
        messageChannelPort.postMessage({
            type: ACTIONS.RESOURCE_PRELOADED,
            payload: { asset },
        });
    });
}

function removeCache(key) {
    return new Promise((resolve) => {
            const regex = new RegExp(`${CACHE.namespace}-`);
            if (regex.test(key) && key != CACHE.name) {
                caches.delete(key);
                resolve(key);
            }
            resolve();
        }
    );
}

function preloadAll(cacheName, data) {
    return caches
        .open(cacheName)
        .then((cache) => Promise.all(data.map((asset) => preload(cache, asset))))
        .then(() => {
            messageChannelPort.postMessage({
                type: ACTIONS.PRELOADING_COMPLETED,
                payload: {},
            });
        },
    );
}
