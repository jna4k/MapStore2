export function isFunction(func) {
    return typeof func === "function";
}

export function isString(str) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    if (str != null && typeof str.valueOf() === "string") {
        return true;
    }
    return false;
}
