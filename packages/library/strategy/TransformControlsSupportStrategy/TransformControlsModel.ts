import { defineModel, EngineSupport, uniqueSymbol } from "@vis-three/tdcm";
import {
  ControlsCompiler,
  ControlsConfig,
  getControlsConfig,
} from "@vis-three/module-controls";
import {
  TransformControlsEngine,
  TransformControls,
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

export const getTransformControlsConfig = function (): TransformControlsConfig {
  return Object.assign(getControlsConfig(), {
    vid: uniqueSymbol("TransformControls"),
    axis: "XYZ",
    enabled: true,
    mode: "position",

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

export interface TransformControlsSupportEngine
  extends EngineSupport,
    TransformControlsEngine {}

export default defineModel<
  TransformControlsConfig,
  TransformControls,
  {},
  {},
  TransformControlsSupportEngine,
  ControlsCompiler
>({
  type: "TransformControls",
  config: getTransformControlsConfig,
  commands: {
    set: {
      snapAllow({ target, config, value }) {
        if (value) {
          target.translationSnap = config.translationSnap;
          target.rotationSnap = config.rotationSnap;
          target.scaleSnap = config.scaleSnap;
        } else {
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
          target.scaleSnap = value;
        }
      },
    },
  },
  create({ config, engine }) {
    let control = engine.transformControls;

    if (config.snapAllow) {
      control.translationSnap = config.translationSnap;
      control.rotationSnap = config.rotationSnap;
      control.scaleSnap = config.scaleSnap;
    }

    return control;
  },
  dispose({ target }) {
    target.dispose();
  },
});
