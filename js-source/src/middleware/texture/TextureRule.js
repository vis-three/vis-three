import { validate } from "uuid";
export const TextureRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
    if (operate === "add") {
        if (validate(key)) {
            compiler.add(key, value);
        }
        return;
    }
    if (operate === "set") {
        const tempPath = path.concat([]);
        const vid = tempPath.shift() || key;
        if (vid && validate(vid)) {
            compiler.set(vid, tempPath, key, value);
        }
        else {
            console.warn(`texture rule vid is illeage: '${vid}'`);
        }
        return;
    }
    if (operate === "delete") {
        const vid = path[0] || key;
        if (validate(vid)) {
            compiler.remove(vid);
        }
        else {
            console.warn(`texture rule vid is illeage: '${vid}'`);
        }
        return;
    }
};
//# sourceMappingURL=TextureRule.js.map