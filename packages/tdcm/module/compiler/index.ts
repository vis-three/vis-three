import { objectDeepMerge, syncObject } from "@vis-three/utils";
import { BasicConfig } from "../common";
import { EngineSupport } from "../../engine";
import { CtnNotice } from "../container";
import { emunCamelize, emunDecamelize } from "../../utils/humps";
import {
  CONFIG_FACTORY,
  CONFIG_MODEL,
  CONFIG_MODULE,
  CONFIG_TYPE,
  CONFIGTYPE,
} from "../space";
import { Model, ModelOption, ModelParameters } from "../model";
import { MODEL_EVENT } from "../constant";

/** 编译器参数 */
export interface CompilerParameters<E extends EngineSupport = EngineSupport> {
  /**所属的模块类型 */
  module: string;
  /**可用的配置化模型 */
  models: ModelOption<any, any, any, any, E>[];
}

export interface Builder<
  E extends EngineSupport = EngineSupport,
  C extends Compiler<E> = Compiler<E>
> {
  option: ModelOption<any, any, any, any, E>;
  Builder?: new (params: ModelParameters<any, any, E, C>) => Model<
    any,
    any,
    E,
    C
  >;
}

export class Compiler<E extends EngineSupport = EngineSupport> {
  MODULE = "";

  builders = new Map<string, Builder<E>>();

  target: Record<string, BasicConfig> = {};
  map: Map<BasicConfig["vid"], Model<any, any, E>> = new Map();
  symbolMap: WeakMap<Model<any, any, E, this>["puppet"], BasicConfig["vid"]> =
    new WeakMap();

  engine!: E;

  constructor(params: CompilerParameters<E>) {
    this.MODULE = params.module;

    for (const option of params.models) {
      this.useModel(option);
    }
  }

  /**
   * @deprecated
   * @returns
   */
  getMap() {
    return null;
  }

  /**
   * 使用引擎
   * @param engine 继承于EngineSupport的engine
   * @returns this
   */
  useEngine(engine: E): this {
    this.engine = engine;
    return this;
  }

  /**
   * 设置配置化编译目标
   * @param target 配置化编译对象结构
   * @returns this
   */
  setTarget(target: Record<string, BasicConfig>): this {
    this.target = target;
    return this;
  }

  /**
   * 编译操作添加
   * @param config 添加的配置
   * @returns 该配置对应的模型puppet或者空
   */
  add(config: BasicConfig): any | null {
    if (!this.builders.has(config.type)) {
      console.warn(
        `${this.MODULE} Compiler: can not support this type: ${config.type}`
      );
      return null;
    }

    const { option, Builder } = this.builders.get(config.type)!;

    const model = Builder
      ? new Builder({ config, engine: this.engine, compiler: this })
      : new Model({
          config,
          engine: this.engine,
          compiler: this as Compiler<E>,
        });

    if (option.context) {
      Object.assign(model, option.context({ model }));
    }

    model.createPuppet = option.create;
    model.disposePuppet = option.dispose;
    model.commands = option.commands;

    model.create();

    this.map.set(config.vid, model);
    this.symbolMap.set(model.puppet, config.vid);

    model.emit(MODEL_EVENT.COMPILED_ADD);
    model.emit(MODEL_EVENT.COMPILED);

    return model.puppet;
  }

  /**
   * 编译操作移除
   * @param config 移除的配置
   * @returns this
   */
  remove(config: BasicConfig): this {
    const vid = config.vid;

    if (!this.map.has(vid)) {
      console.warn(
        `${this.MODULE} Compiler: can not found this vid object: ${vid}.`
      );
      return this;
    }

    if (!this.builders.has(config.type)) {
      console.warn(
        `${this.MODULE} Compiler: can not support this type: ${config.type}`
      );
      return this;
    }

    const model = this.map.get(vid)!;

    this.map.delete(vid);
    this.symbolMap.delete(model.puppet);

    model.dispose();

    model.emit(MODEL_EVENT.COMPILED_REMOVE);
    model.emit(MODEL_EVENT.COMPILED);

    return this;
  }

  /**
   * 编译操作覆盖
   * @param config 覆盖的配置
   * @returns this
   */
  cover(config: BasicConfig): this {
    const vid = config.vid;

    if (!this.map.has(vid)) {
      console.warn(
        `${this.MODULE} Compiler: can not found this vid object: ${vid}.`
      );
      return this;
    }

    Promise.resolve().then(() => {
      // 兼容初始时候的cover
      // 自己跟自己合并一次
      syncObject(config as BasicConfig, config, {
        vid: true,
        type: true,
      });
    });

    return this;
  }

  /**
   * 编译操作运行时的编译处理
   * @param vid 配置标识
   * @param notice 运行时的操作通知
   * @returns this
   */
  compile(vid: BasicConfig["vid"], notice: CtnNotice): this {
    if (!this.map.has(vid)) {
      console.warn(
        `${this.MODULE} Compiler: can not found model which vid is: '${vid}'`
      );
      return this;
    }

    const model = this.map.get(vid)!;

    model.process(notice);

    const router = notice.path;

    model.emit(
      `${MODEL_EVENT.COMPILED_ATTR}:${router ? router + "." : router}${
        notice.key
      }`
    );
    model.emit(MODEL_EVENT.COMPILED_UPDATE);
    model.emit(MODEL_EVENT.COMPILED);

    return this;
  }

  /**
   * 编译该实例目标下所有的配置
   * @returns this
   */
  compileAll(): this {
    const target = this.target;
    for (const config of Object.values(target)) {
      this.add(config);
    }
    return this;
  }

  /**
   * 该编译器的销毁方法
   * @returns this
   */
  dispose(): this {
    for (const model of this.map.values()) {
      model.dispose();
    }

    this.map.clear();
    this.target = {} as Record<string, BasicConfig>;

    return this;
  }

  /**
   * 获取一个对象的标识
   * @param object 物体对象
   * @returns vid |null
   */
  getObjectSymbol(object: object): string | null {
    return this.symbolMap.get(object) || null;
  }
  /**
   * 通过对象标识获取物体对象
   * @param vid 对象标识
   * @returns 物体对象 | null
   */
  getObjectBySymbol(vid: string): any | null {
    return this.map.get(vid)?.puppet || null;
  }

  /**
   * 通过对象标识获取配置化模型
   * @param vid 对象标识
   * @returns 配置化模型 | null
   */
  getModelBySymbol(vid: string): Model<any, any, E> | null {
    return this.map.get(vid) || null;
  }

  /**
   * 使用一个配置化模型
   * @param option 配置化模型选项
   * @param callback 使用后的回调函数
   * @returns this
   */
  useModel(
    option: ModelOption<any, any, any, any, E>,
    callback?: (compiler: this) => void
  ) {
    if (CONFIG_MODEL[option.type]) {
      console.warn(
        `${this.MODULE} Compiler: has already exist this model ${option.type}.`
      );
      return this;
    }

    let Builder:
      | undefined
      | (new (params: ModelParameters<any, any, E>) => Model<any, any, E>) =
      undefined;

    if (option.shared) {
      Builder = class<
        C extends BasicConfig = BasicConfig,
        P extends object = object,
        E extends EngineSupport = EngineSupport,
        O extends Compiler<E> = Compiler<E>
      > extends Model<C, P, E, O> {
        constructor(params: ModelParameters<C, P, E, O>) {
          super(params);
        }
      } as unknown as new (params: ModelParameters<any, any, E>) => Model<
        any,
        any,
        E
      >;

      for (const key in option.shared) {
        Builder.prototype[key] = option.shared[key];
      }
    }

    if (option.expand) {
      const expendModel = function (target, merge) {
        if (!target) {
          console.error(
            `Compiler: model expend error, can not found model witch has not been registered.`,
            merge.models,
            CONFIG_MODEL
          );
        } else {
          const targetConfig = target.config;
          target.config = function () {
            return Object.assign(targetConfig(), merge.config());
          };
          !target.commands && (target.commands = {});
          target.commands = objectDeepMerge(target.commands, merge.commands, {
            fresh: false,
          });
        }
      };

      for (const rule of option.expand) {
        if (typeof rule.models === "string") {
          expendModel(CONFIG_MODEL[rule.models], rule);
        } else if (Array.isArray(rule.models)) {
          for (const key in rule.models) {
            expendModel(CONFIG_MODEL[key], rule);
          }
        } else if (rule.models instanceof RegExp) {
          for (const key in CONFIG_MODEL) {
            if (rule.models.test(key)) {
              expendModel(CONFIG_MODEL[key], rule);
            }
          }
        }
      }
    }

    this.builders.set(option.type, {
      option,
      Builder,
    });

    Object.defineProperty(CONFIG_FACTORY, option.type, {
      get() {
        return () => Object.assign(option.config(), { type: option.type });
      },
    });

    CONFIG_TYPE[emunDecamelize(option.type)] = option.type;
    // @deprecated
    CONFIGTYPE[emunCamelize(option.type)] = option.type;
    CONFIG_MODULE[option.type] = this.MODULE;
    CONFIG_MODEL[option.type] = option;

    callback && callback(this);

    return this;
  }

  /**
   * @deprecated use useModel
   * @param processor
   * @param callback
   * @returns
   */
  useProcessor(
    processor: ModelOption<any, any, any, any, E>,
    callback?: (compiler: this) => void
  ): this {
    return this.useModel(processor, callback);
  }
}
