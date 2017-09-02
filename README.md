[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) ![build pass](https://api.travis-ci.org/dwqs/lue.svg?branch=master) ![npm-version](https://img.shields.io/npm/v/lue.svg) ![license](https://img.shields.io/npm/l/lue.svg)

# lue
:seedling: Vue and vuex based framework, writing less verbose code.

## Installation
Install the pkg with npm:
```
npm install lue --save
```
or yarn
```
yarn add lue
```

## Basic Uasage
#### 1. create a module
```js
// counter.js
export default {
    namespace: 'counter',
    state: {
        count: 0,
        title: 'Counter'
    },
    actions: {
        increase ({dispatch, state}, payload) {
            const val = state.count + 1;
            // should be return a object to update state
            // if return undefined or not a object, state won't be updated 
            return {
                count: val
            };
        },
        decrease ({dispatch, state}, payload) {
            const val = state.count - 1;         
            return {
                count: val
            };
        }
    }  
};
```

#### 2. export all modules as a object
```js
// modules/index.js
import counter from 'path/to/counter';
import other from 'path/to/other';

export default {
    counter,
    other
};
```

#### 3. create vue router options
```js
// options/index.js
const App = () => import(/* webpackChunkName: "app" */ 'path/to/app/index.vue');
const Counter = () => import(/* webpackChunkName: "counter" */ 'path/to/counter/index');

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
                // other config
            ]
        }
    ]
}
```

#### 4. create your app
```js
import Vue from 'vue';
// path/to/index.js
import Lue from 'lue';

import modules from 'path/to/modules/index';
import routerOptions from 'path/to/options/index';
import filters from 'path/to/filter/index';

// 1. install plugin
Vue.use(Lue);

// 2. new a lue instance
const app = new Lue();

// 3. create store
app.createStore(modules);

// 4. init router
app.initRouter(routerOptions);

// 5. start your application
app.start('#app', {
    // optional options object
    filters,
    // env/vue-i18n.etc
});
```

#### 5. combine lue with vue components
```js
<template>
    <div class="counter">
        <h3>{{title}}:</h3>
        <div>
            <span class="decrease" @click="sub">-</span>
            <span>{{count}}</span>
            <span class="increase" @click="add">+</span>
        </div>
    </div>
</template>

<script>
    import { mergeActions, mergeProps } from 'lue';

    export default {
        computed: {
            ...mergeProps(['counter.count', 'counter.title'])
            // or
            // ...mergeProps({
            //    test: 'counter.title',
            // })
        },

        methods: {
            ...mergeActions(['counter.increase', 'counter.decrease']),
            add () {
                this.increase();
            },

            sub () {
                this.decrease();
            }
        }
    }
</script>
```

## Lue Instance Properties
#### .store: Object
Vuex store instance.

#### .router: Object
Vue router instance.

#### .options: Object
Lue constructor options.

## Lue Instance Methods
#### .createStore(modules: Object, opts?: Object)
Create vuex store. See [opts](https://vuex.vuejs.org/en/api.html).

#### .initRouter(routerOptions: Object)
Init vue-router instance. See [routerOptions](https://router.vuejs.org/en/api/options.html)

#### .start(el: String, opts?: Object)
Start the app. See [opts](https://vuejs.org/v2/guide/instance.html#Creating-a-Vue-Instance) of creating a vue instance. `el` is a css selector for [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

## Examples
Running the examples:

```
npm install
npm run dev # serve examples at localhost:8000
```

## LICENSE
MIT
