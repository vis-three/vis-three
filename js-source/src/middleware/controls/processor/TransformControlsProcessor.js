import { defineProcessor } from "../../../core/Processor";
import { VisTransformControls } from "../../../optimize/VisTransformControls";
import { CONFIGTYPE } from "../../constants/configType";
export default defineProcessor({
    configType: CONFIGTYPE.TRNASFORMCONTROLS,
    commands: {
        set: {
            snapAllow({ target, config, value }) {
                if (value) {
                    target.translationSnap = config.translationSnap;
                    target.rotationSnap = config.rotationSnap;
                    // @ts-ignore types 没写 源码有这个属性
                    target.scaleSnap = config.scaleSnap;
                }
                else {
                    target.translationSnap = null;
                    target.rotationSnap = null;
                    // @ts-ignore types 没写 源码有这个属性
                    target.scaleSnap = null;
                }
            },
        },
    },
    create(config, engine) {
        let control;
        if (engine.transformControls) {
            control = engine.transformControls;
        }
        else {
            control = new VisTransformControls();
            control.setCamera(engine.camera);
            control.setDom(engine.dom);
        }
        if (config.snapAllow) {
            control.translationSnap = config.translationSnap;
            control.rotationSnap = config.rotationSnap;
            // @ts-ignore types 没写 源码有这个属性
            control.scaleSnap = config.scaleSnap;
        }
        return control;
    },
    dispose(target) {
        target.dispose();
    },
});
//# sourceMappingURL=TransformControlsProcessor.js.map