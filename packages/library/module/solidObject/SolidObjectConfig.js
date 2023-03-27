import { getObjectConfig } from "@vis-three/module-object";
export const getSolidObjectConfig = function () {
    return Object.assign(getObjectConfig(), {
        material: "",
        geometry: "",
    });
};
