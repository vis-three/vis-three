import { validate } from "uuid";
export const ModelRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
    if (operate === 'add') {
        if (validate(key)) {
            compiler.add(key, value);
        }
    }
    else if (operate === 'set') {
        compiler.set(path.concat([]), key, value);
    }
};
//# sourceMappingURL=ModelRule.js.map