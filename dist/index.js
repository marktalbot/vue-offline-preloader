'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["vue-component-template"] = factory();else root["vue-component-template"] = factory();
})(undefined, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // identity function for calling harmony imports with the correct context
      /******/__webpack_require__.i = function (value) {
        return value;
      };
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 3);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      function injectStyle(ssrContext) {
        __webpack_require__(8);
      }
      var Component = __webpack_require__(6)(
      /* script */
      __webpack_require__(1),
      /* template */
      __webpack_require__(7),
      /* styles */
      injectStyle,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _Preloader = __webpack_require__(2);

      var _Preloader2 = _interopRequireDefault(_Preloader);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.default = {
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
          }
        },

        data: function data() {
          return {
            percentLoaded: 0,
            loadingComplete: false
          };
        },

        created: function created() {
          var _this = this;

          new _Preloader2.default({
            assets: this.assets,
            namespace: this.namespace,
            version: this.version,
            scope: this.scope,
            worker: this.worker,
            showPreloaderBar: this.showPreloaderBar,
            debug: this.debug
          });

          document.addEventListener('serviceWorker.preloading.asset', function (event) {
            _this.percentLoaded = event.detail.percentageLoaded;
          });
          document.addEventListener('serviceWorker.preloading.complete', function (event) {
            _this.loadingComplete = true;
          });
        }
      }; //
      //
      //
      //
      //
      //
      //
      //

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var ACTIONS = {
        INITIALIZE: 'INITIALIZE',
        PRELOAD: 'PRELOAD',
        PRELOADING_COMPLETED: 'PRELOADING_COMPLETED',
        RESOURCE_PRELOADED: 'RESOURCE_PRELOADED'
      };

      var Preloader = function () {
        function Preloader(_ref) {
          var namespace = _ref.namespace,
              version = _ref.version,
              assets = _ref.assets,
              scope = _ref.scope,
              worker = _ref.worker,
              debug = _ref.debug;

          _classCallCheck(this, Preloader);

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

        _createClass(Preloader, [{
          key: 'bootstrap',
          value: function bootstrap() {
            if (!this.supportsServiceWorker) {
              this.debug && console.warn('Service Workers are not supported in this browser.');
              return;
            }

            this.registerServiceWorker().then(this.initalizeMessaging.bind(this)).then(this.initalizeServiceWorker.bind(this)).then(this.preloadAssets.bind(this));
          }
        }, {
          key: 'emit',
          value: function emit(event) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            document.dispatchEvent(new CustomEvent(event, data));
          }
        }, {
          key: 'supportsServiceWorker',
          value: function supportsServiceWorker() {
            return 'serviceWorker' in navigator;
          }
        }, {
          key: 'registerServiceWorker',
          value: function registerServiceWorker() {
            var _this = this;

            return navigator.serviceWorker.register(this.worker, { scope: this.scope }).then(function () {
              _this.debug && console.log('🔧 Registered service worker');
              _this.emit('serviceWorker.register.success');
              return navigator.serviceWorker.ready;
            }).catch(function (error) {
              console.log('Boo!', error);
              _this.emit('serviceWorker.register.error');
            });
          }
        }, {
          key: 'initalizeMessaging',
          value: function initalizeMessaging() {
            this.debug && console.log('🔧 Initalized messaging');
            this.messageChannel = new MessageChannel();
            this.messageChannel.port1.onmessage = this.handleMessageFromServiceWorker.bind(this);
          }
        }, {
          key: 'initalizeServiceWorker',
          value: function initalizeServiceWorker() {
            this.debug && console.log('🔧 Initalized service worker');
            navigator.serviceWorker.controller.postMessage({
              type: ACTIONS.INITIALIZE,
              payload: {
                namespace: this.namespace,
                version: this.version,
                debug: this.debug,
                messageChannelPort: this.messageChannel.port2
              }
            }, [this.messageChannel.port2]);
          }
        }, {
          key: 'preloadAssets',
          value: function preloadAssets() {
            this.debug && console.log('🚚 Preloading assets...');
            navigator.serviceWorker.controller.postMessage({
              type: ACTIONS.PRELOAD,
              payload: this.assets
            });
          }
        }, {
          key: 'handleMessageFromServiceWorker',
          value: function handleMessageFromServiceWorker(event) {
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
        }, {
          key: 'totalNumberOfAssets',
          get: function get() {
            return this.assets.length || 0;
          }
        }, {
          key: 'percentageLoaded',
          get: function get() {
            this.numberOfAssetsLoaded++;
            return Math.round(this.numberOfAssetsLoaded / this.totalNumberOfAssets * 100);
          }
        }]);

        return Preloader;
      }();

      exports.default = Preloader;

      /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _VueOfflinePreloader = __webpack_require__(0);

      var _VueOfflinePreloader2 = _interopRequireDefault(_VueOfflinePreloader);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.default = _VueOfflinePreloader2.default;

      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(5)(undefined);
      // imports


      // module
      exports.push([module.i, ".preloader-progress-bar{pointer-events:none;opacity:1;transition:all 2.5s ease}.preloader-progress-bar.complete{opacity:0}.preloader-progress-bar .bar{position:fixed;z-index:1031;top:0;left:0;width:0;height:2px;transition:all .2s ease}.preloader-progress-bar .peg{display:block;position:absolute;right:0;width:0;height:100%;box-shadow:0 0 10px,0 0 5px;opacity:1;-webkit-transform:rotate(3deg) translateY(-4px);-ms-transform:rotate(3deg) translateY(-4px);transform:rotate(3deg) translateY(-4px)}.hidden{visibility:hidden}", ""]);

      // exports


      /***/
    },
    /* 5 */
    /***/function (module, exports) {

      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */
      // css base code, injected by the css-loader
      module.exports = function (useSourceMap) {
        var list = [];

        // return the list of modules as css string
        list.toString = function toString() {
          return this.map(function (item) {
            var content = cssWithMappingToString(item, useSourceMap);
            if (item[2]) {
              return "@media " + item[2] + "{" + content + "}";
            } else {
              return content;
            }
          }).join("");
        };

        // import a list of modules into the list
        list.i = function (modules, mediaQuery) {
          if (typeof modules === "string") modules = [[null, modules, ""]];
          var alreadyImportedModules = {};
          for (var i = 0; i < this.length; i++) {
            var id = this[i][0];
            if (typeof id === "number") alreadyImportedModules[id] = true;
          }
          for (i = 0; i < modules.length; i++) {
            var item = modules[i];
            // skip already imported module
            // this implementation is not 100% perfect for weird media query combinations
            //  when a module is imported multiple times with different media queries.
            //  I hope this will never occur (Hey this way we have smaller bundles)
            if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
              if (mediaQuery && !item[2]) {
                item[2] = mediaQuery;
              } else if (mediaQuery) {
                item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
              }
              list.push(item);
            }
          }
        };
        return list;
      };

      function cssWithMappingToString(item, useSourceMap) {
        var content = item[1] || '';
        var cssMapping = item[3];
        if (!cssMapping) {
          return content;
        }

        if (useSourceMap && typeof btoa === 'function') {
          var sourceMapping = toComment(cssMapping);
          var sourceURLs = cssMapping.sources.map(function (source) {
            return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
          });

          return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
        }

        return [content].join('\n');
      }

      // Adapted from convert-source-map (MIT)
      function toComment(sourceMap) {
        // eslint-disable-next-line no-undef
        var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
        var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

        return '/*# ' + data + ' */';
      }

      /***/
    },
    /* 6 */
    /***/function (module, exports) {

      /* globals __VUE_SSR_CONTEXT__ */

      // this module is a runtime utility for cleaner component module output and will
      // be included in the final webpack user bundle

      module.exports = function normalizeComponent(rawScriptExports, compiledTemplate, injectStyles, scopeId, moduleIdentifier /* server only */
      ) {
        var esModule;
        var scriptExports = rawScriptExports = rawScriptExports || {};

        // ES6 modules interop
        var type = _typeof(rawScriptExports.default);
        if (type === 'object' || type === 'function') {
          esModule = rawScriptExports;
          scriptExports = rawScriptExports.default;
        }

        // Vue.extend constructor export interop
        var options = typeof scriptExports === 'function' ? scriptExports.options : scriptExports;

        // render functions
        if (compiledTemplate) {
          options.render = compiledTemplate.render;
          options.staticRenderFns = compiledTemplate.staticRenderFns;
        }

        // scopedId
        if (scopeId) {
          options._scopeId = scopeId;
        }

        var hook;
        if (moduleIdentifier) {
          // server build
          hook = function hook(context) {
            // 2.3 injection
            context = context || // cached call
            this.$vnode && this.$vnode.ssrContext || // stateful
            this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
              context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (injectStyles) {
              injectStyles.call(this, context);
            }
            // register component module identifier for async chunk inferrence
            if (context && context._registeredComponents) {
              context._registeredComponents.add(moduleIdentifier);
            }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
        } else if (injectStyles) {
          hook = injectStyles;
        }

        if (hook) {
          var functional = options.functional;
          var existing = functional ? options.render : options.beforeCreate;
          if (!functional) {
            // inject component registration as beforeCreate hook
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          } else {
            // register for functioal component in vue file
            options.render = function renderWithStyleInjection(h, context) {
              hook.call(context);
              return existing(h, context);
            };
          }
        }

        return {
          esModule: esModule,
          exports: scriptExports,
          options: options
        };
      };

      /***/
    },
    /* 7 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "preloader-progress-bar",
            class: {
              hidden: !_vm.showPreloaderBar, complete: _vm.loadingComplete
            }
          }, [_c('div', {
            staticClass: "bar",
            style: {
              width: _vm.percentLoaded + '%',
              backgroundColor: _vm.backgroundColor
            }
          }, [_c('div', {
            staticClass: "peg",
            style: {
              color: _vm.backgroundColor
            }
          })])]);
        }, staticRenderFns: []

        /***/ };
    },
    /* 8 */
    /***/function (module, exports, __webpack_require__) {

      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__(4);
      if (typeof content === 'string') content = [[module.i, content, '']];
      if (content.locals) module.exports = content.locals;
      // add the styles to the DOM
      var update = __webpack_require__(9)("24f82fd4", content, true);

      /***/
    },
    /* 9 */
    /***/function (module, exports, __webpack_require__) {

      /*
        MIT License http://www.opensource.org/licenses/mit-license.php
        Author Tobias Koppers @sokra
        Modified by Evan You @yyx990803
      */

      var hasDocument = typeof document !== 'undefined';

      if (typeof DEBUG !== 'undefined' && DEBUG) {
        if (!hasDocument) {
          throw new Error('vue-style-loader cannot be used in a non-browser environment. ' + "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        }
      }

      var listToStyles = __webpack_require__(10

      /*
      type StyleObject = {
        id: number;
        parts: Array<StyleObjectPart>
      }
      
      type StyleObjectPart = {
        css: string;
        media: string;
        sourceMap: ?string
      }
      */

      );var stylesInDom = {/*
                           [id: number]: {
                           id: number,
                           refs: number,
                           parts: Array<(obj?: StyleObjectPart) => void>
                           }
                           */};

      var head = hasDocument && (document.head || document.getElementsByTagName('head')[0]);
      var singletonElement = null;
      var singletonCounter = 0;
      var isProduction = false;
      var noop = function noop() {};

      // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
      // tags it will allow on a page
      var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

      module.exports = function (parentId, list, _isProduction) {
        isProduction = _isProduction;

        var styles = listToStyles(parentId, list);
        addStylesToDom(styles);

        return function update(newList) {
          var mayRemove = [];
          for (var i = 0; i < styles.length; i++) {
            var item = styles[i];
            var domStyle = stylesInDom[item.id];
            domStyle.refs--;
            mayRemove.push(domStyle);
          }
          if (newList) {
            styles = listToStyles(parentId, newList);
            addStylesToDom(styles);
          } else {
            styles = [];
          }
          for (var i = 0; i < mayRemove.length; i++) {
            var domStyle = mayRemove[i];
            if (domStyle.refs === 0) {
              for (var j = 0; j < domStyle.parts.length; j++) {
                domStyle.parts[j]();
              }
              delete stylesInDom[domStyle.id];
            }
          }
        };
      };

      function addStylesToDom(styles /* Array<StyleObject> */) {
        for (var i = 0; i < styles.length; i++) {
          var item = styles[i];
          var domStyle = stylesInDom[item.id];
          if (domStyle) {
            domStyle.refs++;
            for (var j = 0; j < domStyle.parts.length; j++) {
              domStyle.parts[j](item.parts[j]);
            }
            for (; j < item.parts.length; j++) {
              domStyle.parts.push(addStyle(item.parts[j]));
            }
            if (domStyle.parts.length > item.parts.length) {
              domStyle.parts.length = item.parts.length;
            }
          } else {
            var parts = [];
            for (var j = 0; j < item.parts.length; j++) {
              parts.push(addStyle(item.parts[j]));
            }
            stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
          }
        }
      }

      function createStyleElement() {
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        head.appendChild(styleElement);
        return styleElement;
      }

      function addStyle(obj /* StyleObjectPart */) {
        var update, remove;
        var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]');

        if (styleElement) {
          if (isProduction) {
            // has SSR styles and in production mode.
            // simply do nothing.
            return noop;
          } else {
            // has SSR styles but in dev mode.
            // for some reason Chrome can't handle source map in server-rendered
            // style tags - source maps in <style> only works if the style tag is
            // created and inserted dynamically. So we remove the server rendered
            // styles and inject new ones.
            styleElement.parentNode.removeChild(styleElement);
          }
        }

        if (isOldIE) {
          // use singleton mode for IE9.
          var styleIndex = singletonCounter++;
          styleElement = singletonElement || (singletonElement = createStyleElement());
          update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
          remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
        } else {
          // use multi-style-tag mode in all other cases
          styleElement = createStyleElement();
          update = applyToTag.bind(null, styleElement);
          remove = function remove() {
            styleElement.parentNode.removeChild(styleElement);
          };
        }

        update(obj);

        return function updateStyle(newObj /* StyleObjectPart */) {
          if (newObj) {
            if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
              return;
            }
            update(obj = newObj);
          } else {
            remove();
          }
        };
      }

      var replaceText = function () {
        var textStore = [];

        return function (index, replacement) {
          textStore[index] = replacement;
          return textStore.filter(Boolean).join('\n');
        };
      }();

      function applyToSingletonTag(styleElement, index, remove, obj) {
        var css = remove ? '' : obj.css;

        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = replaceText(index, css);
        } else {
          var cssNode = document.createTextNode(css);
          var childNodes = styleElement.childNodes;
          if (childNodes[index]) styleElement.removeChild(childNodes[index]);
          if (childNodes.length) {
            styleElement.insertBefore(cssNode, childNodes[index]);
          } else {
            styleElement.appendChild(cssNode);
          }
        }
      }

      function applyToTag(styleElement, obj) {
        var css = obj.css;
        var media = obj.media;
        var sourceMap = obj.sourceMap;

        if (media) {
          styleElement.setAttribute('media', media);
        }

        if (sourceMap) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */';
        }

        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = css;
        } else {
          while (styleElement.firstChild) {
            styleElement.removeChild(styleElement.firstChild);
          }
          styleElement.appendChild(document.createTextNode(css));
        }
      }

      /***/
    },
    /* 10 */
    /***/function (module, exports) {

      /**
       * Translates the list format produced by css-loader into something
       * easier to manipulate.
       */
      module.exports = function listToStyles(parentId, list) {
        var styles = [];
        var newStyles = {};
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          var id = item[0];
          var css = item[1];
          var media = item[2];
          var sourceMap = item[3];
          var part = {
            id: parentId + ':' + i,
            css: css,
            media: media,
            sourceMap: sourceMap
          };
          if (!newStyles[id]) {
            styles.push(newStyles[id] = { id: id, parts: [part] });
          } else {
            newStyles[id].parts.push(part);
          }
        }
        return styles;
      };

      /***/
    }])
  );
});
