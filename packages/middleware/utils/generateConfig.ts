import { DeepPartial } from "@vis-three/utils";
import { SymbolConfig } from "../module/common";
import { EngineSupport } from "../engine";
import { CONFIGFACTORY, CONFIGTYPE, isObjectType, observable } from "../module";
import { globalOption } from "../option";

export interface GenerateOptions<C extends SymbolConfig> {
  strict: boolean;
  warn: boolean;
  handler?: (c: C) => C;
}

export interface GenerateConfig {
  <C extends SymbolConfig>(
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
 * @param type 对象类型 CONFIGTYPE
 * @param merge 合并的对象
 * @param options.strict 严格模式，只允许合并CONFIGTYPE规定的属性，自定义扩展配置下关闭
 * @param options.warn 是否输出warn
 * @param options.handler 配置额外处理方法
 * @returns config object
 */
export const generateConfig = <GenerateConfig>function <C extends SymbolConfig>(
  type: string,
  merge: DeepPartial<C> | undefined,
  options: GenerateOptions<C> = {
    strict: true,
    warn: true,
  }
): C {
  if (!CONFIGFACTORY[type]) {
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

  let initConfig = CONFIGFACTORY[type]() as C;

  // animation
  if (
    [CONFIGTYPE.SCRIPTANIMATION, CONFIGTYPE.KEYFRAMEANIMATION].includes(type)
  ) {
    options.strict = false;
  }

  // 自动生成uuid
  if (initConfig.vid === "") {
    initConfig.vid = globalOption.symbol.generator();
  }
  merge && recursion(initConfig, merge);

  !options.handler && (options.handler = globalOption.proxy.expand);

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
        initConfig.type !== CONFIGTYPE.SCENE
      ) {
        let sceneConfig: SymbolConfig | null = null;

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
          (<SymbolConfig & { children: string[] }>sceneConfig).children.push(
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
