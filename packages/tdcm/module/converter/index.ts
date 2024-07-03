import { Compiler } from "../compiler";
import { Translater } from "../translater";
import { CtnNotice, Container } from "../container";
import { BasicConfig } from "../common";
import { JSONHandler } from "../../utils";
import { CONFIGFACTORY } from "../space";
import { Ruler } from "../ruler";

export class Converter<C extends BasicConfig, P extends Compiler = Compiler> {
  MODULE: string = "";

  container = new Container<C>();
  // translater: Translater<P>;

  ruler: Ruler;

  constructor(ruler: Ruler, data: Array<C> = []) {
    // this.translater = new Translater<P>().setRule(rule);

    this.ruler = ruler;
    this.container.subscribe((notice: CtnNotice) => {
      this.ruler.execute(notice);
    });

    for (const config of data) {
      this.addConfig(config);
    }
  }

  getData(): Record<string, C> {
    return this.container.space;
  }

  existSymbol(vid: string): boolean {
    return Boolean(this.container.space[vid]);
  }

  addConfig(config: C): this {
    this.container.space[config.vid] = config;
    return this;
  }

  getConfig(vid: string) {
    return this.container.space[vid];
  }

  removeConfig(vid: string) {
    const data = this.container.space;
    data[vid] !== undefined && delete data[vid];
  }

  addCompiler(compiler: P): this {
    compiler.setTarget(this.container.space);
    compiler.compileAll();
    // this.translater.apply(compiler);

    this.ruler.link(compiler);
    return this;
  }

  /**
   * 导出json化配置单
   * @returns json config
   */
  toJSON(compress = true): string {
    if (!compress) {
      return JSON.stringify(
        Object.values(this.container.space),
        JSONHandler.stringify
      );
    } else {
      return JSON.stringify(this.exportConfig(), JSONHandler.stringify);
    }
  }

  /**
   * 导出配置单
   * @param compress 是否压缩配置单 default true
   * @returns config
   */
  exportConfig(compress = true): Array<C> {
    if (!compress) {
      return Object.values(JSONHandler.clone(this.container.space));
    } else {
      const data = this.container.space;
      const target: Array<C> = [];
      const cacheConfigTemplate: { [key: string]: BasicConfig } = {};

      const recursion = (
        config: BasicConfig,
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
                  return JSONHandler.clone(elem);
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
              result[key] = JSONHandler.clone(config[key]);
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
        const temp = {} as C;
        recursion(config, cacheConfigTemplate[config.type], temp);
        target.push(temp);
      }
      return target;
    }
  }

  /**
   * 加载配置
   * @param configs this module configs
   * @returns true
   */
  load(configs: Array<C>): this {
    const data = this.container.space;

    const cacheConfigTemplate: { [key: string]: BasicConfig } = {};
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

    for (const config of configs) {
      if (!cacheConfigTemplate[config.type]) {
        if (!CONFIGFACTORY[config.type]) {
          console.error(`can not font some config with: ${config.type}`);
          continue;
        }
        cacheConfigTemplate[config.type] = CONFIGFACTORY[config.type]();
      }
      restore(config, cacheConfigTemplate[config.type]);
      data[config.vid] = config;
    }

    return this;
  }

  remove(configs: Array<C>): this {
    const data = this.container.space;
    for (const config of configs) {
      data[config.vid] !== undefined && delete data[config.vid];
    }
    return this;
  }
}

export interface DataSupportSimplifier<
  C extends BasicConfig,
  P extends Compiler = Compiler
> {
  new (data: Array<C>): Converter<C, P>;
}

export const DataSupportFactory = function <
  C extends BasicConfig,
  P extends Compiler = Compiler
>(type: string, ruler: Ruler): DataSupportSimplifier<C, P> {
  return class extends Converter<C, P> {
    MODULE = type;

    constructor(data: Array<C> = []) {
      super(ruler, data);
    }
  };
};
