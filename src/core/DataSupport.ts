import { generateConfig } from "../convenient/generateConfig";
import { parse, stringify, clone } from "../convenient/JSONHandler";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { Compiler, CompilerTarget } from "./Compiler";
import { IgnoreAttribute, ProxyBroadcast, ProxyEvent } from "./ProxyBroadcast";
import { Rule } from "./Rule";
import { Translater } from "./Translater";

export abstract class DataSupport<
  C extends SymbolConfig,
  O extends object,
  P extends Compiler<C, O>
> {
  abstract MODULE: MODULETYPE;

  private data: CompilerTarget<C>;
  private broadcast: ProxyBroadcast;
  private translater: Translater<C, O, P>;
  constructor(
    rule: Rule<P>,
    data: CompilerTarget<C>,
    ignore?: IgnoreAttribute
  ) {
    this.translater = new Translater<C, O, P>().setRule(rule);
    this.broadcast = new ProxyBroadcast(ignore);
    this.data = this.broadcast.proxyExtends<CompilerTarget<C>>(data);

    this.broadcast.addEventListener("broadcast", (event: ProxyEvent) => {
      this.translater.translate(event.notice);
    });
  }

  getData(): CompilerTarget<C> {
    return this.data;
  }

  setData(data: CompilerTarget<C>): this {
    this.data = data;
    return this;
  }

  proxyData(data: CompilerTarget<C>): CompilerTarget<C> {
    this.data = this.broadcast.proxyExtends<CompilerTarget<C>>(data);
    return this.data;
  }

  existSymbol(vid: string): boolean {
    return Boolean(this.data[vid]);
  }

  addConfig(config: valueOf<CompilerTarget<C>>): this {
    this.data[config.vid as keyof CompilerTarget<C>] = config;
    return this;
  }

  getConfig(vid: string) {
    return this.data[vid];
  }

  removeConfig(vid: string) {
    const data = this.data;
    data[vid] !== undefined && delete data[vid];
  }

  addCompiler(compiler: P): this {
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
  exportConfig(compress = true): CompilerTarget<C> {
    if (!compress) {
      return clone(this.data);
    } else {
      const data = this.data;
      const target = {};
      const cacheConfigTemplate: { [key: string]: SymbolConfig } = {};

      const recursion = (
        config: object,
        template: object,
        result: object = {}
      ) => {
        for (const key in config) {
          if (["vid", "type"].includes(key)) {
            result[key] = config[key];
            continue;
          }

          if (typeof config[key] === "object" && config[key] !== null) {
            // 数组处理
            if (Array.isArray(config[key])) {
              if (!config[key].length) {
                continue;
              }

              result[key] = config[key].map((elem) => {
                if (typeof elem === "object" && elem !== null) {
                  return clone(elem);
                } else {
                  return elem;
                }
              });
              continue;
            }
            // 对象处理
            result[key] = {};
            // 扩展对象
            if (!template[key]) {
              result[key] = clone(config[key]);
            } else {
              recursion(config[key], template[key], result[key]);
              if (Object.keys(result[key]).length === 0) {
                delete result[key];
              }
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
      return target as CompilerTarget<C>;
    }
  }

  /**
   * 加载配置
   * @param configMap this module configMap
   * @returns true
   */
  load(configMap: CompilerTarget<C>): this {
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

  remove(config: CompilerTarget<C>): this {
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
