import { getSolidObjectConfig } from "@vis-three/module-solid-object";
export const getLineConfig = function () {
    return Object.assign(getSolidObjectConfig(), {
        geometry: "",
        material: "",
    });
};
