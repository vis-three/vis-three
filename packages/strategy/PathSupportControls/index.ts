import { Strategy } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";

import { name as pkgname } from "./package.json";
import PathSupportControlsProcessor, {
  PathSupportControlsEngineSupport,
} from "./PathSupportControlsProcessor";
import {
  CONFIGTYPE,
  MODULETYPE,
  PLUGINS,
  uniqueSymbol,
} from "@vis-three/middleware";
import { PATH_SUPPORT_CONTROLS_PLUGIN } from "@vis-three/plugin-path-support-controls";
import { ControlsCompiler } from "@vis-three/module-controls/ControlsCompiler";

export const PATH_SUPPORT_CONTROLS_STRATEGY = transPkgName(pkgname);

export const PathSupportControlsStrategy: Strategy<
  PathSupportControlsEngineSupport,
  object
> = function () {
  return {
    name: PATH_SUPPORT_CONTROLS_STRATEGY,
    condition: [...PLUGINS, PATH_SUPPORT_CONTROLS_PLUGIN],
    exec(engine) {
      const compiler = engine.compilerManager.getCompiler<ControlsCompiler>(
        MODULETYPE.CONTROLS
      )!;

      compiler.reigstProcessor(PathSupportControlsProcessor, (compiler) => {
        compiler.map.set(
          uniqueSymbol(CONFIGTYPE.PATHSUPPORTCONTROLS),
          engine.pathSupportControls
        );

        compiler.weakMap.set(
          engine.pathSupportControls,
          uniqueSymbol(CONFIGTYPE.PATHSUPPORTCONTROLS)
        );
      });
    },
    rollback(engine) {},
  };
};
