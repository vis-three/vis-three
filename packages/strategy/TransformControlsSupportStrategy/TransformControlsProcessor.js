import { defineProcessor, uniqueSymbol, } from "@vis-three/middleware";
import { getControlsConfig, } from "@vis-three/module-controls";
export const getTransformControlsConfig = function () {
    return Object.assign(getControlsConfig(), {
        vid: uniqueSymbol("TransformControls"),
        axis: "XYZ",
        enabled: true,
        mode: "translate",
        snapAllow: false,
        rotationSnap: (Math.PI / 180) * 10,
        translationSnap: 5,
        scaleSnap: 0.1,
        showX: true,
        showY: true,
        showZ: true,
        size: 1,
        space: "world",
    });
};
export default defineProcessor({
    type: "TransformControls",
    config: getTransformControlsConfig,
    commands: {
        set: {
            snapAllow({ target, config, value }) {
                if (value) {
                    target.translationSnap = config.translationSnap;
                    target.rotationSnap = config.rotationSnap;
                    target.scaleSnap = config.scaleSnap;
                }
                else {
                    target.translationSnap = 0;
                    target.rotationSnap = 0;
                    target.scaleSnap = 0;
                }
            },
            translationSnap({ target, config, value }) {
                if (config.snapAllow) {
                    target.translationSnap = value;
                }
            },
            rotationSnap({ target, config, value }) {
                if (config.snapAllow) {
                    target.rotationSnap = value;
                }
            },
            scaleSnap({ target, config, value }) {
                if (config.snapAllow) {
                    // @ts-ignore types 没写 源码有这个属性
                    target.scaleSnap = value;
                }
            },
        },
    },
    create(config, engine) {
        let control = engine.transformControls;
        if (config.snapAllow) {
            control.translationSnap = config.translationSnap;
            control.rotationSnap = config.rotationSnap;
            control.scaleSnap = config.scaleSnap;
        }
        return control;
    },
    dispose(target) {
        target.dispose();
    },
});
