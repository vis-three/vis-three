import { getObjectConfig, ObjectConfig } from "@vis-three/module-object";

export interface BoneConfig extends ObjectConfig {
  children: string[];
}

export const getBoneConfig = function (): BoneConfig {
  return Object.assign(getObjectConfig(), {
    children: [],
  });
};
