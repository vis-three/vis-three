import { validate } from "uuid";
import { CONFIGTYPE } from "../constants/configType";
export const RendererRule = function (input, compiler) {
    const { operate, key, path, value } = input;
    if (operate === "add") {
        compiler.add(value);
        return;
    }
    if (operate === "set") {
        if (key === CONFIGTYPE.WEBGLRENDERER) {
            compiler.add(value);
            return;
        }
        let vid = key;
        if (path.length) {
            vid = path[0];
        }
        if (validate(vid) || vid === CONFIGTYPE.WEBGLRENDERER) {
            compiler.assembly(vid, (processer) => {
                processer.process({
                    path: path.concat([]),
                    key,
                    value,
                });
            });
        }
        else {
            console.warn(`renderer rule can not support this vid: ${vid}`);
        }
        return;
    }
};
//# sourceMappingURL=RendererRule.js.map