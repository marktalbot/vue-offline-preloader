const ACTIONS = {
    INITIALIZE: 'INITIALIZE',
    PRELOAD: 'PRELOAD',
    PRELOADING_COMPLETED: 'PRELOADING_COMPLETED',
    RESOURCE_PRELOADED: 'RESOURCE_PRELOADED',
};

export default class Preloader {

    constructor({ namespace, version, assets, scope, worker, debug }) {
        this.namespace = namespace;
        this.version = version;
        this.assets = assets;
        this.scope = scope;
        this.worker = worker;
        this.debug = debug;
        this.numberOfAssetsLoaded = 0;
        this.messageChannel;
        this.bootstrap();
    }

    bootstrap() {
        if (!this.supportsServiceWorker) {
            this.debug && console.warn('Service Workers are not supported in this browser.');
            return;
        }

        this.registerServiceWorker()
            .then(this.initalizeMessaging.bind(this))
            .then(this.initalizeServiceWorker.bind(this))
            .then(this.preloadAssets.bind(this)
        );
    }

    get totalNumberOfAssets() {
        return this.assets.length || 0;
    }

    get percentageLoaded() {
        this.numberOfAssetsLoaded++;
        return Math.round((this.numberOfAssetsLoaded / this.totalNumberOfAssets) * 100);
    }

    emit(event, data = null) {
        document.dispatchEvent(new CustomEvent(event, data));
    }

    supportsServiceWorker() {
        return 'serviceWorker' in navigator;
    }

    registerServiceWorker() {
        return navigator.serviceWorker.register(this.worker, { scope: this.scope }).then(() => {
            this.debug && console.log('🔧 Registered service worker');
            this.emit('serviceWorker.register.success');
            return navigator.serviceWorker.ready;
        }).catch((error) => {
            console.log('Boo!', error);
            this.emit('serviceWorker.register.error');
        });
    }

    initalizeMessaging() {
        this.debug && console.log('🔧 Initalized messaging');
        this.messageChannel = new MessageChannel();
        this.messageChannel.port1.onmessage = this.handleMessageFromServiceWorker.bind(this);
    }

    initalizeServiceWorker() {
        this.debug && console.log('🔧 Initalized service worker');
        navigator.serviceWorker.controller.postMessage({
            type: ACTIONS.INITIALIZE,
            payload: {
                namespace: this.namespace,
                version: this.version,
                debug: this.debug,
                messageChannelPort: this.messageChannel.port2,
            }
        }, [this.messageChannel.port2]);
    }

    preloadAssets() {
        this.debug && console.log('🚚 Preloading assets...');
        navigator.serviceWorker.controller.postMessage({
            type: ACTIONS.PRELOAD,
            payload: this.assets,
        });
    }

    handleMessageFromServiceWorker(event) {
        switch (event.data.type) {
            case ACTIONS.RESOURCE_PRELOADED:
                this.debug && console.log('📦', event.data.payload.asset);
                this.emit('serviceWorker.preloading.asset', {
                    detail: { percentageLoaded: this.percentageLoaded }
                });
                break;
            case ACTIONS.PRELOADING_COMPLETED:
                this.debug && console.log('✅ Preloading complete');
                this.emit('serviceWorker.preloading.complete');
                break;
            default:
            break;
        }
    }
}
