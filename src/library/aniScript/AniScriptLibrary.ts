import { EngineSupport } from "../../engine/EngineSupport";
import { RenderEvent } from "../../manager/RenderManager";

import * as LinearTime from "./linearTime";

export interface BasicAniScriptConfig {
  name: string;
}

export type AniScriptGenerator<C extends BasicAniScriptConfig> = (
  engine: EngineSupport,
  target: object,
  attribute: string,
  config: C
) => (event: RenderEvent) => void;

export class AniScriptLibrary {
  private static configLibrary = new Map<string, unknown>();
  private static generatorLibrary = new Map<string, AniScriptGenerator<any>>();

  static register = function <C extends BasicAniScriptConfig>(
    config: C,
    generator: AniScriptGenerator<C>
  ) {
    if (AniScriptLibrary.configLibrary.has(config.name)) {
      console.warn(
        `EventLibrary has already exist this event generator: ${config.name}, that will be cover.`
      );
    }

    AniScriptLibrary.configLibrary.set(
      config.name,
      JSON.parse(JSON.stringify(config))
    );

    AniScriptLibrary.generatorLibrary.set(config.name, generator);
  };

  static generateConfig(name: string, merge: object): BasicAniScriptConfig {
    if (!AniScriptLibrary.configLibrary.has(name)) {
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
      JSON.stringify(AniScriptLibrary.configLibrary.get(name)!)
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
    if (!AniScriptLibrary.generatorLibrary.has(config.name)) {
      console.error(
        `event library can not found generator by name: ${config.name}`
      );
      return () => {};
    }

    return AniScriptLibrary.generatorLibrary.get(config.name)!(
      engine,
      target,
      attribute,
      config
    );
  }

  static has(name: string): boolean {
    return AniScriptLibrary.configLibrary.has(name);
  }
}

AniScriptLibrary.register(LinearTime.config, LinearTime.generator);
