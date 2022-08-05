export const needUpdateRegCommand = {
    reg: new RegExp("wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter|mapping"),
    handler({ target, key, value }) {
        target[key] = value;
        target.needsUpdate = true;
    },
};
//# sourceMappingURL=common.js.map