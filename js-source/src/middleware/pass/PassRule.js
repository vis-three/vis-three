export const PassRule = function (input, compiler) {
    const { operate, key, path, value } = input;
    const tempPath = path.concat([]);
    let vid = key;
    if (tempPath.length) {
        vid = tempPath.shift();
    }
    if (operate === "add") {
        compiler.add(value);
        return;
    }
    if (operate === "set") {
        compiler.set(vid, tempPath, key, value);
    }
    if (operate === "delete") {
        compiler.remove(value.vid);
        return;
    }
};
//# sourceMappingURL=PassRule.js.map