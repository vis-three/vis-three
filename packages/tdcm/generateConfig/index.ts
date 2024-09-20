import { DeepPartial } from "@vis-three/utils";
import {
  BasicConfig,
  CONFIG_FACTORY,
  CONFIG_TYPE,
  isObjectType,
  observable,
} from "../module";
import { EngineSupport } from "../engine";
import { globalOption } from "../option";
import { JSONHandler } from "../utils";

/**
 * 配置单生成的附加选项
 */
export interface GenerateOptions<C extends BasicConfig> {
  /**是否生成响应式配置，默认为true */
  observer?: boolean;
  /**严格模式，只允许合并CONFIG_TYPE规定的属性，自定义扩展配置下关闭 */
  strict?: boolean;
  /**控制台是否输出warn */
  warn?: boolean;
  /**
   * 配置额外处理方法，不过建议使用 全局选项`defineOption`,除非特殊情况再使用此方法。
   */
  handler?: (c: C) => C;
}

export interface GenerateConfig {
  <C extends BasicConfig>(
    type: string,
    merge?: DeepPartial<C>,
    options?: GenerateOptions<C>
  ): C;
  autoInject: boolean;
  injectEngine: EngineSupport | null;
  injectScene: string | boolean;
}

/**
 * 生成相关对象配置单
 * @param type 对象类型 CONFIG_TYPE
 * @param merge 合并的对象
 * @param options 函数的拓展选项
 * @returns config object
 */
export const generateConfig = <GenerateConfig>function <C extends BasicConfig>(
  type: string,
  merge: DeepPartial<C> | undefined,
  options: GenerateOptions<C> = {
    observer: true,
    strict: true,
    warn: true,
  }
): C {
  if (options.observer === undefined) {
    options.observer = true;
  }

  if (options.strict === undefined) {
    options.strict = true;
  }

  if (options.warn === undefined) {
    options.warn = true;
  }

  if (options.handler === undefined) {
    options.handler = globalOption.proxy.expand;
  }

  if (!CONFIG_FACTORY[type]) {
    console.error(`type: ${type} can not be found in configList.`);
    return {
      vid: "",
      type,
    } as C;
  }

  const recursion = (config: object, merge: object) => {
    for (const key in merge) {
      if (config[key] === undefined) {
        !options.strict && (config[key] = merge[key]); // 允许额外配置
        options.strict &&
          options.warn &&
          console.warn(`'${type}' config can not set key: ${key}`);
        continue;
      }
      if (
        typeof merge[key] === "object" &&
        merge[key] !== null &&
        !Array.isArray(merge[key])
      ) {
        if (config[key] === null) {
          config[key] = { ...merge[key] };
        }
        recursion(config[key], merge[key]);
      } else {
        config[key] = merge[key];
      }
    }
  };

  let initConfig = CONFIG_FACTORY[type]() as C;

  // 自动生成uuid
  if (initConfig.vid === "") {
    initConfig.vid = globalOption.symbol.generator();
  }

  if (merge) {
    if (typeof merge.type !== undefined) {
      merge = JSONHandler.clone(merge);
      delete merge.type;
    }

    recursion(initConfig, merge);
  }

  if (options.observer === false) {
    return initConfig;
  }

  if (options.handler && globalOption.proxy.timing === "before") {
    initConfig = options.handler(initConfig);
  }

  let ob = observable(initConfig);

  if (options.handler && globalOption.proxy.timing === "after") {
    ob = options.handler(ob);
  }

  // 自动注入配置
  if (generateConfig.autoInject && generateConfig.injectEngine) {
    const engine = generateConfig.injectEngine;

    engine.applyConfig(ob);

    // 自动注入场景
    if (generateConfig.injectScene) {
      if (
        isObjectType(initConfig.type) &&
        initConfig.type !== CONFIG_TYPE.SCENE
      ) {
        let sceneConfig: BasicConfig | null = null;

        if (typeof generateConfig.injectScene === "boolean") {
          sceneConfig = engine.getObjectConfig(engine.scene);
        } else if (typeof generateConfig.injectScene === "string") {
          sceneConfig = engine.getConfigBySymbol(generateConfig.injectScene);
        }

        if (!sceneConfig) {
          console.warn(
            `current engine scene can not found it config`,
            engine,
            engine.scene
          );
        } else {
          (<BasicConfig & { children: string[] }>sceneConfig).children.push(
            initConfig.vid
          );
        }
      }
    }

    // return a reactive config object

    return ob as C;
  }

  return ob;
};

generateConfig.autoInject = true;
generateConfig.injectScene = false;
generateConfig.injectEngine = null;

export const toSymbol = function <C extends BasicConfig = BasicConfig>(
  config: C
) {
  return config.vid;
};
