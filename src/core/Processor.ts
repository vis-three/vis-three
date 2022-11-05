import { EngineSupport } from "../engine/EngineSupport";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { CONFIGTYPE } from "../middleware/constants/configType";
import {
  DeepIntersection,
  DeepPartial,
  DeepRecord,
  DeepUnion,
} from "../utils/utils";
import { Compiler } from "./Compiler";
import { ProxyNotice } from "./DataContainer";

export interface ProcessParams<C extends SymbolConfig, T extends object>
  extends ProxyNotice {
  config: C;
  target: T;
  processor: Processor<C, T>;
  compiler: Compiler<C, T>;
  engine: EngineSupport;
}

export type RegCommand<C extends SymbolConfig, T extends object> = {
  reg: RegExp;
  handler: (params: ProcessParams<C, T>) => void;
};

export type KeyCommand<C extends SymbolConfig, T extends object> = (
  params: ProcessParams<C, T>
) => void;

export type CommandStructure<
  C extends SymbolConfig,
  T extends object
> = DeepIntersection<
  DeepPartial<DeepRecord<DeepUnion<C, KeyCommand<C, T>>, KeyCommand<C, T>>>,
  { $reg?: RegCommand<C, T>[] }
>;

export interface ProcessorCommands<C extends SymbolConfig, T extends object> {
  add?: CommandStructure<C, T>;
  set?: CommandStructure<C, T>;
  delete?: CommandStructure<C, T>;
}

export interface ProcessorOptions<C extends SymbolConfig, T extends object> {
  configType: CONFIGTYPE | string;
  commands?: ProcessorCommands<C, T>;
  create: (config: C, engine: EngineSupport) => T;
  dispose: (target: T) => void;
}

export type DefineProcessor = <C extends SymbolConfig, T extends object>(
  options: ProcessorOptions<C, T>
) => Processor<C, T>;

export class Processor<C extends SymbolConfig, T extends object> {
  configType: CONFIGTYPE | string;
  commands?: ProcessorCommands<C, T>;
  create: (config: C, engine: EngineSupport) => T;
  dispose: (target: T) => void;

  constructor(options: ProcessorOptions<C, T>) {
    this.configType = options.configType;
    this.commands = options.commands;
    this.create = options.create;
    this.dispose = options.dispose;
  }

  process(params: ProcessParams<C, T>) {
    if (!this.commands || !this.commands[params.operate]) {
      this[params.operate](params);
      return;
    }
    let commands = this.commands[params.operate]!;

    for (const key of ([] as string[]).concat(params.path, params.key)) {
      if (!commands[key] && !commands.$reg) {
        this[params.operate](params);
        return;
      } else if (commands[key]) {
        if (typeof commands[key] === "function") {
          (commands[key] as Function)(params);
          return;
        } else {
          commands = commands[key];
        }
      } else if (commands.$reg) {
        for (const item of commands.$reg) {
          if (item.reg.test(key)) {
            item.handler(params);
            return;
          }
        }
      }
    }

    this[params.operate](params);
  }

  add(params: ProcessParams<C, T>) {
    let target = params.target;
    const path = params.path;

    for (const key of path) {
      if (typeof target[key] !== undefined) {
        target = target[key];
      } else {
        console.warn(`processor can not exec default add operate.`, params);
        return;
      }
    }

    target[params.key] = params.value;
  }

  set(params: ProcessParams<C, T>) {
    let target = params.target;
    const path = params.path;

    for (const key of path) {
      if (typeof target[key] !== undefined) {
        target = target[key];
      } else {
        console.warn(`processor can not exec default set operate.`, params);
        return;
      }
    }

    target[params.key] = params.value;
  }

  delete(params: ProcessParams<C, T>) {
    let target = params.target;
    const path = params.path;

    for (const key of path) {
      if (typeof target[key] !== undefined) {
        target = target[key];
      } else {
        console.warn(`processor can not exec default delete operate.`, params);
        return;
      }
    }

    delete target[params.key];
  }
}

export const defineProcessor: DefineProcessor = <
  C extends SymbolConfig,
  T extends object
>(
  options: ProcessorOptions<C, T>
) => {
  return new Processor<C, T>(options);
};

export const emptyHandler = function () {};
