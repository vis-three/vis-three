import { SymbolConfig } from "@vis-three/middleware";

/**
 * @todo width height 支持不同pass渲染不同区域
 */
export interface PassConfig extends SymbolConfig {
  index: number;
}

export interface SMAAPassConfig extends PassConfig {}

export interface UnrealBloomPassConfig extends PassConfig {
  strength: number;
  threshold: number;
  radius: number;
}

export interface SelectiveBloomPassConfig extends PassConfig {
  strength: number;
  threshold: number;
  radius: number;
  /**渲染场景 vid */
  renderScene: string;
  /**渲染相机 vid */
  renderCamera: string;
  /**发光物体 vid list */
  selectedObjects: string[];
}
export interface SSAOPassConfig extends PassConfig {
  /**目标相机 vid */
  camera: string;
  /**目标场景 vid */
  scene: string;
  kernelRadius: number;
  kernelSize: number;
  noiseTexture: string;
  output: number;
  minDistance: number;
  maxDistance: number;
}

export type PassConfigAllType =
  | SMAAPassConfig
  | UnrealBloomPassConfig
  | SelectiveBloomPassConfig
  | SSAOPassConfig;

export const getPassConfig = function (): PassConfig {
  return {
    vid: "",
    name: "",
    type: "Pass",
    index: 0, // TODO: 顺序
  };
};

export const getSMAAPassConfig = function (): SMAAPassConfig {
  return Object.assign(getPassConfig(), {});
};

export const getUnrealBloomPassConfig = function (): UnrealBloomPassConfig {
  return Object.assign(getPassConfig(), {
    strength: 1.5,
    threshold: 0,
    radius: 0,
  });
};

export const getSelectiveBloomPassConfig =
  function (): SelectiveBloomPassConfig {
    return Object.assign(getPassConfig(), {
      strength: 1,
      threshold: 0,
      radius: 0,
      renderScene: "",
      renderCamera: "",
      selectedObjects: [],
    });
  };

export const getSSAOPassConfig = function (): SSAOPassConfig {
  return Object.assign(getPassConfig(), {
    camera: "",
    scene: "",
    kernelRadius: 8,
    kernelSize: 32,
    noiseTexture: "",
    output: 0,
    minDistance: 0.005,
    maxDistance: 0.1,
  });
};
