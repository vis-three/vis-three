import { getObjectConfig, ObjectConfig } from "@vis-three/module-object";

export interface Object3DConfig extends ObjectConfig {}

export const getObject3DConfig = function (): Object3DConfig {
  return Object.assign(getObjectConfig(), {});
};
