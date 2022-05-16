import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig } from "../object/ObjectConfig";
export const getSceneConfig = function () {
    return Object.assign(getObjectConfig(), {
        vid: CONFIGTYPE.SCENE,
        type: CONFIGTYPE.SCENE,
        background: "",
        environment: "",
        fog: {
            type: "",
            color: "rgb(150, 150, 150)",
            near: 1,
            far: 200,
            density: 0.003,
        },
    });
};
//# sourceMappingURL=SceneConfig.js.map