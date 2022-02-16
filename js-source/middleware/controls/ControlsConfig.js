export const getTransformControlsConfig = function () {
    return {
        vid: 'TransformControls',
        type: 'TransformControls',
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
        vid: 'OrbitControls',
        type: 'OrbitControls',
        autoRotate: false,
        autoRotateSpeed: 2.0,
        enableDamping: false,
        dampingFactor: 0.05
    };
};
//# sourceMappingURL=ControlsConfig.js.map