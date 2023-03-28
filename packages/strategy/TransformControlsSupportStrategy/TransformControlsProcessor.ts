import {
  defineProcessor,
  EngineSupport,
  uniqueSymbol,
} from "@vis-three/middleware";
import { ControlsCompiler } from "@vis-three/module-controls/ControlsCompiler";
import { ControlsConfig } from "@vis-three/module-controls/ControlsConfig";
import {
  TransformControlsEngine,
  VisTransformControls,
} from "@vis-three/plugin-transform-controls";

export interface TransformControlsConfig extends ControlsConfig {
  axis: string;
  enabled: boolean;
  mode: string;

  snapAllow: boolean; // 是否开启步幅功能
  rotationSnap: number;
  translationSnap: number;
  scaleSnap: number;

  showX: boolean;
  showY: boolean;
  showZ: boolean;

  size: number;

  space: string;
}

const type = "TransformControls";

export const getTransformControlsConfig = function (): TransformControlsConfig {
  return {
    vid: uniqueSymbol(type),
    type: "",
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
  };
};

export interface TransformControlsSupportEngine
  extends EngineSupport,
    TransformControlsEngine {}

export default defineProcessor<
  TransformControlsConfig,
  VisTransformControls,
  TransformControlsSupportEngine,
  ControlsCompiler
>({
  type,
  config: getTransformControlsConfig,
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
  create(
    config: TransformControlsConfig,
    engine: TransformControlsSupportEngine
  ): VisTransformControls {
    let control = engine.transformControls;

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
