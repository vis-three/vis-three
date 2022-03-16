import { validate } from "uuid";
export const CameraRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
    if (operate === 'add') {
        if (validate(key)) {
            compiler.add(key, value);
        }
        return;
    }
    if (operate === 'set') {
        const tempPath = path.concat([]);
        const vid = tempPath.shift();
        if (vid && validate(vid)) {
            compiler.set(vid, tempPath, key, value);
        }
        else {
            console.warn(`camera rule vid is illeage: '${vid}'`);
        }
        return;
    }
    if (operate === 'delete') {
        if (validate(key)) {
            compiler.remove(key);
        }
        return;
    }
};
//# sourceMappingURL=CameraRule.js.map