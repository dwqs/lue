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
import { _root } from './index';

export default function normalizeModule (model, key) {
    let module = {
        state: {},
        getters: {},
        actions: {},
        mutations: {}
    };
    const namespace = model.namespace;

    assert(namespace, `[lue]: the namespace of ${key} module must be defined`);
    assert(typeof namespace === 'string', `[lue]: the namespace of ${key} module must be a string.`);
    assert(/^[a-z]+$/.test(namespace), `[lue]: the namespace of ${key} module must be defined used lower-case.`);
    assert(!this._modulesNamespaces.includes(namespace), `[lue]: the namespace value ${namespace} of module has been duplicate declaration.`);

    this._modulesNamespaces.push(namespace);
    const getterPrefix = `get${toCamelCase(namespace)}`;

    module['state'] = model.state;

    // normalize getters
    forEachValue(model.state, (val, key) => {
        let getterKey = `${getterPrefix}${toCamelCase(key)}`;
        module['getters'][getterKey] = function (state) {
            return state[key];
        };
        this._namespaceGetters.push(`${namespace}${SEP}${key}`);
    });

    // normalize actions
    forEachValue(model.actions, (action, key) => {
        module['actions'][key] = function (localState, payload) {
            assert(_root, `must call new Lue() before call ${key} action.`);

            const res = action.call(_root, localState, payload);
            const type = `${namespace}${SEP}${key}`;
            const { commit } = localState;

            if (isPromise(res)) {
                res.then((data) => {
                    if (data) {
                        assert(isObject(data), `[lue]: should return a object to update module state`);
                        commit({
                            type,
                            data
                        });
                    }
                }).catch((e) => {
                    // do nothing
                    // assert(false, `error in ${key} action: ${e.message}`);
                });
            } else {
                if (!isDef(res)) {
                    assert(isObject(res), `[lue]: should return a object to update module state`);
                    commit({
                        type,
                        data: res
                    });
                }
            }
            return res;
        };
        this._namespaceActions.push(`${namespace}${SEP}${key}`);
    });

    // normalize mutations
    forEachValue(model.actions, (action, key) => {
        const type = `${namespace}${SEP}${key}`;
        module['mutations'][type] = function (state, payload) {
            const { data } = payload;
            assert(
                !isDef(data) || isObject(data) || Object.is(data, null), 
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
