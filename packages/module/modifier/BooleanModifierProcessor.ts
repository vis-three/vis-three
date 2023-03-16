import {
  defineProcessor,
  EngineSupport,
  globalAntiShake,
} from "@vis-three/middleware";
import { BooleanModifier } from "@vis-three/modifier-library";
import { ModifierCompiler } from "./ModifierCompiler";
import {
  BooleanModifierConfig,
  getBooleanModifierConfig,
} from "./ModifierConfig";

export default defineProcessor<
  BooleanModifierConfig,
  BooleanModifier,
  EngineSupport,
  ModifierCompiler
>({
  type: "BooleanModifier",
  config: getBooleanModifierConfig,
  commands: {
    set: {
      source: () => {},
      target: () => {},
    },
  },
  create: function (
    config: BooleanModifierConfig,
    engine: EngineSupport,
    compiler: ModifierCompiler
  ): BooleanModifier {
    const modifier = new BooleanModifier({
      mode: config.mode as any,
    });

    globalAntiShake.exec((finish) => {
      if (config.source) {
        const source = engine.compilerManager.getObjectBySymbol(config.source);
        if (!source) {
          finish &&
            console.warn(
              `Boolean modifier processor can not found object by vid: ${config.source}`
            );
          return false;
        }
        modifier.source = source;
        return true;
      }
      return true;
    });

    return modifier;
  },
  dispose: function (
    target: BooleanModifier,
    engine: EngineSupport,
    compiler: ModifierCompiler
  ): void {
    target.dispose();
  },
});
