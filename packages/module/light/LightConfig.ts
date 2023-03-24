import { getObjectConfig, ObjectConfig } from "@vis-three/module-object";

export interface LightConifg extends ObjectConfig {
  color: string;
  intensity: number;
}

export type AmbientLightConfig = LightConifg;

export interface PointLightConfig extends LightConifg {
  distance: number;
  decay: number;
}

export interface SpotLightConfig extends LightConifg {
  distance: number;
  angle: number;
  penumbra: number;
  decay: number;
}

export interface DirectionalLightConfig extends LightConifg {
  shadow: {
    mapSize: {
      width: number;
      height: number;
    };
    camera: {
      near: number;
      far: number;
    };
  };
}
export interface HemisphereLightConfig extends LightConifg {
  groundColor: string;
}

export interface RectAreaLightConfig extends LightConifg {
  width: number;
  height: number;
}

export type LightConfigAllType =
  | AmbientLightConfig
  | PointLightConfig
  | SpotLightConfig
  | DirectionalLightConfig
  | HemisphereLightConfig
  | RectAreaLightConfig;

const getLightConfig = function (): LightConifg {
  return Object.assign(getObjectConfig(), {
    type: "Light",
    color: "rgb(255, 255, 255)",
    intensity: 1,
  });
};

export const getAmbientLightConfig = function (): AmbientLightConfig {
  return Object.assign(getObjectConfig(), {
    color: "rgb(255, 255, 255)",
    intensity: 1,
  });
};

export const getPointLightConfig = function (): PointLightConfig {
  return Object.assign(getLightConfig(), {
    distance: 30,
    decay: 0.01,
  });
};

export const getSpotLightConfig = function (): SpotLightConfig {
  return Object.assign(getLightConfig(), {
    distance: 30,
    angle: (Math.PI / 180) * 45,
    penumbra: 0.01,
    decay: 0.01,
  });
};

export const getDirectionalLightConfig = function (): DirectionalLightConfig {
  return Object.assign(getLightConfig(), {
    shadow: {
      mapSize: {
        width: 512,
        height: 512,
      },
      camera: {
        near: 0.5,
        far: 500,
      },
    },
  });
};

export const getHemisphereLightConfig = function (): HemisphereLightConfig {
  return Object.assign(getLightConfig(), {
    color: "rgb(255, 255, 255)",
    groundColor: "rgb(0, 0, 0)",
  });
};

export const getRectAreaLightConfig = function (): RectAreaLightConfig {
  return Object.assign(getLightConfig(), {
    width: 10,
    height: 10,
  });
};
