import {
  EventGeneratorManager,
  ObjectEvent,
  SymbolConfig,
  generateConfig,
  getObserver,
} from "@vis-three/middleware";
import { Watcher } from "./Watcher";
import { Widget } from "./Widget";
import { SYMBOL_WIDGET_EVENT } from "./utils";

export const computed = function (fun: () => any) {
  return new Watcher(fun).token;
};

export const event = function (fun: (event?: ObjectEvent) => void) {
  const config = { name: Symbol(SYMBOL_WIDGET_EVENT) };
  EventGeneratorManager.register({
    config,
    generator: () => fun,
  });
  return config;
};

export class Renderer {
  widget: Widget;
  configList: SymbolConfig[] = [];

  constructor(widget: Widget) {
    this.widget = widget;
  }

  createElement(type: string, merge: any) {
    const config = generateConfig(type, merge, {
      observer: false,
      strict: false,
    });

    

    this.configList.push(config);

    return config;
  }
}
