import { getSolidObjectConfig, } from "@vis-three/module-solid-object";
export const getMeshConfig = function () {
    return Object.assign(getSolidObjectConfig(), {
        geometry: "",
        material: "",
    });
};
