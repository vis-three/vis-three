import { Strategy } from "@vis-three/core";
import { EngineSupport } from "../../engine";
import { COMPILER_MANAGER_PLUGIN } from "../../plugin/CompilerManagerPlugin";
import { DATA_SUPPORT_MANAGER_PLUGIN } from "../../plugin/DataSupportManagerPlugin";

export const COMPILER_SUPPORT_STRATEGY = "CompilerSupportStrategy";

export const CompilerSupportStrategy: Strategy<EngineSupport, object> =
  function () {
    return {
      name: COMPILER_SUPPORT_STRATEGY,
      condition: [COMPILER_MANAGER_PLUGIN, DATA_SUPPORT_MANAGER_PLUGIN],
      exec(engine) {
        engine.compilerManager.compilerMap.forEach((compiler, module) => {
          compiler.useEngine(engine);
          engine.dataSupportManager.dataSupportMap
            .get(module)
            ?.addCompiler(compiler);
        });
      },
      rollback() {},
    };
  };
