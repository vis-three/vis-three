import { validate } from "uuid";
export const CameraRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
    if (operate === 'add') {
        if (validate(key)) {
            compiler.add(key, value);
        }
    }
};
//# sourceMappingURL=CameraRule.js.map