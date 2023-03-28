import { getSolidObjectConfig, } from "@vis-three/module-solid-object";
export const getPointsConfig = function () {
    return Object.assign(getSolidObjectConfig(), {
        geometry: "",
        material: "",
    });
};
