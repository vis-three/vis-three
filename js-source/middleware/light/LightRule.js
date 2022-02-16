import { validate } from "uuid";
export const LightRule = function (input, compiler) {
    const { operate, key, path, value } = input;
    if (operate === 'add') {
        if (validate(key)) {
            compiler.add(key, value);
        }
    }
    else if (operate === 'set') {
        compiler.set(path.concat([]), key, value);
    }
};
//# sourceMappingURL=LightRule.js.map