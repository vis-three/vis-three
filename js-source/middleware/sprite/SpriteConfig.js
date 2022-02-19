import { getObjectConfig } from "../object/ObjectConfig";
export const getSpriteConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'Sprite',
        material: '',
        center: {
            x: 0.5,
            y: 0.5
        }
    });
};
//# sourceMappingURL=SpriteConfig.js.map