//TODO: rule 直接调用compiler.process
export const ControlsRule = function (input, compiler) {
    const { operate, key, path, value } = input;
    if (operate === 'set') {
        const tempPath = path.concat([]);
        const vid = tempPath.shift();
        if (vid) {
            compiler.set(vid, tempPath, key, value);
        }
        else if (key) {
            compiler.setAll(key);
        }
        else {
            console.warn(`controls rule can not found controls type in set operate: ${vid}`);
        }
    }
};
//# sourceMappingURL=ControlsRule.js.map