import { transPkgName } from "@vis-three/utils";
import { Strategy } from "../../core/strategy";
import { name as pkgname } from "./package.json";
import {
  COMPILER_MANAGER_PLUGIN,
  CONFIGFACTORY,
  DATA_SUPPORT_MANAGER_PLUGIN,
  EngineSupport,
} from "@vis-three/middleware";
import { EFFECT_COMPOSER_PLUGIN } from "@vis-three/effect-composer-plugin";

export const COMPOSER_SUPPORT_STRATEGY = transPkgName(pkgname);

export const ComposerSupportStrategy: Strategy<EngineSupport> = function () {
  return {
    name: COMPOSER_SUPPORT_STRATEGY,
    condition: [
      COMPILER_MANAGER_PLUGIN,
      DATA_SUPPORT_MANAGER_PLUGIN,
      EFFECT_COMPOSER_PLUGIN,
    ],
    exec(engine) {
      console.log("This strategy has been replaced by the pass module");
    },
    rollback() {},
  };
};
