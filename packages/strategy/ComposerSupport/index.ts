import { Strategy } from "@vis-three/core";
import { EngineSupport, MODULETYPE, PLUGINS } from "@vis-three/middleware";
import { PassCompiler } from "@vis-three/module-pass/PassCompiler";
import {
  EffectComposerEngine,
  EFFECT_COMPOSER_PLUGIN,
} from "@vis-three/plugin-effect-composer";
import { transPkgName } from "@vis-three/utils";
import PassModule from "@vis-three/module-pass";

import { name as pkgname } from "./package.json";

export interface ComposerSupportEngine
  extends EngineSupport,
    EffectComposerEngine {}

export const name = transPkgName(pkgname);

export const ComposerSupportStrategy: Strategy<ComposerSupportEngine, object> =
  function () {
    return {
      name,
      condition: [...PLUGINS, EFFECT_COMPOSER_PLUGIN],
      exec(engine) {
        const compiler = engine.compilerManager.getCompiler<PassCompiler>(
          MODULETYPE.PASS
        )!;

        if (!compiler) {
          engine.registModule(PassModule);
        }

        compiler.useEngine(engine);
      },
      rollback(engine) {},
    };
  };
