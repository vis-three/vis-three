import { getObjectConfig, ObjectConfig } from "@vis-three/module-object";

export interface LoadModelConfig extends ObjectConfig {
  url: string;
  // 是否直接引用源资源对象，值为false时会进行深度拷贝。
  raw: boolean;
}
export const getLoadModelConfig = function (): LoadModelConfig {
  return Object.assign(getObjectConfig(), {
    url: "",
    raw: false,
  });
};
