export const assert = (condition, msg = '') => {
    if (!condition) {
        throw new Error(`[revuejs]: ${msg}`);
    }
};
