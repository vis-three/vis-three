import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig } from "../object/ObjectConfig";
export const getCSS3DObjectConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: CONFIGTYPE.CSS3DOBJECT,
        element: "",
    });
};
export const getCSS3DSpriteConfig = function () {
    return Object.assign(getCSS3DObjectConfig(), {
        type: CONFIGTYPE.CSS3DSPRITE,
        rotation2D: 0,
    });
};
//# sourceMappingURL=CSS3DConfig.js.map