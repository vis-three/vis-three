import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Engine } from "../engine/Engine";
import { KeyboardManager } from "../manager/KeyboardManager";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { TransformControlsConfig } from "../middleware/controls/ControlsConfig";
import { Plugin } from "./plugin";

export const KeyboardManagerPlugin: Plugin<object> = function (
  this: Engine,
  params: object
): boolean {
  if (this.keyboardManager) {
    console.warn("engine has installed keyboardManager plugin.");
    return false;
  }

  const keyboardManager = new KeyboardManager();

  this.keyboardManager = keyboardManager;

  this.completeSet.add(() => {
    if (this.transformControls) {
      let transformControls: TransformControlsConfig | TransformControls;
      if (this.IS_ENGINESUPPORT) {
        transformControls =
          this.dataSupportManager!.controlsDataSupport.getData()[
            CONFIGTYPE.TRNASFORMCONTROLS
          ] as TransformControlsConfig;
        keyboardManager.register({
          shortcutKey: ["shift"],
          desp: "变换控制器锁定步幅",
          keyup: (event) => {
            event?.preventDefault();
            (<TransformControlsConfig>transformControls).snapAllow = false;
          },
          keydown: (event) => {
            event?.preventDefault();
            event?.preventRepeat();
            (<TransformControlsConfig>transformControls).snapAllow = true;
          },
        });
      } else {
        transformControls = this.transformControls!;
        keyboardManager.register({
          shortcutKey: ["shift"],
          desp: "变换控制器锁定步幅",
          keyup: (event) => {
            event?.preventDefault();
            transformControls.translationSnap = null;
            transformControls.rotationSnap = null;
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
        });
      }

      keyboardManager
        .register({
          shortcutKey: ["r"],
          desp: "变换控制器模式：旋转",
          keyup: (event) => {
            event?.preventDefault();
            transformControls.mode = "rotate";
          },
        })
        .register({
          shortcutKey: ["t"],
          desp: "变换控制器模式：移动",
          keyup: (event) => {
            event?.preventDefault();
            transformControls.mode = "translate";
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
    }
  });

  return true;
};
