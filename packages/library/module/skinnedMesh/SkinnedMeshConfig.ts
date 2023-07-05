import {
  SolidObjectConfig,
  getSolidObjectConfig,
} from "@vis-three/module-solid-object";

export interface SkinnedMeshConfig extends SolidObjectConfig {
  skeleton: string;
  bindMode: string;
}

export const getSkinnedMeshConfig = function (): SkinnedMeshConfig {
  return Object.assign(getSolidObjectConfig(), {
    skeleton: "",
    bindMode: "attached",
  });
};
