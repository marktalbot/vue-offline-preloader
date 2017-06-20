<template>
    <div class="preloader-progress-bar" :class="{ hidden: !showPreloaderBar, complete: loadingComplete }">
        <div class="bar" :style="{ width: percentLoaded + '%', backgroundColor: backgroundColor }">
            <div class="peg" :style="{ color: backgroundColor }"></div>
        </div>
    </div>
</template>

<script>
    import Preloader from '../classes/Preloader.js';
    
    export default {
        props: {
            assets: {
                type: Array,
                default: []
            },
            namespace: {
                type: String,
                default: 'vue'
            },
            version: {
                type: String,
                default: 'v1'
            },
            scope: {
                type: String,
                default: '/'
            },
            worker: {
                type: String,
                default: '/worker.js'
            },
            showPreloaderBar: {
                type: Boolean,
                default: true
            },
            backgroundColor: {
                type: String,
                default: '#29d'
            },
            debug: {
                type: Boolean,
                default: false
            },
        },

        data: function() {
            return {
                percentLoaded: 0,
                loadingComplete: false,
            }
        },

        created() {
            new Preloader({
                assets: this.assets,
                namespace: this.namespace,
                version: this.version,
                scope: this.scope,
                worker: this.worker,
                showPreloaderBar: this.showPreloaderBar,
                debug: this.debug,
            });

            document.addEventListener('serviceWorker.preloading.asset', (event) => {
                this.percentLoaded = event.detail.percentageLoaded;
            });
            document.addEventListener('serviceWorker.preloading.complete', (event) => {
                this.loadingComplete = true;
            });
        }
    }
</script>

<style>
    .preloader-progress-bar {
        pointer-events: none;
        opacity: 1.0;
        transition: all 2500ms ease;
    }

    .preloader-progress-bar.complete {
        opacity: 0;
    }

    .preloader-progress-bar .bar {
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        transition: all 200ms ease;
    }

    /* Blur effect */
    .preloader-progress-bar .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 0;
        height: 100%;
        box-shadow: 0 0 10px, 0 0 5px;
        opacity: 1.0;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
    }

    .hidden {
        visibility: hidden;
    }
</style>