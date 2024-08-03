import { EventDispatcher } from "@vis-three/core";
import { BasicConfig } from "../common";
import { EngineSupport } from "../../engine";
import { CtnNotice } from "../container";
import {
  DeepIntersection,
  DeepPartial,
  DeepRecord,
  DeepUnion,
} from "@vis-three/utils";
import { SYMBOL_MODEL } from "../../utils/obTool";

export type RegCommand<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport
> = {
  reg: RegExp;
  handler: (this: Model<C, P, E>, params: CtnNotice) => void;
};

export type KeyCommand<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport
> = (this: Model<C, P, E>, params: CtnNotice) => void;

export type CommandStructure<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport
> = DeepIntersection<
  DeepPartial<
    DeepRecord<DeepUnion<C, KeyCommand<C, P, E>>, KeyCommand<C, P, E>>
  >,
  { $reg?: RegCommand<C, P, E>[] }
>;

export interface ModelCommands<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport
> {
  add?: CommandStructure<C, P, E>;
  set?: CommandStructure<C, P, E>;
  delete?: CommandStructure<C, P, E>;
}

export abstract class Model<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport
> extends EventDispatcher {
  puppet!: P;
  config: C;
  engine: E;
  commands: ModelCommands<C, P, E> = {};

  constructor(config: C, engine: E) {
    super();
    this.config = config;
    this.engine = engine;
  }

  abstract create: () => void;

  abstract dispose: () => void;

  process(params: CtnNotice) {
    if (!this.commands || !this.commands[params.operate]) {
      this[params.operate](params);
      return;
    }
    let commands = this.commands[params.operate]!;

    const keyPath = params.path
      ? params.path.split(".").concat(params.key)
      : [params.key];

    for (const key of keyPath) {
      if (!commands[key] && !commands.$reg) {
        this[params.operate](params);
        return;
      } else if (commands[key]) {
        if (typeof commands[key] === "function") {
          commands[key].call(this, params);
          return;
        } else {
          commands = commands[key];
        }
      } else if (commands.$reg) {
        for (const item of commands.$reg) {
          if (item.reg.test(key)) {
            item.handler.call(this, params);
            return;
          }
        }
      }
    }

    this[params.operate](params);
  }

  private add(params: CtnNotice) {
    let target = this.puppet;
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

  private set(params: CtnNotice) {
    let target = this.puppet;
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

  private delete(params: CtnNotice) {
    let target = this.puppet;
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

  beforeCreate() {
    this.config[Symbol.for(SYMBOL_MODEL)] = this;
  }

  disposed() {
    this.config[Symbol.for(SYMBOL_MODEL)] = undefined;
    this.clear();
  }
}

export interface ModelOption<
  B extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport,
  C extends Model<B, P, E> = Model<B, P, E>
> {
  type: string;
  config: B;
  model: new () => C;
}

export const defineModel = function <
  B extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport,
  C extends Model<B, P, E> = Model<B, P, E>
>(option: ModelOption<B, P, E, C>) {
  return option;
};

/**
 * @deprecated use defineModel
 */
export const defineProcessor = defineModel;
