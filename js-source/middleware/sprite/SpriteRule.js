import { validate } from "uuid";
export const SpriteRule = function (notice, compiler) {
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
        compiler.set(vid, tempPath, key, value);
    }
    if (operate === 'delete') {
        if (validate(key)) {
            compiler.remove(key);
        }
        return;
    }
};
//# sourceMappingURL=SpriteRule.js.map