import { getSolidObjectConfig, } from "../solidObject/SolidObjectConfig";
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
//# sourceMappingURL=SpriteConfig.js.map