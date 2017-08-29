import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const App = () => import(/* webpackChunkName: "app" */ './app');
const Counter = () => import(/* webpackChunkName: "counter" */ '../components/counter/index');
const ToDo = () => import(/* webpackChunkName: "todo" */ '../components/todo/index');
const Repos = () => import(/* webpackChunkName: "repos" */ '../components/repos/index');

const Outer = { template: '<router-view></router-view>' };

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Outer,
            children: [
                { path: '', component: App },
                { path: 'counter', component: Counter },
                { path: 'todo', component: ToDo },
                { path: 'repos', component: Repos }
            ]
        }
    ]
});

const app = new Vue({
    router,
    ...Outer
});

app.$mount('#app');
