import { getSolidObjectConfig, } from "../solidObject/SolidObjectConfig";
export const getPointsConfig = function () {
    return Object.assign(getSolidObjectConfig(), {
        geometry: "",
        material: "",
    });
};
