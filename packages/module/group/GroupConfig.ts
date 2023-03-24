import { getObjectConfig, ObjectConfig } from "@vis-three/module-object";

export interface GroupConfig extends ObjectConfig {
  children: string[];
}

export const getGroupConfig = function (): GroupConfig {
  return Object.assign(getObjectConfig(), {
    children: [],
  });
};
