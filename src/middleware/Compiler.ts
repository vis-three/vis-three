import { SymbolConfig } from "../case/common/CommonConfig";
import { isValidKey } from "../utils/utils";

export interface CompilerTarget {
  [key: string]: unknown
}

export abstract class Compiler {

  static applyConfig<C extends SymbolConfig, O> (config: C, object: O, callBack?: Function) {
    const filterMap = {
      type: true
    }

    const recursiveConfig = (config, object) => {
      for (const key in config) {
        if (typeof config[key] === 'object' && typeof config[key] !== null && isValidKey(key, object)) {
          recursiveConfig(config[key], object[key])
        } else {
          if (isValidKey(key, object) && !filterMap[key]) {
            object[key] = config[key]
          }
        }
      }
    }

    recursiveConfig(config, object)
    callBack && callBack()
  }

  constructor() {
    
  }

  abstract setTarget (parameter: unknown): this
  abstract compileAll(): this
  abstract dispose(parameter: unknown): this
}