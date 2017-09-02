import Vue from 'vue';

import Lue, { mergeProps, mergeActions } from '../src/index';
import modules from './modules';

let app = null;

describe('helpers', () => {
    beforeEach(() => {
        document.body.innerHTML = window.__html__['test/index.html'];
        Vue.use(Lue);
        app = new Lue();
        app.createStore(modules);
        app.initRouter({routes: []});
        app.start('#app');
    });

    it('mergeProps(Array)', () => {
        const vm = new Vue({
            store: app.store,
            computed: mergeProps(['counter.count', 'counter.title'])
        });

        expect(vm.count).to.be.equal(modules.counter.state.count);
        expect(vm.title).to.be.equal(modules.counter.state.title);
    });

    it('mergeProps(Object)', () => {
        const vm = new Vue({
            store: app.store,
            computed: mergeProps({
                ct: 'counter.count',
                tl: 'counter.title'
            })
        });

        expect(vm.ct).to.be.equal(modules.counter.state.count);
        expect(vm.tl).to.be.equal(modules.counter.state.title);
    });

    it('mergeActions(Array)', () => {
        const vm = new Vue({
            store: app.store,
            computed: mergeProps(['counter.count']),
            methods: mergeActions(['counter.increase', 'counter.decrease'])
        });

        expect(vm.count).to.be.equal(0);

        vm.increase();

        expect(vm.count).to.be.equal(1);

        vm.decrease();
        vm.decrease();

        expect(vm.count).to.be.equal(-1);
    });

    it('mergeActions(Object)', () => {
        const vm = new Vue({
            store: app.store,
            computed: mergeProps(['counter.count']),
            methods: mergeActions({
                inc: 'counter.increase', 
                dec: 'counter.decrease'
            })
        });

        expect(vm.count).to.be.equal(-1);

        vm.inc();

        expect(vm.count).to.be.equal(0);

        vm.dec();
        vm.dec();

        expect(vm.count).to.be.equal(-2);
    });
});
