import { Strategy } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";

import { name as pkgname } from "./package.json";
import {
  getPathSupportControlsConfig,
  PathSupportControlsEngineSupport,
} from "./PathSupportControlsModel";
import {
  CONFIG_TYPE,
  generateConfig,
  MODULE_TYPE,
  PLUGINS,
  uniqueSymbol,
} from "@vis-three/tdcm";
import { PATH_SUPPORT_CONTROLS_PLUGIN } from "@vis-three/plugin-path-support-controls";
import { ControlsCompiler } from "@vis-three/module-controls/ControlsCompiler";
import PathSupportControlsModel from "./PathSupportControlsModel";

export const PATH_SUPPORT_CONTROLS_STRATEGY = transPkgName(pkgname);

export * from "./PathSupportControlsModel";

export const PathSupportControlsStrategy: Strategy<
  PathSupportControlsEngineSupport,
  object
> = function () {
  return {
    name: PATH_SUPPORT_CONTROLS_STRATEGY,
    condition: [...PLUGINS, PATH_SUPPORT_CONTROLS_PLUGIN],
    exec(engine) {
      const compiler = engine.compilerManager.getCompiler<ControlsCompiler>(
        MODULE_TYPE.CONTROLS
      )!;

      compiler.useModel(PathSupportControlsModel, (compiler) => {
        const originConfig = generateConfig(
          CONFIG_TYPE.PATHSUPPORTCONTROLS,
          getPathSupportControlsConfig()
        );

        engine.applyConfig(originConfig);
      });
    },
    rollback(engine) {},
  };
};
