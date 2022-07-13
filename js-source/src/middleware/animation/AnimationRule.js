import { validate } from "uuid";
export const AnimationRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
    // 命名跳过
    if (key === "name" && !path.length) {
        return;
    }
    if (operate === "add") {
        if (validate(key)) {
            compiler.add(key, value);
        }
        else {
            console.warn(`animation rule vid is illeage: '${key}'`);
        }
        return;
    }
    if (operate === "set") {
        const tempPath = path.concat([]);
        const vid = tempPath.shift();
        if (vid && validate(vid)) {
            compiler.update(vid, tempPath, key, value);
        }
        else {
            console.warn(`animation rule vid is illeage: '${vid}'`);
        }
        return;
    }
    if (operate === "delete" ||
        (operate === "set" && key === "play" && value === "false")) {
        if (validate(key)) {
            compiler.remove(value);
        }
        else {
            console.warn(`animation rule vid is illeage: '${key}'`);
        }
        return;
    }
};
//# sourceMappingURL=AnimationRule.js.map