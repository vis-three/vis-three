import { BaseEvent, EventDispatcher, Object3D } from "three";
import { SymbolConfig } from "../case/common/CommonConfig";
import { isValidKey } from "../utils/utils";

export interface CompilerTarget {
  [key: string]: SymbolConfig
}

export enum COMPILEREVENTTYPE {
  ADD = 'add',
  REMOVE = 'remove'
}

export interface CompilerAddEvent extends BaseEvent {
  type: COMPILEREVENTTYPE.ADD
  object: Object3D
  vid: string
}

export abstract class Compiler extends EventDispatcher<CompilerAddEvent> {

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
    super()
  }

  abstract setTarget (parameter: unknown): this
  abstract compileAll(): this
  abstract dispose(parameter: unknown): this
}