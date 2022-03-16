import { validate } from "uuid";
export const GroupRule = function (input, compiler) {
    const { operate, key, path, value } = input;
    console.log(input);
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
            console.warn(`model rule vid is illeage: '${vid}'`);
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
//# sourceMappingURL=GroupRule.js.map