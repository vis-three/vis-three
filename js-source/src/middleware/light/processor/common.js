import { Color } from "three";
import { objectCommands, objectCreate } from "../../object/ObjectProcessor";
export const colorHandler = function ({ target, value, }) {
    target.color.copy(new Color(value));
};
export const emptyHandler = function ({}) { };
export const lightCreate = function (light, config, filter, engine) {
    light.color.copy(new Color(config.color));
    return objectCreate(light, config, {
        color: true,
        scale: true,
        rotation: true,
        lookAt: true,
        ...filter,
    }, engine);
};
export const lightCommands = Object.assign({}, objectCommands, {
    set: {
        color: colorHandler,
        scale: emptyHandler,
        rotation: emptyHandler,
        lookAt: emptyHandler,
    },
});
//# sourceMappingURL=common.js.map