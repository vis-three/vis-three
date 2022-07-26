import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { VisTransformControls } from "../../../optimize/VisTransformControls";
import { CONFIGTYPE } from "../../constants/configType";
import { TransformControlsConfig } from "../ControlsConfig";

export default defineProcessor<TransformControlsConfig, VisTransformControls>({
  configType: CONFIGTYPE.TRNASFORMCONTROLS,
  commands: {
    set: {
      snapAllow({ target, config, value }) {
        if (value) {
          target.translationSnap = config.translationSnap;
          target.rotationSnap = config.rotationSnap;
          // @ts-ignore types 没写 源码有这个属性
          target.scaleSnap = config.scaleSnap;
        } else {
          target.translationSnap = null;
          target.rotationSnap = null;
          // @ts-ignore types 没写 源码有这个属性
          target.scaleSnap = null;
        }
      },
    },
  },
  create(
    config: TransformControlsConfig,
    engine: EngineSupport
  ): VisTransformControls {
    let control: VisTransformControls;

    if (engine.transformControls) {
      control = engine.transformControls! as VisTransformControls;
    } else {
      control = new VisTransformControls();
      control.setCamera(engine.camera);
      control.setDom(engine.dom!);
    }

    if (config.snapAllow) {
      control.translationSnap = config.translationSnap;
      control.rotationSnap = config.rotationSnap;
      // @ts-ignore types 没写 源码有这个属性
      control.scaleSnap = config.scaleSnap;
    }

    return control;
  },
  dispose(target: VisTransformControls) {
    target.dispose();
  },
});
