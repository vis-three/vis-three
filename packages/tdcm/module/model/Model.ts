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
import { Compiler } from "../compiler";
import { AsyncScheduler } from "../../scheduler";

export interface ModelNotice extends Omit<CtnNotice, "path"> {
  path: string[];
}

export interface CommandParameters<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>,
  R extends Record<string, object> = Record<string, object>,
  M extends Model<C, P, E, O, R> = Model<C, P, E, O, R>
> extends ModelNotice {
  model: M;
  ctx: M;
  puppet: P;
  target: P;
  config: C;
  engine: E;
  compiler: O;
  resources: R;
}

export type RegCommand<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>,
  R extends Record<string, object> = Record<string, object>,
  M extends Model<C, P, E, O, R> = Model<C, P, E, O, R>
> = {
  reg: RegExp;
  handler: (this: M, params: CommandParameters<C, P, E, O, R, M>) => void;
};

export type KeyCommand<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>,
  R extends Record<string, object> = Record<string, object>,
  M extends Model<C, P, E, O, R> = Model<C, P, E, O, R>
> = (this: M, params: CommandParameters<C, P, E, O, R, M>) => void;

export type CommandStructure<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>,
  R extends Record<string, object> = Record<string, object>,
  M extends Model<C, P, E, O, R> = Model<C, P, E, O, R>
> = DeepIntersection<
  DeepPartial<
    DeepRecord<
      DeepUnion<C, KeyCommand<C, P, E, O, R, M>>,
      KeyCommand<C, P, E, O, R, M>
    >
  >,
  { $reg?: RegCommand<C, P, E, O, R, M>[] }
>;

export interface ModelCommands<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>,
  R extends Record<string, object> = Record<string, object>,
  M extends Model<C, P, E, O, R> = Model<C, P, E, O, R>
> {
  add?: CommandStructure<C, P, E, O, R, M>;
  set?: CommandStructure<C, P, E, O, R, M>;
  delete?: CommandStructure<C, P, E, O, R, M>;
}

export interface ModelParameters<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>
> {
  config: C;
  engine: E;
  compiler: O;
}

export class Model<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>,
  R extends Record<string, object> = Record<string, object>
> extends EventDispatcher {
  puppet!: P;
  config: C;
  engine: E;
  compiler: O;
  commands?: ModelCommands<C, P, E, O, R>;
  resources: R = {} as R;

  /**
   * 该配置化模型的对象生成方法。对应defineModel.create
   * @param this model本身
   * @param params 参数对象
   * params.model model本身
   * params.config model对应的配置
   * params.engine model使用的enigne
   * params.compiler model使用的compiler
   * @returns puppet 通过配置单生成的目标对象
   */
  createPuppet!: (
    this: any,
    params: { model: any; config: C; engine: E; compiler: O; resources: R }
  ) => P;

  /**
   * 该配置化模型的对象销毁方法。对应defineModel.dispose
   * @param this model本身
   * @param params 参数对象
   * params.model model本身
   * params.target model.puppet
   * params.puppet model.puppet
   * params.config model对应的配置
   * params.engine model使用的enigne
   * params.compiler model使用的compiler
   */
  disposePuppet!: (
    this: any,
    params: {
      model: any;
      target: P;
      puppet: P;
      config: C;
      engine: E;
      compiler: O;
      resources: R;
    }
  ) => void;

  constructor(params: ModelParameters<C, P, E, O>) {
    super();
    this.config = params.config;
    this.engine = params.engine;
    this.compiler = params.compiler;
  }

  /**
   * 转化为目标配置
   * @param vid vid标识
   * @returns Config | null
   */
  toConfig<CO extends BasicConfig>(vid: string): CO | null {
    return this.engine.getConfigBySymbol<CO>(vid);
  }

  /**
   * 转化为目标模型
   * @param vid vid标识或者 目标对象
   * @returns model | null
   */
  toModel<MO extends Model<any, any, any>>(vid: string | object) {
    if (typeof vid === "string") {
      return this.engine.compilerManager.getModelBySymbol<MO>(vid);
    } else {
      const symbol = this.engine.getObjectSymbol(vid);
      if (symbol) {
        return this.engine.compilerManager.getModelBySymbol<MO>(symbol);
      } else {
        console.warn(`Model: can not found object symbol:`, vid);
        return null;
      }
    }
  }

  /**
   * 转化为目标物体
   * @param vid vid标识
   * @returns object
   */
  toObject<OB extends object>(vid: string) {
    return this.engine.getObjectBySymbol(vid) as OB;
  }

  /**
   * 转化为目标物体
   * @param vid vid标识
   * @returns object
   */
  toPuppet<OB extends object>(vid: string) {
    return this.toObject<OB>(vid);
  }

  /**
   * 转化为异步执行
   * @param fun 所需要执行的函数方法
   */
  toAsync(fun: (finish: boolean) => boolean) {
    AsyncScheduler.exec(fun);
  }

  /**
   * 将函数方法加入到下一个异步队列中
   * @param fun 函数方法
   */
  asyncNextTick(fun: () => boolean) {
    AsyncScheduler.nextTick(fun);
  }

  /**
   * 转化为触发器触发
   * @param name 触发器名称
   * @param fun 需要触发器触发的函数方法
   */
  toTrigger(name: string, fun: (immediate: boolean) => boolean) {
    const trigger = this.engine.getTrigger(name);
    if (trigger) {
      trigger.register(fun);
    }
  }

  /**
   * 通用的处理方法
   * @param params 操作通知参数
   * @returns
   */
  process(params: CtnNotice) {
    const modelParams = {
      ...params,
      path: params.path ? params.path.split(".") : ([] as string[]),
    };

    if (!this.commands || !this.commands[params.operate]) {
      this[params.operate](modelParams);
      return;
    }
    let commands = this.commands[params.operate]!;

    const keyPath = (<string[]>[]).concat(modelParams.path, params.key);

    for (const key of keyPath) {
      if (!commands[key] && !commands.$reg) {
        this[params.operate](modelParams);
        return;
      } else if (commands[key]) {
        if (typeof commands[key] === "function") {
          commands[key].call(this, {
            model: this,
            ctx: this,
            config: this.config,
            target: this.puppet,
            puppet: this.puppet,
            engine: this.engine,
            compiler: this.compiler,
            ...modelParams,
          });
          return;
        } else {
          commands = commands[key];
        }
      } else if (commands.$reg) {
        for (const item of commands.$reg) {
          if (item.reg.test(key)) {
            item.handler.call(this, {
              model: this,
              ctx: this,
              config: this.config,
              target: this.puppet,
              puppet: this.puppet,
              engine: this.engine,
              compiler: this.compiler,
              resources: this.resources,
              ...modelParams,
            });
            return;
          }
        }
      }
    }

    this[params.operate](modelParams);
  }

  /**
   * 通用的操作添加方法
   * @param params 操作通知参数
   * @returns
   */
  private add(params: ModelNotice) {
    let target = this.puppet;

    for (const key of params.path) {
      if (typeof target[key] !== undefined) {
        target = target[key];
      } else {
        console.warn(`processor can not exec default add operate.`, params);
        return;
      }
    }

    target[params.key] = params.value;
  }
  /**
   * 通用的操作设置方法
   * @param params 操作通知参数
   * @returns
   */
  private set(params: ModelNotice) {
    let target = this.puppet;

    for (const key of params.path) {
      if (typeof target[key] !== undefined) {
        target = target[key];
      } else {
        console.warn(`processor can not exec default add operate.`, params);
        return;
      }
    }

    target[params.key] = params.value;
  }
  /**
   * 通用的操作删除方法
   * @param params 操作通知参数
   * @returns
   */
  private delete(params: ModelNotice) {
    let target = this.puppet;

    for (const key of params.path) {
      if (typeof target[key] !== undefined) {
        target = target[key];
      } else {
        console.warn(`processor can not exec default add operate.`, params);
        return;
      }
    }

    target[params.key] = params.value;
  }

  /**
   * 模型生成方法内部会调用createPuppet
   */
  create() {
    this.config[Symbol.for(SYMBOL_MODEL)] = this;
    this.puppet = this.createPuppet.call(this, {
      model: this,
      config: this.config,
      engine: this.engine,
      compiler: this.compiler,
      resources: this.resources || ({} as R),
    });
  }

  /**
   * 模型销毁方法内部会调用disposePuppet
   */
  dispose() {
    this.disposePuppet.call(this, {
      model: this,
      target: this.puppet,
      puppet: this.puppet,
      config: this.config,
      engine: this.engine,
      compiler: this.compiler,
      resources: this.resources || ({} as R),
    });
    this.config[Symbol.for(SYMBOL_MODEL)] = undefined;
    this.clear();
  }
}
