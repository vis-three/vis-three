import { SymbolConfig } from "../middleware/common/CommonConfig";
import { isValidKey } from "../utils/utils";
import { EngineSupport } from "../engine/EngineSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { ProxyNotice } from "./ProxyBroadcast";
import { Processor2, ProcessorOptions } from "./Processor";
import { object } from "vue-types";

export interface CompilerTarget {
  [key: string]: SymbolConfig;
}

export abstract class Compiler<T extends CompilerTarget, O extends object> {
  static processors = new Map<
    CONFIGTYPE | string,
    Processor2<SymbolConfig, object>
  >();

  static processor = function <C extends SymbolConfig, T extends object>(
    processor: Processor2<C, T>
  ) {
    Compiler.processors.set(
      processor.configType,
      <Processor2<SymbolConfig, object>>(<unknown>processor)
    );
  };

  /**
   * @deprecated
   * @param config
   * @param object
   * @param filter
   * @param callBack
   */
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

  target: T = {} as T;
  map: Map<SymbolConfig["vid"], O> = new Map();
  weakMap: WeakMap<O, SymbolConfig["vid"]> = new WeakMap();

  constructor() {}
  abstract MODULE: MODULETYPE;
  abstract getObjectSymbol(object: any): string | null;
  abstract getObjectBySymbol(vid: string): any | null;
  abstract setTarget(parameter: unknown): this;
  abstract useEngine(engine: EngineSupport): this;
  abstract compileAll(): this;
  abstract dispose(parameter: unknown): this;
  compile(vid: string, input: ProxyNotice): this {
    return this;
  }
  add(config: any): this {
    return this;
  }
  remove(config: any): this {
    return this;
  }
  cover(config: any): this {
    return this;
  }
}
