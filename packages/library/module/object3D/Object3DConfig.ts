import { getObjectConfig, ObjectConfig } from "@vis-three/module-object";

export interface Object3DConfig extends ObjectConfig {}

export interface LoadObject3DConfig extends ObjectConfig {
  url: string;
  // 是否直接引用源资源对象，值为false时会进行深度拷贝。
  raw: boolean;
}

export const getObject3DConfig = function (): Object3DConfig {
  return Object.assign(getObjectConfig(), {});
};

export const getLoadObject3DConfig = function (): LoadObject3DConfig {
  return Object.assign(getObjectConfig(), {
    url: "",
    raw: true,
  });
};
