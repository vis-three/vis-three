export const SceneRule = function (input, compiler) {
    const { operate, key, path, value } = input;
    if (operate === 'set') {
        compiler.set(path.concat([]), key, value);
    }
};
//# sourceMappingURL=SceneRule.js.map