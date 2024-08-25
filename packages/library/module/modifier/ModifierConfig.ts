import { getBasicConfig, BasicConfig } from "@vis-three/tdcm";

export interface ModifierConfig extends BasicConfig {
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
  return Object.assign(getBasicConfig(), {
    name: "",
    visible: true,
    source: "",
    index: 0,
  });
};

export const getBooleanModifierConfig = function (): BooleanModifierConfig {
  return Object.assign(getModifierConfig(), {
    target: "",
    mode: "subtract",
  });
};
