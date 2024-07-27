import { syncObject } from "@vis-three/utils";
import { BasicConfig } from "../common";
import { EngineSupport } from "../../engine";
import { CtnNotice } from "../container";
import { Processor } from "../processor";
import { Hook } from "../../utils/hooks";
import { emunCamelize, emunDecamelize } from "../../utils/humps";
import { CONFIG_FACTORY, CONFIG_MODULE, CONFIG_TYPE } from "../space";

export interface CompilerParameters {
  module: string;
  processors: Processor<any, any, any, any>[];
}

export enum COMPILER_EVENT {
  ADD = "compiler.add",
  REMOVE = "compiler.remove",
  COMPILE = "compiler.compile",
  UPDATE = "compiler.update",
}

export class Compiler {
  static hook = new Hook();

  MODULE = "";

  processors = new Map<
    string,
    Processor<BasicConfig, object, EngineSupport, any>
  >();
  target: Record<string, BasicConfig> = {};
  map: Map<BasicConfig["vid"], BasicConfig> = new Map();
  symbolMap: WeakMap<BasicConfig, BasicConfig["vid"]> = new WeakMap();
  engine!: EngineSupport;

  constructor(params: CompilerParameters) {
    this.MODULE = params.module;

    for (const processor of params.processors) {
      this.useProcessor(processor);
    }
  }

  private cacheCompile?: {
    target: any;
    config: BasicConfig;
    processor: Processor<BasicConfig, object, EngineSupport, any>;
    vid: string;
  };

  getMap(): Map<BasicConfig["vid"], BasicConfig> {
    return this.map;
  }

  useEngine(engine: EngineSupport): this {
    this.engine = engine;
    return this;
  }

  setTarget(target: Record<string, BasicConfig>): this {
    this.target = target;
    return this;
  }

  add(config: BasicConfig): BasicConfig | null {
    if (!this.processors.has(config.type)) {
      console.warn(`Compiler: can not support this type: ${config.type}`);
      return null;
    }

    const processor = this.processors.get(config.type)! as unknown as Processor<
      BasicConfig,
      BasicConfig,
      EngineSupport,
      any
    >;

    const object = processor.create(config, this.engine, this);
    this.map.set(config.vid, object);
    this.symbolMap.set(object, config.vid);

    Compiler.hook.create(object);

    Compiler.hook.emit(object, COMPILER_EVENT.ADD);

    return object;
  }

  remove(config: BasicConfig): this {
    const vid = config.vid;

    if (!this.map.has(vid)) {
      console.warn(`Compiler: can not found this vid object: ${vid}.`);
      return this;
    }

    if (!this.processors.has(config.type)) {
      console.warn(`Compiler: can not support this type: ${config.type}`);
      return this;
    }

    const object = this.map.get(vid)!;
    this.processors.get(config.type)!.dispose(object, this.engine, this);
    this.map.delete(vid);
    this.symbolMap.delete(object);

    Compiler.hook.emit(object, COMPILER_EVENT.REMOVE);

    Compiler.hook.dispose(object);

    if (this.cacheCompile && this.cacheCompile.vid === vid) {
      this.cacheCompile = undefined;
    }

    return this;
  }

  cover(config: BasicConfig): this {
    const vid = config.vid;

    if (!this.map.has(vid)) {
      console.warn(`Compiler: can not found this vid object: ${vid}.`);
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
    const cacheCompile = this.cacheCompile;

    let object: BasicConfig;
    let config: BasicConfig;
    let processor: Processor<BasicConfig, object, EngineSupport, any>;

    if (cacheCompile && cacheCompile.vid === vid) {
      object = cacheCompile.target;
      config = cacheCompile.config;
      processor = cacheCompile.processor;
    } else {
      if (!this.map.has(vid)) {
        console.warn(`Compiler: can not found object which vid is: '${vid}'`);
        return this;
      }

      if (!this.target[vid]) {
        console.warn(`Compiler: can not found config which vid is: '${vid}'`);
        return this;
      }
      object = this.map.get(vid)!;
      config = this.target[vid]!;

      if (!this.processors.has(config.type)) {
        console.warn(`PassCompiler can not support this type: ${config.type}`);
        return this;
      }

      processor = this.processors.get(config.type)!;

      this.cacheCompile = {
        target: object,
        config,
        processor,
        vid,
      };
    }

    processor.process({
      config,
      target: object,
      engine: this.engine,
      processor,
      compiler: this,
      ...notice,
    });

    const router = notice.path;

    Compiler.hook.emit(
      object,
      `${COMPILER_EVENT.COMPILE}:${router ? router + "." : router}${notice.key}`
    );

    Compiler.hook.emit(object, `${COMPILER_EVENT.UPDATE}`);

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
    if (this.cacheCompile) {
      this.cacheCompile = undefined;
    }

    for (const config of Object.values(this.target)) {
      if (!this.map.has(config.vid)) {
        console.warn(
          `Compiler: can not found object which vid is: '${config.vid}'`
        );
        continue;
      }

      const object = this.map.get(config.vid)!;

      if (!this.processors.has(config.type)) {
        console.warn(`Compiler: can not support this type: ${config.type}`);
        continue;
      }

      this.processors.get(config.type)!.dispose(object, this.engine, this);
    }

    this.map.clear();
    this.target = {} as Record<string, BasicConfig>;
    return this;
  }

  getObjectSymbol(object: BasicConfig): string | null {
    return this.symbolMap.get(object) || null;
  }
  getObjectBySymbol(vid: string): BasicConfig | null {
    return this.map.get(vid) || null;
  }

  useProcessor(
    processor: Processor<any, any, any, any>,
    callback?: (compiler: Compiler) => void
  ): this {
    if (this.processors.has(processor.type)) {
      console.warn(
        `Compiler: has already exist this processor ${processor.type}, that will be cover.`
      );
      return this;
    }

    this.processors.set(processor.type, processor);

    CONFIG_FACTORY[processor.type] = processor.config;
    CONFIG_TYPE[emunDecamelize(processor.type)] = processor.type;
    // @deprecated
    CONFIG_TYPE[emunCamelize(processor.type)] = processor.type;
    CONFIG_MODULE[processor.type] = this.MODULE;

    callback && callback(this);

    return this;
  }
}
