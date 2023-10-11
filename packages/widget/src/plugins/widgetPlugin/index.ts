import { Plugin } from "@vis-three/core";
import { EngineSupport } from "@vis-three/middleware";

export interface WidgetEngine extends EngineSupport {}

export const WIDGET_PLUGIN = "WidgetPlugin";

export const WidgetPlugin: Plugin<WidgetEngine> = function () {
  return {
    name: WIDGET_PLUGIN,
    install() {},
    dispose() {},
  };
};
