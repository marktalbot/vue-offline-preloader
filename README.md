# Vue Offline Preloader

This is a Vue component that uses Service Workers to enable offline experiences and preloading/caching of assets for improved performance. 

## Installation and Usage (macOS/Linux/Unix-like)

#### Step 1: Install Package

Install via npm:

```
$ npm install vue-offline-preloader
```

#### Step 2: Install Service Worker

In your project's **public root**, create a symbolic link to `worker.js` found in the package `src` folder:

```bash
ln -s ./node_modules/vue-offline-preloader/src/worker.js worker.js
```

#### Step 3: Register the Component

Register the component with Vue:

```javascript

import VueOfflinePreloader from 'vue-offline-preloader';

new Vue({
    el: '#app',
    components: {
        'vue-offline-preloader': VueOfflinePreloader
    }
});
```

#### Step 4: Add Component to Template

Add component to your template:

```html
<vue-offline-preloader 
    v-bind:assets="[
        '/',
        'images/logo.svg',
        'images/profile.png'
    ]"
></vue-offline-preloader>
```
_Note: In order to enable an offline experience you'll need to include "/" in the assets array (see above example)_

---

## Props

| Prop             | Type                  | Default      | Required     | Description  |
| ---------------- |-----------------------| -------------|--------------|--------------|
| assets           | Array&lt;string&gt;   |              | **required** | Collection of asset files to be cached |
| namespace        | string                | "vue"        | optional     | Namespace for resource cache |
| version          | string                | "v1"         | optional     | Version of resource cache |
| scope            | string                | "/"          | optional     | Scope of the Sevice Worker's control |
| worker           | string                | "/worker.js" | optional     | Location of the Service Worker file. Defaults to app's public root |
| showPreloaderBar | boolean               | true         | optional     | Display progress bar |
| backgroundColor  | string                | "#29d"       | optional     | Background colour of progress bar |
| debug            | boolean               | false        | optional     | Flag to display console.log debugging messages from Service Worker |

## Events

| Event                              | Description  |
| -----------------------------------|--------------|
| serviceWorker.register.success     | The service worker has been successfully registered  |
| serviceWorker.register.error       | There was a problem registering the service worker  |
| serviceWorker.preloading.asset     | An asset has been preloaded successfully  |
| serviceWorker.preloading.complete  | Asset preloading is complete  |


## Basic Event Example

```javascript
document.addEventListener('serviceWorker.preloading.asset', () => {
    console.log('asset loaded!');
});
```

## Browser Support

This package requires Service Worker support which currently includes Firefox 52+, Chrome 49+, Opera 45+, Chrome for Android 59+.

For an current list of browsers please see: [Can I Use](http://caniuse.com/#feat=serviceworkers)

## Notes

- This package will work through `localhost`, however once deployed you will need to have HTTPS as it is a requirement for Service Workers.

## Todo
- [ ] Write tests