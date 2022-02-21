import { validate } from "uuid";
export const LineRule = function (input, compiler) {
    const { operate, key, path, value } = input;
    if (operate === 'add') {
        if (validate(key)) {
            compiler.add(key, value);
            return;
        }
    }
    if (operate === 'set') {
    }
};
//# sourceMappingURL=LineRule.js.map