import { validate } from "uuid";
export const GeometryRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
    const vid = path.length ? path[0] : key;
    const attribute = path.length >= 2 ? path[1] : key;
    if (operate === "add") {
        if (validate(vid)) {
            if (attribute === "groups") {
                if (Number.isInteger(Number(key))) {
                    compiler.addGroup(vid, value);
                    return;
                }
                else {
                    console.warn(`geometry rule illeage groups index: ${key}`);
                    return;
                }
            }
            compiler.add(vid, value);
        }
        else {
            console.warn(`geometry rule vid is illeage: '${key}'`);
        }
        return;
    }
    if (operate === "set") {
        const tempPath = path.length ? path.concat([]).slice(1) : [];
        if (vid && validate(vid)) {
            if (attribute === "groups") {
                const index = Number(path[2] || key);
                if (!Number.isInteger(index)) {
                    console.warn(`geometry rule illeage groups index: ${index}`);
                    return;
                }
                compiler.updateGroup(vid, index);
                return;
            }
            compiler.set(vid, tempPath, value);
        }
        else {
            console.warn(`geometry rule vid is illeage: '${vid}'`);
        }
        return;
    }
    if (operate === "delete") {
        if (validate(vid)) {
            if (attribute === "groups") {
                const index = Number(path[2] || key);
                if (!Number.isInteger(index)) {
                    console.warn(`geometry rule illeage groups index: ${index}`);
                    return;
                }
                compiler.removeGroup(vid, index);
            }
            compiler.remove(vid);
        }
        else {
            console.warn(`geometry rule vid is illeage: '${vid}'`);
        }
        return;
    }
};
//# sourceMappingURL=GeometryRule.js.map