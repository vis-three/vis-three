import { validate } from "uuid";
export const LightRule = function (input, compiler) {
    const key = input.key;
    const operate = input.operate;
    const path = input.path;
    const value = input.value;
    if (operate === 'add') {
        if (validate(key)) {
            compiler.add(key, value);
        }
    }
};
//# sourceMappingURL=LightRule.js.map