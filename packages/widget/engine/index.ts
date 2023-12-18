import {
  EngineSupport,
  EngineSupportOptions,
  EngineSupportParameters,
  generateConfig,
} from "@vis-three/middleware";
import { ComponentOptions } from "../component";
import { Widget } from "../widget";

export class EngineWidget extends EngineSupport {
  constructor(params: Partial<EngineSupportParameters> = {}) {
    super(params);
  }

  createWidget(component: ComponentOptions): Widget {
    return new Widget(this, component);
  }
}

export interface EngineWidgetOptions extends EngineSupportOptions {
  wdigets: ComponentOptions[];
}

export const defineEngineWidget = function <
  E extends EngineWidget = EngineWidget
>(options: EngineWidgetOptions, params: Partial<EngineSupportParameters> = {}) {
  const engine = new EngineWidget() as E;

  if (options.modules) {
    options.modules.forEach((module) => {
      engine.registModule(module);
    });
  }

  if (options.plugins) {
    options.plugins.forEach((plugin) => {
      engine.install(plugin);
    });
  }

  if (options.strategy) {
    options.strategy.forEach((strategy) => {
      engine.exec(strategy);
    });
  }

  if (options.wdigets) {
    options.wdigets.forEach((widget) => {
      engine.createWidget(widget);
    });
  }

  return engine;
};
