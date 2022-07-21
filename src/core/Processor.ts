import { EngineSupport } from "../engine/EngineSupport";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { Compiler } from "./Compiler";
import { ProxyNotice } from "./ProxyBroadcast";

export interface Process {
  key: string;
  path: string[];
  value: any;
}

export abstract class Processor {
  abstract target?: any;
  abstract config?: SymbolConfig;

  filterMap: { [key: string]: boolean } = {};

  protected assembly = false;

  constructor() {
    this.filterMap = Object.assign(
      {
        vid: true,
        type: true,
      },
      this.filterMap
    );
  }

  protected mergeAttribute(path: string[], key: string, value: any) {
    if (this.filterMap[path.concat([key]).join(".")]) {
      return;
    }

    let object = this.target!;
    if (path.length) {
      for (const key of path) {
        object = object[key];
      }
    }

    object[key] = value;
  }

  protected mergeObject(callBack?: Function) {
    const recursiveConfig = (config, object) => {
      for (const key in config) {
        if (this.filterMap[key]) {
          continue;
        }

        if (typeof config[key] === "object" && typeof config[key] !== null) {
          recursiveConfig(config[key], object[key]);
          continue;
        }

        object[key] = config[key];
      }
    };

    recursiveConfig(this.config!, this.target!);
    callBack && callBack();
  }

  processAll(): this {
    const recursiveConfig = (config: SymbolConfig, path: string[]) => {
      for (const key in config) {
        if (this.filterMap[path.concat([key]).join(".")]) {
          continue;
        }

        if (typeof config[key] === "object" && typeof config[key] !== null) {
          recursiveConfig(config[key], path.concat([key]));
          continue;
        }

        this.process({ path, key, value: config[key] });
      }
    };

    recursiveConfig(this.config!, []);
    return this;
  }

  abstract assemble(params: any): this;
  abstract process(params: Process): this;
  abstract dispose(): this;
}

export interface ProcessParams<C extends SymbolConfig, T extends object>
  extends ProxyNotice {
  config: C;
  target: T;
  engine: EngineSupport;
}

export interface CommandStructure<C extends SymbolConfig, T extends object> {
  [key: string]: (params: ProcessParams<C, T>) => void | CommandStructure<C, T>;
}

export interface ProcessorOptions<C extends SymbolConfig, T extends object> {
  configType: CONFIGTYPE | string;
  commands?: {
    add?: CommandStructure<C, T>;
    set?: CommandStructure<C, T>;
    delete?: CommandStructure<C, T>;
  };
  create: (config: C, engine: EngineSupport) => T;
  dispose: (target: T) => void;
}

export class Processor2<C extends SymbolConfig, T extends object> {
  configType: CONFIGTYPE | string;
  commands?: {
    add?: CommandStructure<C, T>;
    set?: CommandStructure<C, T>;
    delete?: CommandStructure<C, T>;
  };
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
      if (!commands[key]) {
        this[params.operate](params);
        return;
      } else {
        if (typeof commands[key] === "function") {
          commands[key](params);
          return;
        } else {
          commands = commands[key] as unknown as CommandStructure<C, T>;
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

export const defineProcessor = <C extends SymbolConfig, T extends object>(
  options: ProcessorOptions<C, T>
) => {
  return new Processor2<C, T>(options);
};
