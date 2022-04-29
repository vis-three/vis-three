import { EngineSupport } from "../engine/EngineSupport";
import {
  CompilerManager,
  CompilerManagerParameters,
} from "../manager/CompilerManager";

import { Plugin } from "./plugin";

export const CompilerManagerPlugin: Plugin<CompilerManagerParameters> =
  function (this: EngineSupport, params: CompilerManagerParameters): boolean {
    if (this.compilerManager) {
      console.warn("engine has installed compilerManager plugin.");
      return false;
    }

    if (!this.dataSupportManager) {
      console.warn(
        "must install dataSupportManager before compilerManager plugin."
      );
      return false;
    }

    if (!this.renderManager) {
      console.warn(`must install renderManager before compilerManager plugin.`);
      return false;
    }

    const compilerManager = new CompilerManager();

    this.compilerManager = compilerManager;

    this.addEventListener("dispose", () => {
      this.compilerManager!.dispose();
    });

    this.completeSet.add(() => {
      this.compilerManager!.support(this);
    });

    return true;
  };
