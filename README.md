# Vue.JS Service Worker Preloader

# Preloader

## Basic Example

#### Step 1
In your project's public root, create a symbolic link to `worker.js` found in the package `src` folder:
~~~~
ln -s /node_modules/@ep/preloader/src/worker.js worker.js
~~~~


#### Step 2
Initialize the preloader:
~~~~
new Preloader({
    namespace : 'ep',
    version   : 'v1',
    assets    : ['/', 'css/main.css', 'videos/myVideo.mp4'],
}); 
~~~~

## Options

| Option        | Type    | Default  | Description      |
| ------------- |---------| ---------|------------------|
| namespace     | string  | none          | Namespace for resource cache |
| version       | string  | none          | Version of resource cache |
| assets        | array   | none          | Collection of asset names to be cached |
| debug         | boolean | false         | Flag to display console.log debugging messages from Service Worker |
| scope         | string  | '/'           | Scope of the Sevice Worker's control |
| worker        | string  | 'worker.js'   | Location of the Service Worker file. Defaults to app's public root |

## Events

| Event                                        | Description  |
| -------------------------------------------- |--------------|
| serviceWorker.register.success               | The service worker has been successfully registered  |
| serviceWorker.register.error                 | There was a problem registering the service worker  |
| serviceWorker.preloading.asset                                 | An asset has been preloaded successfully  |
| serviceWorker.preloading.complete                          | Asset preloading is complete  |

@TODO rename: serviceWorker.preloading.asset ===> serviceWorker.preloading.asset

## Event basic example
~~~~
// main.js
document.addEventListener('asset.loaded', () => {
    console.log('asset loaded!');
});
~~~~

#### Tests

```
npm test
```

```
npm test -- --verbose
```