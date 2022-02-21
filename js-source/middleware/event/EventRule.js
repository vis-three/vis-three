import { validate } from "uuid";
export const EventRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
    if (operate === 'add') {
        if (validate(key)) {
            compiler.add(key, value);
        }
        return;
    }
};
//# sourceMappingURL=EventRule.js.map