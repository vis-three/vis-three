import { Strategy } from "@vis-three/core";
import {
  COMPILER_MANAGER_PLUGIN,
  CONFIGTYPE,
  DATA_SUPPORT_MANAGER_PLUGIN,
  MODULETYPE,
  ObjectConfig,
  uniqueSymbol,
} from "@vis-three/middleware";
import { ControlsCompiler } from "@vis-three/middleware/controls/ControlsCompiler";
import {
  ObjectChangedEvent,
  TRANSFORM_CONTROLS_PLUGIN,
  TRANSFORM_EVENT,
} from "@vis-three/transform-controls-plugin";
import { transPkgName } from "@vis-three/utils";
import { Object3D } from "three";
import { name as pkgname } from "./package.json";
import TransformControlsProcessor, {
  TransformControlsSupportEngine,
} from "./TransformControlsProcessor";

export const TRANSFORM_CONTROLS_SUPPORT_STRATEGY = transPkgName(pkgname);

export const TransformControlsSupportStrategy: Strategy<TransformControlsSupportEngine> =
  function () {
    return {
      name: TRANSFORM_CONTROLS_SUPPORT_STRATEGY,
      condition: [
        COMPILER_MANAGER_PLUGIN,
        DATA_SUPPORT_MANAGER_PLUGIN,
        TRANSFORM_CONTROLS_PLUGIN,
      ],
      exec(engine) {
        const compiler = engine.compilerManager.getCompiler<ControlsCompiler>(
          MODULETYPE.CONTROLS
        )!;

        compiler.reigstProcessor(TransformControlsProcessor, (compiler) => {
          compiler.map.set(
            uniqueSymbol(CONFIGTYPE.TRNASFORMCONTROLS),
            engine.transformControls
          );

          compiler.weakMap.set(
            engine.transformControls,
            uniqueSymbol(CONFIGTYPE.ORBITCONTROLS)
          );
        });

        const objectToConfig = (object: Object3D): ObjectConfig | null => {
          const symbol = engine.compilerManager.getObjectSymbol(object);
          if (!symbol) {
            return null;
          }

          return engine.dataSupportManager.getConfigBySymbol(symbol);
        };

        let config: ObjectConfig | null = null;
        let mode: string;
        engine.transformControls.addEventListener(
          TRANSFORM_EVENT.CHANGED,
          (event) => {
            const e = event as unknown as ObjectChangedEvent;

            e.transObjectSet.forEach((object) => {
              config = objectToConfig(object);
              mode = e.mode;
              if (config) {
                config[mode].x = object[mode].x;
                config[mode].y = object[mode].y;
                config[mode].z = object[mode].z;
              }
            });
          }
        );
      },
      rollback() {},
    };
  };
