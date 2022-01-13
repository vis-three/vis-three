import { getObjectConfig } from "../object/ObjectConfig";
export const getPerspectiveCameraConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'PerspectiveCamera',
        adaptiveWindow: false,
        fov: 45,
        aspect: 1920 / 1080,
        near: 5,
        far: 50
    });
};
export const getOrthographicCameraConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'OrthographicCamera',
        adaptiveWindow: false,
        left: 1920 / 16,
        right: 1920 / 16,
        top: 1080 / 16,
        bottom: 1080 / 16,
        near: 5,
        far: 50
    });
};
//# sourceMappingURL=CameraConfig.js.map