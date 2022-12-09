import { observable } from "@vis-three/core";
import { EngineSupport } from "@vis-three/core/engine/EngineSupport";
import { DeepPartial } from "@vis-three/core/utils/utils";
import { v4 as getUuid } from "uuid";
import { isObjectType, SymbolConfig } from "../common";
import { CONFIGFACTORY, CONFIGTYPE } from "../constants";
import { SceneConfig } from "../scene/SceneConfig";

export interface C extends SymbolConfig {}

export interface GenerateOptions<C> {
  strict: boolean;
  warn: boolean;
  handler?: (c: C) => C;
}

export interface GenerateConfig {
  (
    type: CONFIGTYPE | string,
    merge?: DeepPartial<ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>>,
    options?: GenerateOptions<C>
  ): ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>;
  autoInject: boolean;
  injectEngine: EngineSupport | null;
  injectScene: string | boolean;
}

/**
 * 生成相关对象配置单
 * @param type 对象类型 CONFIGTYPE
 * @param merge 合并的对象
 * @param options.strict 严格模式，只允许合并CONFIGTYPE规定的属性，自定义扩展配置下关闭
 * @param warn 是否输出warn
 * @returns config object
 */
export const generateConfig = <GenerateConfig>function (
  type: CONFIGTYPE | string,
  merge: DeepPartial<ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>> | undefined,
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

  const recursion = (config: C, merge: object) => {
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

  let initConfig = CONFIGFACTORY[type]();

  // animation
  if (
    [CONFIGTYPE.SCRIPTANIMATION, CONFIGTYPE.KEYFRAMEANIMATION].includes(
      type as CONFIGTYPE
    )
  ) {
    options.strict = false;
  }

  // 自动生成uuid
  if (initConfig.vid === "") {
    initConfig.vid = getUuid();
  }
  merge && recursion(initConfig, merge);

  if (options.handler) {
    initConfig = options.handler(initConfig);
  }

  const ob = observable(initConfig);

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
        let sceneConfig: SceneConfig | null = null;

        if (typeof generateConfig.injectScene === "boolean") {
          sceneConfig = engine.getObjectConfig(engine.scene);
        } else if (typeof generateConfig.injectScene === "string") {
          sceneConfig = engine.getConfigBySymbol(
            generateConfig.injectScene
          ) as SceneConfig;
        }

        if (!sceneConfig) {
          console.warn(
            `current engine scene can not found it config`,
            engine,
            engine.scene
          );
        } else {
          sceneConfig.children.push(initConfig.vid);
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
