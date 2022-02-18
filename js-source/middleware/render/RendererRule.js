export const RendererRule = function (input, compiler) {
    const { operate, key, path, value } = input;
    if (operate === 'add') {
        compiler.add(key, value);
        return;
    }
    if (operate === 'set') {
        compiler.set(path.concat([]), key, value);
        return;
    }
};
//# sourceMappingURL=RendererRule.js.map