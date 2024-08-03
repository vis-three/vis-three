import { syncObject } from "@vis-three/utils";
import { BasicConfig } from "../common";
import { EngineSupport } from "../../engine";
import { CtnNotice } from "../container";
import { emunCamelize, emunDecamelize } from "../../utils/humps";
import {
  CONFIG_FACTORY,
  CONFIG_MODULE,
  CONFIG_TYPE,
  CONFIGTYPE,
} from "../space";
import { Model, ModelOption } from "../model";
import { MODEL_EVENT } from "../constant";

export interface CompilerParameters<
  E extends EngineSupport = EngineSupport,
  M extends Model<any, any, E> = Model<any, any, E>
> {
  module: string;
  models: ModelOption<any, any, E, M>[];
}

export class Compiler<
  E extends EngineSupport = EngineSupport,
  M extends Model<any, any, E> = Model<any, any, E>
> {
  MODULE = "";

  builders = new Map<string, new (config: any, engine: E) => M>();

  target: Record<string, BasicConfig> = {};
  map: Map<BasicConfig["vid"], M> = new Map();
  symbolMap: WeakMap<M["puppet"], BasicConfig["vid"]> = new WeakMap();

  engine!: E;

  constructor(params: CompilerParameters<E, M>) {
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

  useEngine(engine: E): this {
    this.engine = engine;
    return this;
  }

  setTarget(target: Record<string, BasicConfig>): this {
    this.target = target;
    return this;
  }

  add(config: BasicConfig): BasicConfig | null {
    if (!this.builders.has(config.type)) {
      console.warn(
        `${this.MODULE} Compiler: can not support this type: ${config.type}`
      );
      return null;
    }

    const Builder = this.builders.get(config.type)!;

    const model = new Builder(config, this.engine);

    model.beforeCreate();
    model.create();

    this.map.set(config.vid, model);
    this.symbolMap.set(model.puppet, config.vid);

    model.emit(MODEL_EVENT.COMPILED_ADD);
    model.emit(MODEL_EVENT.COMPILED);

    return model.puppet;
  }

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
    model.disposed();

    model.emit(MODEL_EVENT.COMPILED_REMOVE);
    model.emit(MODEL_EVENT.COMPILED);

    return this;
  }

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

  compileAll(): this {
    const target = this.target;
    for (const config of Object.values(target)) {
      this.add(config);
    }
    return this;
  }

  dispose(): this {
    for (const model of this.map.values()) {
      model.dispose();
      model.disposed();
    }

    this.map.clear();
    this.target = {} as Record<string, BasicConfig>;

    return this;
  }

  getObjectSymbol(object: BasicConfig): string | null {
    return this.symbolMap.get(object) || null;
  }
  getObjectBySymbol(vid: string): BasicConfig | null {
    return this.map.get(vid)?.puppet || null;
  }

  useModel(
    option: ModelOption<any, any, E, M>,
    callback?: (compiler: this) => void
  ) {
    if (this.builders.has(option.type)) {
      console.warn(
        `${this.MODULE} Compiler: has already exist this model ${option.type}.`
      );
      return this;
    }

    this.builders.set(option.type, option.model);

    CONFIG_FACTORY[option.type] = option.config;
    CONFIG_TYPE[emunDecamelize(option.type)] = option.type;
    // @deprecated
    CONFIGTYPE[emunCamelize(option.type)] = option.type;
    CONFIG_MODULE[option.type] = this.MODULE;

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
    processor: ModelOption<any, any, E, M>,
    callback?: (compiler: this) => void
  ): this {
    return this.useModel(processor, callback);
  }
}
