import { validate } from "uuid";
export const AnimationRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
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
            compiler.update(vid);
        }
        else {
            console.warn(`animation rule vid is illeage: '${vid}'`);
        }
        return;
    }
    if (operate === "delete") {
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