export const SEP = '.';

export const assert = (condition, msg = '') => {
    if (!condition) {
        throw new Error(`${msg}`);
    }
};

export const isObject = (obj) => {
    return !Object.is(obj, null) && typeof obj === 'object';
};

export const isDef = v => Object.is(v, undefined);

export const isHTMLElement = (node) => {
    return typeof node === 'object' && node !== null && node.nodeType && node.nodeName;
};

export const forEachValue = (obj, fn) => {
    Object.keys(obj).forEach(key => fn(obj[key], key));
};

export const toCamelCase = (str) => {
    return str.slice(0, 1).toLocaleUpperCase() + str.slice(1);
};

export const isPromise = (val) => {
    return val && typeof val.then === 'function';
};

export const normalizeMap = (map) => {
    return Array.isArray(map)
        ? map.map(key => ({ key, val: key }))
        : Object.keys(map).map(key => ({ key, val: map[key] }));
};
