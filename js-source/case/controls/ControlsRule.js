export const ControlsRule = function (input, compiler) {
    const { operate, key, path, value } = input;
    if (operate === 'set') {
        const tempPath = path.concat([]);
        const type = tempPath.shift();
        if (type) {
            compiler.set(type, tempPath, key, value);
        }
        else {
            console.error(`controls rule can not found controls type in set operate.`);
        }
    }
};
//# sourceMappingURL=ControlsRule.js.map