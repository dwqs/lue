import Lue from 'lue';

import modules from '../modules/index';
import routerOptions from '../options/router-options';

// 1. new a lue instance
const app = new Lue();

// 2. create store
app.createStore(modules);

// 3. init router
app.initRouter(routerOptions);

// 4. start your application
app.start('#app');
