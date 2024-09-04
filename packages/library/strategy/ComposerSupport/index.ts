import { Strategy } from "@vis-three/core";
import { EngineSupport, MODULE_TYPE, PLUGINS } from "@vis-three/tdcm";
import PassModule, {
  PassCompiler,
  PassModuleEngine,
} from "@vis-three/module-pass";
import {
  EffectComposerEngine,
  EFFECT_COMPOSER_PLUGIN,
} from "@vis-three/plugin-effect-composer";
import { transPkgName } from "@vis-three/utils";

import { name as pkgname } from "./package.json";

export interface ComposerSupportEngine
  extends EngineSupport,
    EffectComposerEngine,
    PassModuleEngine {}

export const name = transPkgName(pkgname);

export const ComposerSupportStrategy: Strategy<ComposerSupportEngine, object> =
  function () {
    return {
      name,
      condition: [...PLUGINS, EFFECT_COMPOSER_PLUGIN],
      exec(engine) {
        const compiler = engine.compilerManager.getCompiler<PassCompiler>(
          MODULE_TYPE.PASS
        )!;

        if (!compiler) {
          engine.useModule(PassModule);
        }

        compiler.useEngine(engine);
      },
      rollback(engine) {},
    };
  };
