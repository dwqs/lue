/**
 * normalize vuex modules
 */
import { 
    forEachValue, 
    toCamelCase, 
    isPromise, 
    isDef,
    assert,
    isObject,
    SEP
} from './utils';

export default function normalizeModule (model, key) {
    console.log('normalizeModulenormalizeModule', model, this);
    let module = {
        state: {},
        getters: {},
        actions: {},
        mutations: {}
    };
    const namespace = model.namespace;
    const getterPrefix = `get${toCamelCase(namespace)}`;

    module['state'] = model.state;

    // normalize getters
    forEachValue(model.state, (val, key) => {
        let getterKey = `${getterPrefix}${toCamelCase(key)}`;
        module['getters'][getterKey] = function (state) {
            return state[key];
        };
    });

    // normalize actions
    forEachValue(model.actions, (action, key) => {
        module['actions'][key] = function (localState, payload) {
            const res = action.call(this, localState, payload);
            const type = `${namespace}${SEP}${key}`;
            const { commit } = localState;

            if (isPromise(res)) {
                res.then((data) => {
                    commit({
                        type,
                        data
                    });
                }).catch((e) => {
                    // do nothing
                    // assert(false, `error in ${key} action: ${e.message}`);
                });
            } else {
                commit({
                    type,
                    data
                });
            }
            return res;
        };
    });

    // normalize mutations
    forEachValue(model.actions, (action, key) => {
        const type = `${namespace}${SEP}${key}`;
        module['mutations'][type] = function (state, payload) {
            const { data } = payload;
            assert(
                isDef(data) || isObject(data) || Object.is(data, null), 
                `[lue]: ${type} action should return a object`
            );

            if (data) {
                forEachValue(data, (val, key) => {
                    if (!isDef(module['state'][key])) {
                        module.state[key] = val;
                    }
                });
            }
        };
    });

    return module;
}
