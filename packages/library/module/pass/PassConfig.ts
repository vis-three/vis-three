import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

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

export interface SSRPassConfig extends PassConfig {
  renderer: string;
  scene: string;
  camera: string;
  width: number;
  height: number;
  ground: boolean;
  groudOption: {
    geometry: string;
    color: string;
    textureWidth: number;
    textureHeight: number;

    clipBias: number;
    multisample: number;
  };
  selects: string[];

  opacity: number;
  output: number;
  maxDistance: number;
  thickness: number;
  bouncing: boolean;
  distanceAttenuation: boolean;
  fresnel: boolean;
  infiniteThick: boolean;
}

export interface FilmPassConfig extends PassConfig {
  grayscale: boolean;
  noiseIntensity: number;
  scanlinesIntensity: number;
  scanlinesCount: number;
}

export interface LUTPassConfig extends PassConfig {
  lut: string;
  intensity: number;
  use2D: boolean;
}

export type PassConfigAllType =
  | SMAAPassConfig
  | UnrealBloomPassConfig
  | SelectiveBloomPassConfig
  | SSAOPassConfig
  | SSRPassConfig
  | FilmPassConfig;

export const getPassConfig = function (): PassConfig {
  return Object.assign(getSymbolConfig(), {
    vid: "",
    name: "",
    type: "Pass",
    index: 0, // TODO: 顺序
  });
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

export const getSSRPassConfig = function (): SSRPassConfig {
  return Object.assign(getPassConfig(), {
    renderer: "",
    scene: "",
    camera: "",
    width: 0,
    height: 0,
    ground: true,
    groudOption: {
      geometry: "",
      color: "rgb(127, 127, 127)",
      textureWidth: 0,
      textureHeight: 0,

      clipBias: 0,
      multisample: 4,
    },
    selects: [],

    opacity: 0.5,
    output: 0,
    maxDistance: 180,
    thickness: 0.018,
    bouncing: true,
    distanceAttenuation: true,
    fresnel: true,
    infiniteThick: true,
  });
};

export const getFilmPassConfig = function (): FilmPassConfig {
  return Object.assign(getPassConfig(), {
    grayscale: false,
    noiseIntensity: 0.5,
    scanlinesIntensity: 0.05,
    scanlinesCount: 4096,
  });
};

export const getLUTPassConfig = function (): LUTPassConfig {
  return Object.assign(getPassConfig(), {
    lut: "",
    intensity: 1,
    use2D: false,
  });
};
