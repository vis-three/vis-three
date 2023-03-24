import { getObjectConfig } from "@vis-three/module-object";
export const getCSS2DObjectConfig = function () {
    return Object.assign(getObjectConfig(), {
        element: "",
        width: 50,
        height: 50,
    });
};
export const getCSS2DPlaneConfig = function () {
    return Object.assign(getCSS2DObjectConfig(), {});
};
