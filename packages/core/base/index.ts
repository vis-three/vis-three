import { EventDispatcher } from "../eventDispatcher";
import { PluginOptions } from "../plugin";
import { StrategyOptions } from "../strategy";

export class Base extends EventDispatcher {
  pluginTables = new Map<string, PluginOptions<Base>>();
  strategyTables = new Map<string, StrategyOptions<Base>>();

  /**
   * 安装插件
   * @param plugin 插件选项对象
   * @returns this
   */
  install<E extends Base>(plugin: PluginOptions<E>): E {
    if (this.pluginTables.has(plugin.name)) {
      console.warn(`This plugin already exists`, plugin.name);
      return this as unknown as E;
    }

    const validateDep = (name: string) => {
      if (!this.pluginTables.has(name)) {
        console.error(
          `${plugin.name} must install this plugin before: ${name}`
        );
        return false;
      }
      return true;
    };

    // 检测deps
    if (plugin.deps) {
      if (Array.isArray(plugin.deps)) {
        for (const name of plugin.deps) {
          if (!validateDep(name)) {
            this as unknown as E;
          }
        }
      } else {
        if (!validateDep(plugin.deps)) {
          this as unknown as E;
        }
      }
    }

    plugin.install(this as unknown as E);

    this.pluginTables.set(plugin.name, plugin as PluginOptions<Base>);
    return this as unknown as E;
  }

  /**
   * 卸载插件
   * @param name 插件名称
   * @returns this
   */
  uninstall(name: string): this {
    if (!this.pluginTables.has(name)) {
      return this;
    }

    // 检测策略依赖回滚策略
    for (const strategy of this.strategyTables.values()) {
      if (strategy.condition.includes(name)) {
        console.info(
          `engine auto rollback strategy: ${strategy.name} before uninstall plugin: ${name}.`
        );
        this.rollback(strategy.name);
      }
    }

    // 检测插件依赖卸载插件
    for (const plugin of this.pluginTables.values()) {
      if (plugin.deps) {
        if (
          (Array.isArray(plugin.deps) && plugin.deps.includes(name)) ||
          plugin.deps === name
        ) {
          console.info(
            `engine auto uninstall plugin: ${plugin.name} before uninstall plugin: ${name}.`
          );
          this.uninstall(plugin.name);
        }
      }
    }

    const plugin = this.pluginTables.get(name)!;

    plugin.dispose(this);

    this.pluginTables.delete(name);
    return this;
  }

  /**
   * 执行策略
   * @param strategy 策略选项对象
   * @returns this
   */
  exec<E extends Base>(strategy: StrategyOptions<E>): E {
    const tables = this.strategyTables;
    if (tables.has(strategy.name)) {
      console.warn(`This strategy already exists`, strategy.name);
      return this as unknown as E;
    }
    // 检测条件
    const plugins = this.pluginTables;
    for (const plugin of strategy.condition) {
      if (!plugins.has(plugin)) {
        console.warn(
          `${strategy.name} does not meet the conditions for execution: ${plugin}`
        );
        return this as unknown as E;
      }
    }

    strategy.exec(this as unknown as E);

    tables.set(strategy.name, strategy as StrategyOptions<Base>);

    return this as unknown as E;
  }

  /**
   * 回滚策略
   * @param name 策略名称
   * @returns this
   */
  rollback(name: string): this {
    const tables = this.strategyTables;
    if (!tables.has(name)) {
      return this;
    }

    const strategy = tables.get(name)!;

    strategy.rollback(this);

    tables.delete(name);
    return this;
  }
}
