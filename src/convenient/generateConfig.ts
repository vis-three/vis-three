import { v4 as getUuid } from "uuid";
import { EngineSupport } from "../engine/EngineSupport";
import { Shader } from "../library/shader/shader";
import { ShaderLibrary } from "../library/shader/ShaderLibrary";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { CONFIGMODULE } from "../middleware/constants/CONFIGMODULE";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { OBJECTMODULE } from "../middleware/constants/MODULETYPE";
import { ShaderMaterialConfig } from "../middleware/material/MaterialConfig";
import { SceneConfig } from "../middleware/scene/SceneConfig";

export interface GenerateConfig {
  (
    type: CONFIGTYPE,
    merge?: Partial<ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>> | undefined,
    strict?: boolean,
    warn?: boolean
  ): ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>;
  autoInject: boolean;
  injectEngine: EngineSupport | null;
  injectScene: string | boolean;
}

export interface C extends SymbolConfig {}

/**
 * 生成相关对象配置单
 * @param type 对象类型 CONFIGTYPE
 * @param merge 合并的对象
 * @param strict 严格模式，只允许合并CONFIGTYPE规定的属性，自定义扩展配置下关闭
 * @param warn 是否输出warn
 * @returns config object
 */
export const generateConfig = <GenerateConfig>(
  function (type: CONFIGTYPE, merge?, strict = true, warn = true): C {
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
          !strict && (config[key] = merge[key]); // 允许额外配置
          strict &&
            warn &&
            console.warn(`'${type}' config can not set key: ${key}`);
          continue;
        }
        if (
          typeof merge[key] === "object" &&
          merge[key] !== null &&
          !Array.isArray(merge[key])
        ) {
          recursion(config[key], merge[key]);
        } else {
          config[key] = merge[key];
        }
      }
    };

    const initConfig = CONFIGFACTORY[type]();

    // shader
    if (
      [
        CONFIGTYPE.SHADERMATERIAL,
        // CONFIGTYPE.RAWSHADERMATERIAL
      ].includes(type as CONFIGTYPE)
    ) {
      const shaderConfig = ShaderLibrary.generateConfig(
        (merge as ShaderMaterialConfig)?.shader || "defaultShader"
      );

      const cacheStrict = strict;
      strict = false;
      recursion(initConfig, shaderConfig);
      strict = cacheStrict;
    }

    // animation
    if (
      [CONFIGTYPE.SCRIPTANIMATION, CONFIGTYPE.KEYFRAMEANIMATION].includes(
        type as CONFIGTYPE
      )
    ) {
      strict = false;
    }

    // 自动生成uuid
    if (initConfig.vid === "") {
      initConfig.vid = getUuid();
    }
    merge && recursion(initConfig, merge);

    // 自动注入配置
    if (generateConfig.autoInject && generateConfig.injectEngine) {
      const engine = generateConfig.injectEngine;

      engine.applyConfig(initConfig);

      // 自动注入场景
      if (generateConfig.injectScene) {
        if (
          CONFIGMODULE[initConfig.type] in OBJECTMODULE &&
          initConfig.type !== CONFIGTYPE.SCENE
        ) {
          let sceneConfig: SceneConfig | null = null;

          if (typeof generateConfig.injectScene === "boolean") {
            sceneConfig = engine.getObjectConfig(engine.scene);
          } else if (typeof generateConfig.injectScene === "string") {
            sceneConfig = engine.getConfigBySymbol<SceneConfig>(
              generateConfig.injectScene
            );
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
    }

    return initConfig;
  }
);

generateConfig.autoInject = true;
generateConfig.injectScene = false;
generateConfig.injectEngine = null;
