import { getSymbolConfig, SymbolConfig } from "@vis-three/middleware";

export interface ModifierConfig extends SymbolConfig {
  name: string;
  visible: boolean;
  source: string;
}

export interface BooleanModifierConfig extends ModifierConfig {
  target: string;
  mode: string;
}

export type ModifierAllType = BooleanModifierConfig;

export const getModifierConfig = function (): ModifierConfig {
  return Object.assign(getSymbolConfig(), {
    name: "",
    visible: true,
    source: "",
  });
};

export const getBooleanModifierConfig = function (): BooleanModifierConfig {
  return Object.assign(getModifierConfig(), {
    target: "",
    mode: "subtract",
  });
};
