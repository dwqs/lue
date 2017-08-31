import { mapActions, mapGetters } from 'vuex';
import { SEP, normalizeMap } from './utils';

export const mergeActions = (actions) => {
    normalizeMap(actions).forEach(({ key, val }) => {
        const k = key.indexOf(SEP) > -1 ? key.split(SEP)[1] : key;
        res[k] = function mappedAction (...args) {
            return _root._namespaceActions[val].apply(_root, [].concat(args));
        };
    });
    return res;
};

export const mergeProps = (props) => {
    normalizeMap(props).forEach(({ key, val }) => {
        const k = key.indexOf(SEP) > -1 ? key.split(SEP)[1] : key;
        res[k] = function mappedProps () {
            return _root.getters[val]();
        };
    });

    return res;
};
