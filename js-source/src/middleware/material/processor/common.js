import { Color, Texture } from "three";
import { syncObject } from "../../../utils/utils";
export const commonNeedUpdatesRegCommand = {
    reg: new RegExp("transparent|sizeAttenuation"),
    handler({ target, key, value, engine, }) {
        target[key] = value;
        target.needsUpdate = true;
    },
};
export const commonMapRegCommand = {
    reg: new RegExp("map$", "i"),
    handler({ target, key, value, engine, }) {
        const texture = engine.resourceManager.resourceMap.get(value);
        if (!(texture instanceof Texture)) {
            console.warn(`this url resource is not instance of Texture: ${key}`, value, texture);
        }
        target[key] = texture;
        target.needsUpdate = true;
    },
};
export const colorSetHandler = function ({ target, key, value }) {
    target[key].copy(new Color(value));
};
export const create = function (target, config, engine) {
    const filter = {};
    for (const key of Object.keys(config)) {
        if (key.toLocaleLowerCase().endsWith("map") && config[key]) {
            const texture = engine.compilerManager.getObjectBySymbol(config[key]);
            if (!(texture instanceof Texture)) {
                console.warn(`this url resource is not instance of Texture: ${key}`, config[key], texture);
                continue;
            }
            target[key] = texture;
            filter[key] = true;
        }
        else if (["color", "emissive", "specular"].includes(key)) {
            target[key] = new Color(config[key]);
            filter[key] = true;
        }
    }
    syncObject(config, target, filter);
    target.needsUpdate = true;
    return target;
};
export const dispose = function (target) {
    target.dispose();
};
//# sourceMappingURL=common.js.map