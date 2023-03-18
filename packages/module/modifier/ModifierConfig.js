import { getSymbolConfig } from "@vis-three/middleware";
export const getModifierConfig = function () {
    return Object.assign(getSymbolConfig(), {
        name: "",
        visible: true,
        source: "",
    });
};
export const getBooleanModifierConfig = function () {
    return Object.assign(getModifierConfig(), {
        target: "",
        mode: "subtract",
    });
};
