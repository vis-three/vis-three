import { getSolidObjectConfig, } from "@vis-three/module-solid-object";
export const getSpriteConfig = function () {
    return Object.assign(getSolidObjectConfig(), {
        type: "Sprite",
        material: "",
        center: {
            x: 0.5,
            y: 0.5,
        },
    });
};
