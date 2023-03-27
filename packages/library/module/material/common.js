import { globalAntiShake } from "@vis-three/middleware";
import { syncObject } from "@vis-three/utils";
import { Color, Texture } from "three";
export const commonNeedUpdatesRegCommand = {
    reg: new RegExp("transparent|sizeAttenuation"),
    handler({ target, key, value, }) {
        target[key] = value;
        target.needsUpdate = true;
    },
};
export const mapHandler = function ({ target, key, value, engine, }) {
    globalAntiShake.exec((finish) => {
        if (!value) {
            target[key] = null;
            target.needsUpdate = true;
            return true;
        }
        const texture = engine.compilerManager.getObjectBySymbol(value);
        if (!(texture instanceof Texture)) {
            finish &&
                console.warn(`this url resource is not instance of Texture: ${key}`, value, texture);
            target[key] = null;
            return false;
        }
        target[key] = texture;
        target.needsUpdate = true;
        return true;
    });
};
export const commonMapRegCommand = {
    reg: new RegExp("map$", "i"),
    handler: mapHandler,
};
export const colorSetHandler = function ({ target, key, value, }) {
    target[key].copy(new Color(value));
};
export const create = function (target, config, engine) {
    const filter = {};
    for (const key of Object.keys(config)) {
        if (key.toLocaleLowerCase().endsWith("map") && config[key]) {
            mapHandler({ target, key, value: config[key], engine });
            filter[key] = true;
        }
        else if (target[key] instanceof Color) {
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
