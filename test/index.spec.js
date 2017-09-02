import Vue from 'vue';
import { Store } from 'vuex';
import VueRouter from 'vue-router';

import Lue from '../src/index';
import modules from './modules';

describe('index', () => {
    beforeEach(() => {
        document.body.innerHTML = window.__html__['test/index.html'];
        Vue.use(Lue);
    });

    it('normal', () => {
        const app = new Lue();
        app.createStore(modules, {
            // store instance options
            plugins: []
        });
        app.initRouter({routes: []});
        app.start('#app', {
            // vue instance options
            filters: {}
        });
    });

    it('instance of Store & VueRouter', () => {
        const app = new Lue();
        app.createStore(modules);
        app.initRouter({routes: []});
        app.start('#app');

        expect(app.store).to.be.an.instanceof(Store);
        expect(app.router).to.be.an.instanceof(VueRouter);
    });

    it('sync router and state', () => {
        const app = new Lue();
        app.createStore(modules);
        app.initRouter({routes: []});
        app.start('#app');
        
        expect(app.store.state.hasOwnProperty('route')).to.equal(true);
    });

    it('change route module\'s name', () => {
        const app = new Lue({
            routeModule: 'route2'
        });
        app.createStore(modules);
        app.initRouter({routes: []});
        app.start('#app');
        
        expect(app.store.state.hasOwnProperty('route2')).to.equal(true);
    });

    it('throw error if no routes defined', () => {
        const app = new Lue();

        expect(() => {
            app.start('#app');
        }).to.throw(/router should be defined/);
    });

    it('throw error if no store defined', () => {
        const app = new Lue();
        app.initRouter({routes: []});

        expect(() => {
            app.start('#app');
        }).to.throw(/store should be defined/);
    });

    it('create store with strict', () => {
        const app = new Lue();
        app.initRouter({routes: []});
        app.createStore(modules, {
            strict: true
        });
        app.start('#app');

        expect(app.store.strict).to.equal(true);
    });
});
