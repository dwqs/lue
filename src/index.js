import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import Vuex from 'vuex';

import { assert, isObject, isDef, forEachValue } from './utils';
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
        this.modules = Object.create(null);
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
    syncRouter () {
        assert(this.router, 'lue.syncRouter: router should be defined.');
        assert(this.store, 'lue.syncRouter: store should be defined.');

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
     * create vuex store
     * 
     * @param {any} modules 
     * @param {any} opts 
     * @memberof Lue
     */
    createStore (models, opts = {}) {
        assert(isObject(models), `lue.createStore: modules must be a plain object`);
        assert(isObject(opts), `lue.createStore: opts must be a plain object`);

        console.log('111createStore', models);
        
        forEachValue(models, (model, key) => {
            this.modules[key] = normalizeModule.call(this, model, key);
        });

        console.log('this.modulesthis.modulesthis', this.modules);

        const strict = opts.strict || true;
        opts = Object.assign({}, opts, {
            strict,
            modules: this.modules
        });
    }

    /**
     * init vue-router instance
     * 
     * @param {any} routerOptions 
     * @memberof Lue
     */
    router (routerOptions) {
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

        assert(container, `lue.start: could not query selector: ${container}`);
        assert(isHTMLElement(container), `app:start: container should be HTMLElement.`);
        assert(this.router, 'lue.start: router should be defined.');
        assert(this.store, 'lue.start: store should be defined.');

        if (!isDef(opts)) {
            assert(isObject(opts), `lue.start: vue options shoule be object.`);
            instanceOptions = Object.assign({}, opts, {
                el,
                store: this.store,
                router: this.router
            });
        } else {
            instanceOptions = Object.assign({}, {
                el,
                store: this.store,
                router: this.router,
                template: '<router-view></router-view>'
            });
        }

        this.syncRouter();

        return new Vue(instanceOptions);
    }
}
