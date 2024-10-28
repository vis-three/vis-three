import { ObjectEvent } from "@vis-three/plugin-event-manager";
import { EngineSupport } from "@vis-three/tdcm";
import { DeepPartial } from "@vis-three/utils";

export interface BasicEventConfig {
  name: string | Symbol;
}

export type EventGenerator<
  C extends BasicEventConfig = BasicEventConfig,
  E extends EngineSupport = EngineSupport
> = (engine: E, config: C) => (event?: ObjectEvent) => void;

export class EventGeneratorManager {
  private static engine: EngineSupport;
  private static configLibrary = new Map<string | Symbol, unknown>();
  private static generatorLibrary = new Map<
    string | Symbol,
    EventGenerator<any>
  >();

  /**
   * 注册配置
   * @param config 配置模板
   * @param generator 生成器
   * @returns this
   */
  static register = function <C extends BasicEventConfig>({
    config,
    generator,
  }: {
    config: C;
    generator: EventGenerator<C>;
  }): EventGeneratorManager {
    if (EventGeneratorManager.configLibrary.has(config.name)) {
      console.warn(
        `EventGeneratorManager has already exist this event generator: ${config.name}, that will be cover.`
      );
      return EventGeneratorManager;
    }

    EventGeneratorManager.configLibrary.set(
      config.name,
      JSON.parse(JSON.stringify(config))
    );

    EventGeneratorManager.generatorLibrary.set(config.name, generator);
    return EventGeneratorManager;
  };

  /**
   * 生成配置
   * @param name 配置名
   * @param merge 配置的预设
   * @returns BasicEventConfig
   */
  static generateConfig<C extends BasicEventConfig = BasicEventConfig>(
    name: string,
    merge: DeepPartial<C>
  ): C | null {
    if (!EventGeneratorManager.configLibrary.has(name)) {
      console.warn(`event library can not found config by name: ${name}`);
      return null;
    }

    const recursion = (config: BasicEventConfig, merge: object) => {
      for (const key in merge) {
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
      JSON.stringify(EventGeneratorManager.configLibrary.get(name)!)
    );

    recursion(template, merge);

    return template as C;
  }

  static generateEvent(
    config: BasicEventConfig,
    engine: EngineSupport
  ): (event?: ObjectEvent) => void {
    if (!EventGeneratorManager.generatorLibrary.has(config.name)) {
      console.error(
        `event library can not found generator by name: ${config.name}`
      );
      return () => {};
    }

    return EventGeneratorManager.generatorLibrary.get(config.name)!(
      engine,
      config
    );
  }

  /**
   * 判断管理器中是否注册该事件
   * @param name 事件名
   * @returns boolean
   */
  static has(name: string): boolean {
    return EventGeneratorManager.configLibrary.has(name);
  }

  static useEngine(engine: EngineSupport) {
    EventGeneratorManager.engine = engine;
  }

  static createEvent<C extends BasicEventConfig = BasicEventConfig>(
    name: string,
    merge: DeepPartial<C>,
    engine?: EngineSupport
  ): ((event?: ObjectEvent | undefined) => void) | null {
    if (!EventGeneratorManager.engine && !engine) {
      console.error(
        `EventGenerator Manager createEvent must provide an engine, you can use 'useEngine' to set it.`
      );

      return null;
    }

    const config = EventGeneratorManager.generateConfig<C>(name, merge);

    if (!config) {
      return null;
    }

    return EventGeneratorManager.generateEvent(
      config,
      engine || EventGeneratorManager.engine
    );
  }
}
