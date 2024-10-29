import { RenderEvent } from "@vis-three/plugin-render-manager";
import { EngineSupport } from "@vis-three/tdcm";

export interface BasicAniScriptConfig {
  name: string;
}

export type AniScriptGenerator<C extends BasicAniScriptConfig> = (
  engine: EngineSupport,
  target: object,
  attribute: string,
  config: C
) => (event: RenderEvent) => void;

export class AniScriptGeneratorManager {
  private static configLibrary = new Map<string, unknown>();
  private static generatorLibrary = new Map<string, AniScriptGenerator<any>>();

  /**
   * 注册脚本配置动画
   * @param config 配置模板
   * @param generator 脚本动画生成器函数
   * @returns this
   */
  static register = function <C extends BasicAniScriptConfig>({
    config,
    generator,
  }: {
    config: C;
    generator: AniScriptGenerator<C>;
  }): AniScriptGeneratorManager {
    if (AniScriptGeneratorManager.configLibrary.has(config.name)) {
      console.warn(
        `EventLibrary has already exist this event generator: ${config.name}, that will be cover.`
      );

      return AniScriptGeneratorManager;
    }

    AniScriptGeneratorManager.configLibrary.set(
      config.name,
      JSON.parse(JSON.stringify(config))
    );

    AniScriptGeneratorManager.generatorLibrary.set(config.name, generator);
    return AniScriptGeneratorManager;
  };

  /**
   * 生成脚本配置
   * @param name 动画名
   * @param merge 初始参数
   * @returns BasicAniScriptConfig
   */
  static generateConfig(name: string, merge: object): BasicAniScriptConfig {
    if (!AniScriptGeneratorManager.configLibrary.has(name)) {
      console.warn(`event library can not found config by name: ${name}`);
      return {
        name: "",
      };
    }

    const recursion = (config: BasicAniScriptConfig, merge: object) => {
      for (const key in merge) {
        if (config[key] === undefined) {
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

    const template = JSON.parse(
      JSON.stringify(AniScriptGeneratorManager.configLibrary.get(name)!)
    );

    recursion(template, merge);

    return template;
  }

  /**
   * 生成脚本
   * @param engine 当前使用的engine
   * @param target 生成脚本的目标对象
   * @param attribute 生成脚本目标对象的动画属性
   * @param config 生成的配置单
   * @returns fun
   */
  static generateScript(
    engine: EngineSupport,
    target: object,
    attribute: string,
    config: BasicAniScriptConfig
  ): (event: RenderEvent) => void {
    if (!AniScriptGeneratorManager.generatorLibrary.has(config.name)) {
      console.error(
        `event library can not found generator by name: ${config.name}`
      );
      return () => {};
    }

    return AniScriptGeneratorManager.generatorLibrary.get(config.name)!(
      engine,
      target,
      attribute,
      config
    );
  }

  /**
   * 管理器中是否已经注册了脚本
   * @param name 脚本名
   * @returns boolean
   */
  static has(name: string): boolean {
    return AniScriptGeneratorManager.configLibrary.has(name);
  }
}
