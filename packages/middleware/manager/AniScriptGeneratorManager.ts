import { RenderEvent } from "@vis-three/render-manager-plugin";
import { EngineSupport } from "../engine";

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

  static register = function <C extends BasicAniScriptConfig>(params: {
    config: C;
    generator: AniScriptGenerator<C>;
  }) {
    const config = params.config;
    const generator = params.generator;
    if (AniScriptGeneratorManager.configLibrary.has(config.name)) {
      console.warn(
        `EventLibrary has already exist this event generator: ${config.name}, that will be cover.`
      );
    }

    AniScriptGeneratorManager.configLibrary.set(
      config.name,
      JSON.parse(JSON.stringify(config))
    );

    AniScriptGeneratorManager.generatorLibrary.set(config.name, generator);
  };

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

  static has(name: string): boolean {
    return AniScriptGeneratorManager.configLibrary.has(name);
  }
}
