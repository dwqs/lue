import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';

import { assert, isObject, isDef, forEachValue, isHTMLElement } from './utils';
import normalizeModule from './normalize';

export let _root = null;

export default class Lue {
    /**
     * Creates an instance of Lue.
     * @param {any} [options={}] 
     * @memberof Lue
     */
    constructor (options = {}) {
        this.options = options || {};
        this.store = null;
        this.router = null;
        
        this._modules = Object.create(null);
        this._namespaceActions = [];
        this._namespaceGetters = [];
        this._modulesNamespaces = [];

        _root = this;

        // install plugins
        Vue.use(VueRouter);
        Vue.use(Vuex);
    }

    /**
     * sync vue-router and vuex store
     * 
     * @memberof Lue
     */
    _syncRouter () {
        assert(this.router, 'lue._syncRouter: router should be defined.');
        assert(this.store, 'lue._syncRouter: store should be defined.');

        const routeModule = this.options.routeModule || 'route';
        sync(this.store, this.router, { moduleName: routeModule });
    }

    /**
     * add vue plugin
     * 
     * @param {any} plugin 
     * @param {any} opts 
     * @memberof Lue
     */
    use (plugin, opts) {
        assert(!isDef(plugin), `lue.use: plugin should be defined.`);
        
        if (!isDef(opts)) {
            Vue.use(plugin, opts);
        } else {
            Vue.use(plugin);
        }
    }

    /**
     * create a event bus
     * 
     * @memberof Lue
     */
    initEventBus () {
        return new Vue();
    }

    /**
     * create vuex store
     * 
     * @param {any} modules 
     * @param {any} opts 
     * @memberof Lue
     */
    createStore (modules, opts = {}) {
        assert(isObject(modules), `lue.createStore: modules must be a plain object`);
        assert(isObject(opts), `lue.createStore: opts must be a plain object`);

        forEachValue(modules, (module, key) => {
            this._modules[key] = normalizeModule.call(this, module, key);
        });

        const strict = opts.strict || false;

        delete opts['actions'];
        delete opts['getters'];

        opts = Object.assign({}, opts, {
            strict,
            modules: this._modules
        });

        this.store = new Vuex.Store(opts);
    }

    /**
     * init vue-router instance
     * 
     * @param {any} routerOptions 
     * @memberof Lue
     */
    initRouter (routerOptions) {
        assert(isObject(routerOptions), `lue.router: vue-router options should be a object.`);
        assert(!isDef(routerOptions['routes']), `lue.router: routes prop of vue-router options should be defined.`);
        assert(Array.isArray(routerOptions['routes']), `lue.router: routes prop of vue-router options should be a array.`);

        this.router = new VueRouter(routerOptions);
    }

    /**
     * start app
     * 
     * @param {any} el 
     * @param {any} opts 
     * @returns 
     * @memberof Lue
     */
    start (el, opts) {
        assert(typeof el === 'string', `lue.start: the ${el} not a string.`);

        const container = document.querySelector(el);
        let instanceOptions = {};

        assert(container, `lue.start: could not query ${el} selector: ${container}`);
        assert(isHTMLElement(container), `app:start: ${el} selector for document.querySelector should be HTMLElement.`);

        if (!isDef(opts)) {
            assert(isObject(opts), `lue.start: vue options shoule be object.`);

            if (opts.env !== 'development') {
                Vue.config.devtools = false;
                Vue.config.productionTip = false;
            }

            instanceOptions = Object.assign({}, opts, {
                store: this.store,
                router: this.router
            });
        } else {
            // default setting
            Vue.config.devtools = false;
            Vue.config.productionTip = false;

            instanceOptions = Object.assign({}, {
                store: this.store,
                router: this.router,
                template: '<router-view></router-view>'
            });
        }

        this._syncRouter();

        return new Vue(instanceOptions).$mount(el);
    }
}
