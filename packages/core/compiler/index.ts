import { SymbolConfig } from "../../middleware";
import { ProxyNotice } from "../DataContainer";
import { EngineSupport } from "../engine/EngineSupport";
import { Processor } from "../Processor";
import { syncObject } from "../utils/utils";

export type CompilerTarget<C extends SymbolConfig> = Record<string, C>;

export type BasicCompiler = Compiler<SymbolConfig, object>;

export type CompileNotice = Omit<ProxyNotice, "path"> & { path: string[] };

export abstract class Compiler<C extends SymbolConfig, O extends object> {
  static processors = new Map<string, Processor<SymbolConfig, object>>();

  static processor = function <C extends SymbolConfig, T extends object>(
    processor: Processor<C, T>
  ) {
    Compiler.processors.set(
      processor.configType,
      <Processor<SymbolConfig, object>>(<unknown>processor)
    );
  };

  abstract MODULE: string;

  target: CompilerTarget<C> = {} as CompilerTarget<C>;
  map: Map<SymbolConfig["vid"], O> = new Map();
  weakMap: WeakMap<O, SymbolConfig["vid"]> = new WeakMap();
  engine!: EngineSupport;

  private cacheCompile?: {
    target: O;
    config: C;
    processor: Processor<SymbolConfig, object>;
    vid: string;
  };

  getMap(): Map<SymbolConfig["vid"], O> {
    return this.map;
  }

  useEngine(engine: EngineSupport): this {
    this.engine = engine;
    return this;
  }

  setTarget(target: CompilerTarget<C>): this {
    this.target = target;
    return this;
  }

  add(config: C): O | null {
    if (!Compiler.processors.has(config.type)) {
      console.warn(
        `${this.MODULE} compiler can not support this type: ${config.type}`
      );
      return null;
    }

    const processor = Compiler.processors.get(
      config.type
    )! as unknown as Processor<C, O>;

    const object = processor.create(config, this.engine);
    this.map.set(config.vid, object);
    this.weakMap.set(object, config.vid);

    this.engine.compilerManager.emit(config.vid, {});

    return object;
  }

  remove(config: C): this {
    const vid = config.vid;

    if (!this.map.has(vid)) {
      console.warn(
        `${this.MODULE} compiler can not found this vid object: ${vid}.`
      );
      return this;
    }

    if (!Compiler.processors.has(config.type)) {
      console.warn(
        `${this.MODULE} compiler can not support this type: ${config.type}`
      );
      return this;
    }

    const object = this.map.get(vid)!;
    Compiler.processors.get(config.type)!.dispose(object);
    this.map.delete(vid);
    this.weakMap.delete(object);
    return this;
  }

  cover(config: C): this {
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
      syncObject(config as SymbolConfig, config, {
        vid: true,
        type: true,
      });
    });

    return this;
  }

  compile(vid: SymbolConfig["vid"], notice: CompileNotice): this {
    const cacheCompile = this.cacheCompile;

    let object: O;
    let config: C;
    let processor: Processor<SymbolConfig, object>;

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

      if (!Compiler.processors.has(config.type)) {
        console.warn(`PassCompiler can not support this type: ${config.type}`);
        return this;
      }

      processor = Compiler.processors.get(config.type)!;

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

      if (!Compiler.processors.has(config.type)) {
        console.warn(
          `${this.MODULE}  can not support this type: ${config.type}`
        );
        continue;
      }

      Compiler.processors.get(config.type)!.dispose(object);
    }

    this.map.clear();
    this.target = {} as CompilerTarget<C>;
    return this;
  }

  getObjectSymbol(object: O): string | null {
    return this.weakMap.get(object) || null;
  }
  getObjectBySymbol(vid: string): O | null {
    return this.map.get(vid) || null;
  }
}
