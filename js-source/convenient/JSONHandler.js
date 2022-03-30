export const stringify = (key, value) => {
    if (value === Infinity) {
        return 'Infinity';
    }
    if (value === -Infinity) {
        return '-Infinity';
    }
    return value;
};
export const parse = (key, value) => {
    if (value === 'Infinity') {
        return Infinity;
    }
    if (value === '-Infinity') {
        return -Infinity;
    }
    return value;
};
//# sourceMappingURL=JSONHandler.js.map