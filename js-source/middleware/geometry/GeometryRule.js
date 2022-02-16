import { validate } from "uuid";
export const GeometryRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
    if (operate === 'add') {
        if (validate(key)) {
            compiler.add(key, value);
        }
    }
    else if (operate === 'set') {
        const tempPath = path.concat([]);
        const vid = tempPath.shift();
        if (vid && validate(vid)) {
            compiler.set(vid, tempPath, value);
        }
        else {
            console.warn(`geometry rule vid is illeage: '${vid}'`);
            return;
        }
    }
};
//# sourceMappingURL=GeometryRule.js.map