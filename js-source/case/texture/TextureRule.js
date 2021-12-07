import { validate } from "uuid";
export const TextureRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
    if (operate === 'add') {
        if (validate(key)) {
            compiler.add(key, value);
        }
    }
};
//# sourceMappingURL=TextureRule.js.map