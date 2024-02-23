import {
  KeyboardManagerEngine,
  KEYBOARD_MANAGER_PLUGIN,
} from "@vis-three/plugin-keyboard-manager";
import {
  TransformControlsEngine,
  TRANSFORM_CONTROLS_PLUGIN,
} from "@vis-three/plugin-transform-controls";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Strategy } from "@vis-three/core";

export interface TransformKeyboardEngine
  extends KeyboardManagerEngine,
    TransformControlsEngine {}

export const TRANSFORM_KEYBOARD_STRATEGY = transPkgName(pkgname);

export const TransformKeyboardStrategy: Strategy<
  TransformKeyboardEngine,
  object
> = function () {
  return {
    name: TRANSFORM_KEYBOARD_STRATEGY,
    condition: [KEYBOARD_MANAGER_PLUGIN, TRANSFORM_CONTROLS_PLUGIN],
    exec(engine) {
      const transformControls = engine.transformControls;
      engine.keyboardManager
        .register({
          shortcutKey: ["shift"],
          desp: "变换控制器锁定步幅",
          keyup: (event) => {
            event?.preventDefault();
            transformControls.translationSnap = null as unknown as number;
            transformControls.rotationSnap = null as unknown as number;
            // @ts-ignore types 没写 源码有这个属性
            transformControls.scaleSnap = null;
          },
          keydown: (event) => {
            event?.preventDefault();
            event?.preventRepeat();
            transformControls.translationSnap = 5;
            transformControls.rotationSnap = (Math.PI / 180) * 10;
            // @ts-ignore types 没写 源码有这个属性
            transformControls.scaleSnap = 0.1;
          },
        })
        .register({
          shortcutKey: ["r"],
          desp: "变换控制器模式：旋转",
          keyup: (event) => {
            event?.preventDefault();
            transformControls && (transformControls.mode = "rotation");
          },
        })
        .register({
          shortcutKey: ["t"],
          desp: "变换控制器模式：移动",
          keyup: (event) => {
            event?.preventDefault();
            transformControls && (transformControls.mode = "position");
          },
        })
        .register({
          shortcutKey: ["e"],
          desp: "变换控制器模式：缩放",
          keyup: (event) => {
            event?.preventDefault();
            transformControls.mode = "scale";
          },
        })
        .register({
          shortcutKey: ["x"],
          desp: "变换控制器切换轴：x",
          keyup: (event) => {
            event?.preventDefault();
            transformControls.showX = !transformControls.showX;
          },
        })
        .register({
          shortcutKey: ["y"],
          desp: "变换控制器切换轴：y",
          keyup: (event) => {
            event?.preventDefault();
            if (event?.ctrlKey) {
              return;
            }
            transformControls.showY = !transformControls.showY;
          },
        })
        .register({
          shortcutKey: ["z"],
          desp: "变换控制器切换轴：z",
          keyup: (event) => {
            event?.preventDefault();
            if (event?.ctrlKey) {
              return;
            }
            transformControls.showZ = !transformControls.showZ;
          },
        })
        .register({
          shortcutKey: ["space"],
          desp: "变换控制器切换变换空间",
          keyup: (event) => {
            event?.preventDefault();
            transformControls.space =
              transformControls.space === "local" ? "world" : "local";
          },
        });
    },
    rollback(engine) {
      engine.keyboardManager
        .cancel(["shift"])
        .cancel(["r"])
        .cancel(["t"])
        .cancel(["e"])
        .cancel(["x"])
        .cancel(["y"])
        .cancel(["z"])
        .cancel(["space"]);
    },
  };
};
