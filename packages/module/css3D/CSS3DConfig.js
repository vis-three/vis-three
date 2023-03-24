import { getObjectConfig } from "@vis-three/module-object";
export const getCSS3DObjectConfig = function () {
    return Object.assign(getObjectConfig(), {
        element: "",
        width: 50,
        height: 50,
    });
};
export const getCSS3DPlaneConfig = function () {
    return Object.assign(getCSS3DObjectConfig(), {});
};
export const getCSS3DSpriteConfig = function () {
    return Object.assign(getCSS3DObjectConfig(), {
        rotation2D: 0,
    });
};
