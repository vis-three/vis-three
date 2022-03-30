import { CONFIGTYPE } from "../constants/configType";
export const getTransformControlsConfig = function () {
    return {
        vid: CONFIGTYPE.TRNASFORMCONTROLS,
        type: CONFIGTYPE.TRNASFORMCONTROLS,
        axis: 'XYZ',
        enabled: true,
        mode: 'translate',
        snapAllow: false,
        rotationSnap: Math.PI / 180 * 10,
        translationSnap: 5,
        scaleSnap: 0.1,
        showX: true,
        showY: true,
        showZ: true,
        size: 1,
        space: 'world'
    };
};
export const getOrbitControlsConfig = function () {
    return {
        vid: CONFIGTYPE.ORBITCONTROLS,
        type: CONFIGTYPE.ORBITCONTROLS,
        autoRotate: false,
        autoRotateSpeed: 2.0,
        enableDamping: false,
        dampingFactor: 0.05,
        enabled: true,
        enablePan: true,
        enableRotate: true,
        enableZoom: true,
        maxAzimuthAngle: Infinity,
        maxDistance: Infinity,
        maxPolarAngle: Math.PI,
        maxZoom: Infinity,
        minAzimuthAngle: -Infinity,
        minDistance: 0,
        minPolarAngle: 0,
        minZoom: 0,
        panSpeed: 1,
        rotateSpeed: 1,
        zoomSpeed: 1,
        screenSpacePanning: true
    };
};
//# sourceMappingURL=ControlsConfig.js.map