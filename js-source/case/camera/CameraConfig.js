import { getObjectConfig } from "../object/ObjectConfig";
export const getPerspectiveCameraConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'PerspectiveCamera',
        fov: 45,
        aspect: 1920 / 1080,
        near: 1,
        far: 1000
    });
};
export const getOrthographicCameraConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'OrthographicCamera',
        left: 1920 / 16,
        right: 1920 / 16,
        top: 1080 / 16,
        bottom: 1080 / 16,
        near: 0,
        far: 1000
    });
};
//# sourceMappingURL=CameraConfig.js.map