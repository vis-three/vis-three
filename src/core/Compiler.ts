import { BaseEvent, EventDispatcher, Object3D } from "three";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { isValidKey } from "../utils/utils";

export interface CompilerTarget {
  [key: string]: SymbolConfig
}
export interface ObjectCompiler {
  readonly IS_OBJECTCOMPILER: boolean
  add: Function
  remove: Function
  getSupportVid(parameter: unknown): SymbolConfig['vid'] | null
}

export abstract class Compiler{

  static applyConfig<C extends SymbolConfig, O> (config: C, object: O, callBack?: Function) {
    const filterMap = {
      vid: true,
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