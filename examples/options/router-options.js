const App = () => import(/* webpackChunkName: "app" */ '../components/app/index.vue');
const Counter = () => import(/* webpackChunkName: "counter" */ '../components/counter/index');
const ToDo = () => import(/* webpackChunkName: "todo" */ '../components/todo/index');
const Repos = () => import(/* webpackChunkName: "repos" */ '../components/repos/index');

const Outer = { template: '<router-view></router-view>' };

export default {
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
}