# Vue Offline Preloader

@TODO: write a blurb about the package

### Installation and Usage

##### Step 1: Installation

```
$ npm install vue-offline-preloader
```

##### Step 2: Install Service Worker

In your project's public public root, create a symbolic link to `worker.js` found in the package `src` folder:

```bash
ln -s ./node_modules/vue-offline-preloader/src/worker.js worker.js
```


##### Step 3: Register the Component
Register the component:

```javascript

import VueOfflinePreloader from 'vue-offline-preloader';

new Vue({
    el: '#app',
    components: {
        'vue-offline-preloader': VueOfflinePreloader
    }
});
```

##### Step 4: Add Component to Template

Add component to the top of your template:

```html
<vue-offline-preloader 
    v-bind:assets="[
        '/',
        'images/logo.svg',
        'images/profile.png'
    ]"
></vue-offline-preloader>
```

---

### Props

| Prop             | Type                  | Default      | Required | Description  |
| ---------------- |-----------------------| -------------|----------|--------------|
| assets           | Array&lt;string&gt;   |              | required | Collection of asset files to be cached |
| namespace        | string                | "vue"        | optional | Namespace for resource cache |
| version          | string                | "v1"         | optional | Version of resource cache |
| scope            | string                | "/"          | optional | Scope of the Sevice Worker's control |
| worker           | string                | "/worker.js" | optional | Location of the Service Worker file. Defaults to app's public root |
| showPreloaderBar | boolean               | true         | optional | Display progress bar |
| backgroundColor  | string                | "#29d"       | optional | Background colour of progress bar |
| debug            | boolean               | false        | optional | Flag to display console.log debugging messages from Service Worker |

### Events

| Event                              | Description  |
| -----------------------------------|--------------|
| serviceWorker.register.success     | The service worker has been successfully registered  |
| serviceWorker.register.error       | There was a problem registering the service worker  |
| serviceWorker.preloading.asset     | An asset has been preloaded successfully  |
| serviceWorker.preloading.complete  | Asset preloading is complete  |


### Event basic example

```javascript
// main.js
document.addEventListener('serviceWorker.preloading.asset', () => {
    console.log('asset loaded!');
});
```

#### Tests

```bash
npm test
```

```bash
npm test -- --verbose
```