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

export class AniScriptManager {
  private static configLibrary = new Map<string, unknown>();
  private static generatorLibrary = new Map<string, AniScriptGenerator<any>>();

  static register = function <C extends BasicAniScriptConfig>({
    config,
    generator,
  }: {
    config: C;
    generator: AniScriptGenerator<C>;
  }): AniScriptManager {
    if (AniScriptManager.configLibrary.has(config.name)) {
      console.warn(
        `EventLibrary has already exist this event generator: ${config.name}, that will be cover.`
      );

      return AniScriptManager;
    }

    AniScriptManager.configLibrary.set(
      config.name,
      JSON.parse(JSON.stringify(config))
    );

    AniScriptManager.generatorLibrary.set(config.name, generator);
    return AniScriptManager;
  };

  static generateConfig(name: string, merge: object): BasicAniScriptConfig {
    if (!AniScriptManager.configLibrary.has(name)) {
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
      JSON.stringify(AniScriptManager.configLibrary.get(name)!)
    );

    recursion(template, merge);

    return template;
  }

  static generateScript(
    engine: EngineSupport,
    target: object,
    attribute: string,
    config: BasicAniScriptConfig
  ): (event: RenderEvent) => void {
    if (!AniScriptManager.generatorLibrary.has(config.name)) {
      console.error(
        `event library can not found generator by name: ${config.name}`
      );
      return () => {};
    }

    return AniScriptManager.generatorLibrary.get(config.name)!(
      engine,
      target,
      attribute,
      config
    );
  }

  static has(name: string): boolean {
    return AniScriptManager.configLibrary.has(name);
  }
}

/**
 * @deprecated use AniScriptManager
 */
export class AniScriptGeneratorManager extends AniScriptManager {}
