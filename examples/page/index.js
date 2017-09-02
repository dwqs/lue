import Vue from 'vue';
import Lue from 'lue';

import modules from '../modules/index';
import routerOptions from '../options/router-options';

// 1. install Lue plugin
Vue.use(Lue);

// 2. new a lue instance
const app = new Lue();

// 3. create store
app.createStore(modules);

// 4. init router
app.initRouter(routerOptions);

// 5. start your application
app.start('#app');
