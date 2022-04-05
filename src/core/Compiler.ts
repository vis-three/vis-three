import { SymbolConfig } from "../middleware/common/CommonConfig";
import { isValidKey } from "../utils/utils";

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

  abstract setTarget(parameter: unknown): this;
  abstract compileAll(): this;
  abstract dispose(parameter: unknown): this;
}
