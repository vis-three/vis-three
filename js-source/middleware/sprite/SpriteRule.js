export const SpriteRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
    if (operate === 'add') {
        compiler.add(key, value);
        return;
    }
    if (operate === 'set') {
        const tempPath = path.concat([]);
        const vid = tempPath.shift();
        compiler.set(vid, tempPath, key, value);
    }
};
//# sourceMappingURL=SpriteRule.js.map