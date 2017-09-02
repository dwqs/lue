import { mapActions, mapGetters } from 'vuex';
import { SEP, assert, isObject, forEachValue, toCamelCase } from './utils';
import { _root } from './lue';

export const mergeActions = (actions) => {
    assert(_root, `must call new Lue() before mergeActions.`);
    assert(isObject(actions) || Array.isArray(actions), '[lue]: the parameter of mergeActions function must be a array or plain object');
    
    let _validActions = {};

    if (Array.isArray(actions)) {
        actions.forEach((action) => {
            assert(_root._namespaceActions.includes(action), `[lue]unknown action: ${action}.`);
            let key = action.split(SEP)[1];
            _validActions[key] = key;
        });
    } else {
        forEachValue(actions, (val, key) => {
            assert(_root._namespaceActions.includes(val), `[lue]unknown action: ${val}.`);
            _validActions[key] = val.split(SEP)[1];
        });
    }
  
    return mapActions(_validActions);
};

export const mergeProps = (props) => {
    assert(_root, `must call new Lue() before mergeProps.`);
    assert(isObject(props) || Array.isArray(props), '[lue]: the parameter of mergeProps function must be a array or plain object');
    
    let res = {};
    let _validProps = {};

    if (Array.isArray(props)) {
        props.forEach((prop) => {
            assert(_root._namespaceGetters.includes(prop), `[lue]unknown getter: ${prop}.`);
            const namespace = prop.split(SEP)[0];
            const getterPrefix = `get${toCamelCase(namespace)}`;
            let key = prop.split(SEP)[1];
            _validProps[key] = `${getterPrefix}${toCamelCase(key)}`;
        });
    } else {
        forEachValue(props, (val, key) => {
            assert(_root._namespaceGetters.includes(val), `[lue]unknown getter: ${val}`);
            const namespace = val.split(SEP)[0];
            const k = val.split(SEP)[1];
            const getterPrefix = `get${toCamelCase(namespace)}`;
            _validProps[key] = `${getterPrefix}${toCamelCase(k)}`;
        });
    }
    
    return mapGetters(_validProps);
};
