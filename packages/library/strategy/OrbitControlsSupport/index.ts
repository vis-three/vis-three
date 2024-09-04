import { Strategy } from "@vis-three/core";
import {
  COMPILER_MANAGER_PLUGIN,
  CONFIG_TYPE,
  DATA_SUPPORT_MANAGER_PLUGIN,
  generateConfig,
  MODULE_TYPE,
  uniqueSymbol,
} from "@vis-three/tdcm";
import { ORBIT_CONTROLS_PLUGIN } from "@vis-three/plugin-orbit-controls";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import OrbitControlsModel, {
  getOrbitControlsConfig,
  OrbitControlsSupportEngine,
} from "./OrbitControlsModel";
import { ControlsCompiler } from "@vis-three/module-controls";

export const ORBIT_CONTROLS_SUPPORT_STRATEGY = transPkgName(pkgname);

export * from "./OrbitControlsModel";

export const OrbitControlsSupportStrategy: Strategy<
  OrbitControlsSupportEngine,
  object
> = function () {
  return {
    name: ORBIT_CONTROLS_SUPPORT_STRATEGY,
    condition: [
      COMPILER_MANAGER_PLUGIN,
      DATA_SUPPORT_MANAGER_PLUGIN,
      ORBIT_CONTROLS_PLUGIN,
    ],
    exec(engine) {
      const compiler = engine.compilerManager.getCompiler<ControlsCompiler>(
        MODULE_TYPE.CONTROLS
      )!;

      compiler.useModel(OrbitControlsModel, (compiler) => {
        const originConfig = generateConfig(
          CONFIG_TYPE.ORBITCONTROLS,
          getOrbitControlsConfig()
        );

        engine.applyConfig(originConfig);
      });
    },
    rollback() {},
  };
};
