import { assert } from './utils';
export let _Vue;

export default function install (Vue) {
    const version = Number(Vue.version.split('.')[0]);
    assert(version >= 2, `[lue]: Only supports Vuejs 2 or higher.`);

    if (install.installed) {
        return;
    }

    install.installed = true;

    _Vue = Vue;
}
