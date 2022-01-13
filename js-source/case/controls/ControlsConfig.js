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
//# sourceMappingURL=ControlsConfig.js.map