import { Strategy } from "@vis-three/core";
import {
  COMPILER_MANAGER_PLUGIN,
  CONFIG_TYPE,
  DATA_SUPPORT_MANAGER_PLUGIN,
  generateConfig,
  MODULE_TYPE,
  uniqueSymbol,
} from "@vis-three/tdcm";
import { ControlsCompiler } from "@vis-three/module-controls/ControlsCompiler";
import { ObjectConfig } from "@vis-three/module-object";
import {
  TRANSFORM_CONTROLS_PLUGIN,
  TRANSFORM_EVENT,
} from "@vis-three/plugin-transform-controls";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import TransformControlsModel, {
  getTransformControlsConfig,
  TransformControlsSupportEngine,
} from "./TransformControlsModel";

export const TRANSFORM_CONTROLS_SUPPORT_STRATEGY = transPkgName(pkgname);

export const TransformControlsSupportStrategy: Strategy<
  TransformControlsSupportEngine,
  object
> = function () {
  return {
    name: TRANSFORM_CONTROLS_SUPPORT_STRATEGY,
    condition: [
      COMPILER_MANAGER_PLUGIN,
      DATA_SUPPORT_MANAGER_PLUGIN,
      TRANSFORM_CONTROLS_PLUGIN,
    ],
    exec(engine) {
      const compiler = engine.compilerManager.getCompiler<ControlsCompiler>(
        MODULE_TYPE.CONTROLS
      )!;

      compiler.useModel(TransformControlsModel, (compiler) => {
        engine.applyConfig(
          generateConfig(
            CONFIG_TYPE.TRANSFORMCONTROLS,
            getTransformControlsConfig()
          )
        );
      });

      // TODO: compiler event pref to observer event
      let config: ObjectConfig | null = null;
      engine.transformControls.addEventListener(
        TRANSFORM_EVENT.OBJECT_CHANGE,
        (event) => {
          event.transObjectSet.forEach((object) => {
            config = engine.getObjectConfig(object);
            if (config) {
              config!.position.x = object.position.x;
              config!.position.y = object.position.y;
              config!.position.z = object.position.z;
              config!.rotation.x = object.rotation.x;
              config!.rotation.y = object.rotation.y;
              config!.rotation.z = object.rotation.z;
              config!.scale.x = object.scale.x;
              config!.scale.y = object.scale.y;
              config!.scale.z = object.scale.z;
            }
          });
        }
      );
    },
    rollback() {},
  };
};
