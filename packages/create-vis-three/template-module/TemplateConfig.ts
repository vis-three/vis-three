import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface TemplateConfig extends SymbolConfig {}

export const getTemplateConfig = function (): TemplateConfig {
  return Object.assign(getSymbolConfig(), {});
};
