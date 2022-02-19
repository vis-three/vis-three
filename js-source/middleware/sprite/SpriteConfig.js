import { getObjectConfig } from "../object/ObjectConfig";
export const getSpriteConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'Sprite',
        material: '',
        center: {
            x: 0.5,
            y: 0.5
        },
        width: 1,
        height: 1
    });
};
//# sourceMappingURL=SpriteConfig.js.map