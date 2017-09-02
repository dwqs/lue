import Vue from 'vue';

import Lue from '../src/index';
import modules from './modules';

describe('actions', () => {
    beforeEach(() => {
        document.body.innerHTML = window.__html__['test/index.html'];
        Vue.use(Lue);
    });

    it('counter\'s sync action', () => {
        const app = new Lue();
        app.createStore(modules);
        app.initRouter({routes: []});
        app.start('#app');

        expect(app.store.state.counter.count).to.be.equal(0);

        app.store.dispatch('increase');
        app.store.dispatch('increase');

        expect(app.store.state.counter.count).to.be.equal(2);

        app.store.dispatch('decrease');
        app.store.dispatch('decrease');

        expect(app.store.state.counter.count).to.be.equal(0);        
    });

    it('repos\' async action', done => {
        const app = new Lue();
        app.createStore(modules);
        app.initRouter({routes: []});
        app.start('#app');

        expect(app.store.state.repos.all).to.be.equal(0);

        app.store.dispatch('getYourRepos', {
            username: 'dwqs'
        }).then(() => {
            expect(app.store.state.repos.all).to.be.equal(11);
            done();
        });
    });
});
