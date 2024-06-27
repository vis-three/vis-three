import { syncObject } from "@vis-three/utils";
import { BasicConfig } from "../common";
import { EngineSupport } from "../../engine";
import { installProcessor } from "../space";
import { ProxyNotice } from "../container";
import { Processor } from "../processor";
import { Bus } from "../../utils";

export type CompileNotice = Omit<ProxyNotice, "path"> & { path: string[] };

export enum COMPILER_EVENT {
  ADD = "compiler.add",
  REMOVE = "compiler.remove",
  COMPILE = "compiler.compile",
  UPDATE = "compiler.update",
}

export class Compiler {
  MODULE: string = "";

  processors = new Map<
    string,
    Processor<BasicConfig, object, EngineSupport, any>
  >();
  target: Record<string, BasicConfig> = {};
  map: Map<BasicConfig["vid"], BasicConfig> = new Map();
  weakMap: WeakMap<BasicConfig, BasicConfig["vid"]> = new WeakMap();
  engine!: EngineSupport;

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
      console.warn(
        `${this.MODULE} compiler can not support this type: ${config.type}`
      );
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
    this.weakMap.set(object, config.vid);

    Bus.compilerEvent.create(object);

    Bus.compilerEvent.emit(object, COMPILER_EVENT.ADD);

    return object;
  }

  remove(config: BasicConfig): this {
    const vid = config.vid;

    if (!this.map.has(vid)) {
      console.warn(
        `${this.MODULE} compiler can not found this vid object: ${vid}.`
      );
      return this;
    }

    if (!this.processors.has(config.type)) {
      console.warn(
        `${this.MODULE} compiler can not support this type: ${config.type}`
      );
      return this;
    }

    const object = this.map.get(vid)!;
    this.processors.get(config.type)!.dispose(object, this.engine, this);
    this.map.delete(vid);
    this.weakMap.delete(object);

    Bus.compilerEvent.emit(object, COMPILER_EVENT.REMOVE);

    Bus.compilerEvent.dispose(object);

    if (this.cacheCompile && this.cacheCompile.vid === vid) {
      this.cacheCompile = undefined;
    }

    return this;
  }

  cover(config: BasicConfig): this {
    const vid = config.vid;

    if (!this.map.has(vid)) {
      console.warn(
        `${this.MODULE} compiler can not found this vid object: ${vid}.`
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

  compile(vid: BasicConfig["vid"], notice: CompileNotice): this {
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
        console.warn(
          `${this.MODULE} compiler set function: can not found object which vid is: '${vid}'`
        );
        return this;
      }

      if (!this.target[vid]) {
        console.warn(
          `${this.MODULE} compiler set function: can not found config which vid is: '${vid}'`
        );
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

    const router = notice.path.join(".");

    Bus.compilerEvent.emit(
      object,
      `${COMPILER_EVENT.COMPILE}:${router ? router + "." : router}${notice.key}`
    );

    Bus.compilerEvent.emit(object, `${COMPILER_EVENT.UPDATE}`);

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
          `${this.MODULE} compiler set function: can not found object which vid is: '${config.vid}'`
        );
        continue;
      }

      const object = this.map.get(config.vid)!;

      if (!this.processors.has(config.type)) {
        console.warn(
          `${this.MODULE}  can not support this type: ${config.type}`
        );
        continue;
      }

      this.processors.get(config.type)!.dispose(object, this.engine, this);
    }

    this.map.clear();
    this.target = {} as Record<string, BasicConfig>;
    return this;
  }

  reigstProcessor(
    processor: Processor<any, any, any, any>,
    fun: (compiler: Compiler) => void
  ): this {
    if (this.processors.has(processor.type)) {
      console.warn(
        `${this.MODULE} compiler has already exist this processor ${processor.type}, that will be cover.`
      );
      return this;
    }
    this.processors.set(processor.type, processor);
    installProcessor(processor, this.MODULE);
    fun(this);

    return this;
  }

  getObjectSymbol(object: BasicConfig): string | null {
    return this.weakMap.get(object) || null;
  }
  getObjectBySymbol(vid: string): BasicConfig | null {
    return this.map.get(vid) || null;
  }
}

export interface CompilerSimplifier {
  new (): Compiler;
}

export const CompilerFactory = function (
  type: string,
  compiler: typeof Compiler,
  processors: Processor<any, any, any, any>[]
): CompilerSimplifier {
  return class extends compiler {
    MODULE = type;

    constructor() {
      super();

      for (const processor of processors) {
        this.processors.set(processor.type, processor);
      }
    }
  };
};
