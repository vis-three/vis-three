import { generateConfig } from "../convenient/generateConfig";
import { parse, stringify } from "../convenient/JSONHandler";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { Compiler, CompilerTarget } from "./Compiler";
import { ProxyBroadcast, ProxyEvent } from "./ProxyBroadcast";
import { Rule } from "./Rule";
import { Translater } from "./Translater";

export abstract class DataSupport<
  D extends CompilerTarget,
  C extends Compiler
> {
  abstract MODULE: MODULETYPE;

  private data: D;
  private broadcast: ProxyBroadcast;
  private translater: Translater<C>;
  constructor(rule: Rule<C>, data: D) {
    this.translater = new Translater<C>().setRule(rule);
    this.broadcast = new ProxyBroadcast();
    this.data = this.broadcast.proxyExtends<D>(data);

    this.broadcast.addEventListener("broadcast", (event: ProxyEvent) => {
      this.translater.translate(event.notice);
    });
  }

  getData(): D {
    return this.data;
  }

  setData(data: D): this {
    this.data = data;
    return this;
  }

  proxyData(data: D): D {
    this.data = this.broadcast.proxyExtends<D>(data);
    return this.data;
  }

  existSymbol(vid: string): boolean {
    return Boolean(this.data[vid]);
  }

  addConfig(config: valueOf<D>): this {
    this.data[config.vid as keyof D] = config;
    return this;
  }

  getConfig<T extends SymbolConfig>(vid: string) {
    return this.data[vid] as T;
  }

  removeConfig(vid: string) {
    const data = this.data;
    data[vid] !== undefined && delete data[vid];
  }

  addCompiler(compiler: C): this {
    compiler.setTarget(this.data);
    compiler.compileAll();
    this.translater.apply(compiler);
    return this;
  }

  /**
   * 导出json化配置单
   * @returns json config
   */
  toJSON(compress = true): string {
    if (!compress) {
      return JSON.stringify(this.data, stringify);
    } else {
      return JSON.stringify(this.exportConfig(), stringify);
    }
  }

  /**
   * 导出配置单
   * @param compress 是否压缩配置单 default true
   * @returns config
   */
  exportConfig(compress = true): D {
    if (!compress) {
      return JSON.parse(JSON.stringify(this.data, stringify), parse);
    } else {
      const data = this.data;
      const target = {};
      const cacheConfigTemplate: { [key: string]: SymbolConfig } = {};

      const recursion = (
        config: object,
        template: object,
        result: object = {}
      ) => {
        for (const key in template) {
          if (["vid", "type"].includes(key)) {
            result[key] = config[key];
            continue;
          }

          if (typeof template[key] === "object" && template[key] !== null) {
            if (config[key] === null) {
              continue;
            }
            result[key] = {};
            recursion(config[key], template[key], result[key]);
            if (Object.keys(result[key]).length === 0) {
              delete result[key];
            }
          } else {
            if (template[key] !== config[key]) {
              result[key] = config[key];
            }
          }
        }
      };

      for (const config of Object.values(data)) {
        if (!cacheConfigTemplate[config.type]) {
          if (!CONFIGFACTORY[config.type]) {
            console.error(`can not font some config with: ${config.type}`);
            continue;
          }
          cacheConfigTemplate[config.type] = CONFIGFACTORY[config.type]();
        }
        target[config.vid] = {};
        recursion(config, cacheConfigTemplate[config.type], target[config.vid]);
      }
      return target as D;
    }
  }

  /**
   * 加载配置
   * @param configMap this module configMap
   * @returns true
   */
  load(configMap: D): this {
    const data = this.data;

    const cacheConfigTemplate: { [key: string]: SymbolConfig } = {};
    const restore = (config: object, template: object) => {
      for (const key in template) {
        if (
          typeof config[key] === "object" &&
          config[key] !== null &&
          typeof template[key] === "object" &&
          template[key] !== null
        ) {
          restore(config[key], template[key]);
        } else if (config[key] === undefined) {
          config[key] = template[key];
        }
      }
    };

    for (const key in configMap) {
      const config = configMap[key];
      if (!cacheConfigTemplate[config.type]) {
        if (!CONFIGFACTORY[config.type]) {
          console.error(`can not font some config with: ${config.type}`);
          continue;
        }
        cacheConfigTemplate[config.type] = CONFIGFACTORY[config.type]();
      }
      restore(config, cacheConfigTemplate[config.type]);
      data[key] = config;
    }

    return this;
  }

  remove(config: D): this {
    const data = this.data;
    for (const key in config) {
      data[key] !== undefined && delete data[key];
    }
    return this;
  }

  getModule(): MODULETYPE {
    return this.MODULE;
  }
}
