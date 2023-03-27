import { uniqueSymbol } from "@vis-three/middleware";
import { getObjectConfig } from "@vis-three/module-object";
export const getSceneConfig = function () {
    return Object.assign(getObjectConfig(), {
        vid: uniqueSymbol("Scene"),
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
