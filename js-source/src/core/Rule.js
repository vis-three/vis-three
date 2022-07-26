import { validate } from "uuid";
export const Rule = (input, compiler, validateFun = validate) => {
    const { operate, key, path, value } = input;
    let vid = key;
    const tempPath = [].concat(path);
    if (path.length) {
        vid = tempPath.shift();
    }
    if (!validateFun(vid)) {
        console.warn(`${compiler.MODULE} Rule: vid is illeage: ${vid}`);
        return;
    }
    if (operate === "add" && !tempPath.length) {
        compiler.add(value);
        return;
    }
    if (input.operate === "delete" && !tempPath.length) {
        compiler.remove(value);
        return;
    }
    if (input.operate === "set" && !tempPath.length && key === vid) {
        compiler.cover(value);
        return;
    }
    compiler.compile(vid, { operate, key, path: tempPath, value });
};
//# sourceMappingURL=Rule.js.map