import { validate } from "uuid";
export const MaterialRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
    if (operate === 'add') {
        if (validate(key)) {
            compiler.add(key, value);
        }
    }
};
//# sourceMappingURL=MaterialRule.js.map