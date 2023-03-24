import { getObjectConfig } from "@vis-three/module-object";
export const getPerspectiveCameraConfig = function () {
    return Object.assign(getObjectConfig(), {
        adaptiveWindow: false,
        fov: 45,
        aspect: 1920 / 1080,
        near: 5,
        far: 50,
    });
};
export const getOrthographicCameraConfig = function () {
    return Object.assign(getObjectConfig(), {
        adaptiveWindow: false,
        left: -window.innerWidth,
        right: window.innerWidth,
        top: window.innerHeight,
        bottom: -window.innerHeight,
        near: 5,
        far: 50,
        zoom: 1,
    });
};
