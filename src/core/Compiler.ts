import { SymbolConfig } from "../middleware/common/CommonConfig";
import { isValidKey } from "../utils/utils";
import { EngineSupport } from "../engine/EngineSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";

export interface CompilerTarget {
  [key: string]: SymbolConfig;
}

export abstract class Compiler {
  static applyConfig<C extends SymbolConfig, O>(
    config: C,
    object: O,
    filter: object = {},
    callBack?: Function
  ) {
    const filterMap = Object.assign(
      {
        vid: true,
        type: true,
      },
      filter
    );

    const recursiveConfig = (config, object) => {
      for (const key in config) {
        if (filterMap[key]) {
          continue;
        }

        if (
          typeof config[key] === "object" &&
          typeof config[key] !== null &&
          isValidKey(key, object)
        ) {
          recursiveConfig(config[key], object[key]);
          continue;
        }

        if (isValidKey(key, object)) {
          object[key] = config[key];
        }
      }
    };

    recursiveConfig(config, object);
    callBack && callBack();
  }

  constructor() {}
  abstract MODULE: MODULETYPE;
  abstract getObjectSymbol(object: any): string | null;
  abstract getObjectBySymbol(vid: string): any | null;
  abstract setTarget(parameter: unknown): this;
  abstract useEngine(engine: EngineSupport): this;
  abstract compileAll(): this;
  abstract dispose(parameter: unknown): this;
}
