import {
  DeepIntersection,
  DeepPartial,
  DeepRecord,
  DeepUnion,
} from "@vis-three/utils";
import { SymbolConfig } from "../../common";
import { CONFIGTYPE } from "../../constants";
import { EngineSupport } from "../../engine";
import { CompileNotice, Compiler } from "../compiler";

export interface ProcessParams<
  C extends SymbolConfig,
  T extends object,
  E extends EngineSupport
> extends CompileNotice {
  config: C;
  target: T;
  processor: Processor<C, T, E>;
  compiler: Compiler<C, T>;
  engine: E;
}

export type RegCommand<
  C extends SymbolConfig,
  T extends object,
  E extends EngineSupport
> = {
  reg: RegExp;
  handler: (params: ProcessParams<C, T, E>) => void;
};

export type KeyCommand<
  C extends SymbolConfig,
  T extends object,
  E extends EngineSupport
> = (params: ProcessParams<C, T, E>) => void;

export type CommandStructure<
  C extends SymbolConfig,
  T extends object,
  E extends EngineSupport
> = DeepIntersection<
  DeepPartial<
    DeepRecord<DeepUnion<C, KeyCommand<C, T, E>>, KeyCommand<C, T, E>>
  >,
  { $reg?: RegCommand<C, T, E>[] }
>;

export interface ProcessorCommands<
  C extends SymbolConfig,
  T extends object,
  E extends EngineSupport
> {
  add?: CommandStructure<C, T, E>;
  set?: CommandStructure<C, T, E>;
  delete?: CommandStructure<C, T, E>;
}

export interface ProcessorOptions<
  C extends SymbolConfig,
  T extends object,
  E extends EngineSupport
> {
  configType: CONFIGTYPE | string;
  commands?: ProcessorCommands<C, T, E>;
  create: (config: C, engine: E) => T;
  dispose: (target: T) => void;
}

export type DefineProcessor = <
  C extends SymbolConfig,
  T extends object,
  E extends EngineSupport
>(
  options: ProcessorOptions<C, T, E>
) => Processor<C, T, E>;

export class Processor<
  C extends SymbolConfig,
  T extends object,
  E extends EngineSupport
> {
  configType: CONFIGTYPE | string;
  commands?: ProcessorCommands<C, T, E>;
  create: (config: C, engine: E) => T;
  dispose: (target: T) => void;

  constructor(options: ProcessorOptions<C, T, E>) {
    this.configType = options.configType;
    this.commands = options.commands;
    this.create = options.create;
    this.dispose = options.dispose;
  }

  process(params: ProcessParams<C, T, E>) {
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

  add(params: ProcessParams<C, T, E>) {
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

  set(params: ProcessParams<C, T, E>) {
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

  delete(params: ProcessParams<C, T, E>) {
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
  T extends object,
  E extends EngineSupport
>(
  options: ProcessorOptions<C, T, E>
) => {
  return new Processor<C, T, E>(options);
};

export const emptyHandler = function () {};
