export const assert = (condition, msg = '') => {
    if (!condition) {
        throw new Error(`${msg}`);
    }
};

export const isObject = (obj) => {
    return obj !== null && typeof obj === 'object';
};

export const isDef = v => v !== undefined;

export const isHTMLElement = (node) => {
    return typeof node === 'object' && node !== null && node.nodeType && node.nodeName;
};

export const forEachValue = (obj, fn) => {
    Object.keys(obj).forEach(key => fn(obj[key], key));
};
