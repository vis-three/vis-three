import { getObjectConfig, ObjectConfig } from "@vis-three/module-object";

export interface PerspectiveCameraConfig {
  fov: number;
  aspect: number;
  near: number;
  far: number;
}

export interface OrthographicCameraConfig {
  left: number;
  right: number;
  top: number;
  bottom: number;
  near: number;
  far: number;
}

export interface LightShadowConfig<C = PerspectiveCameraConfig> {
  bias: number;
  normalBias: number;
  radius: number;
  mapSize: {
    x: number;
    y: number;
  };
  camera: C;
}

export interface LightConifg extends ObjectConfig {
  color: string;
  intensity: number;
}

export interface ShadowLightConfig<C = PerspectiveCameraConfig>
  extends LightConifg {
  shadow: LightShadowConfig<C>;
}

export type AmbientLightConfig = LightConifg;

export interface PointLightConfig extends ShadowLightConfig {
  distance: number;
  decay: number;
}

export interface SpotLightConfig extends ShadowLightConfig {
  distance: number;
  angle: number;
  penumbra: number;
  decay: number;
  targetAt: string;
}

export interface DirectionalLightConfig
  extends ShadowLightConfig<OrthographicCameraConfig> {}
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

const getShadowLightConfig = function <C = PerspectiveCameraConfig>(
  camera: C
): ShadowLightConfig<C> {
  return Object.assign(getLightConfig(), {
    shadow: {
      bias: 0,
      normalBias: 0,
      radius: 1,
      mapSize: {
        x: 512,
        y: 512,
      },
      camera,
    },
  });
};

export const getAmbientLightConfig = function (): AmbientLightConfig {
  return Object.assign(getObjectConfig(), {
    color: "rgb(255, 255, 255)",
    intensity: 1,
  });
};

export const getPointLightConfig = function (): PointLightConfig {
  return Object.assign(
    getShadowLightConfig({
      fov: 90,
      aspect: 1,
      near: 0.5,
      far: 500,
    }),
    {
      distance: 30,
      decay: 0.01,
    }
  );
};

export const getSpotLightConfig = function (): SpotLightConfig {
  return Object.assign(
    getShadowLightConfig({
      fov: 50,
      aspect: 1,
      near: 0.5,
      far: 500,
    }),
    {
      distance: 30,
      angle: (Math.PI / 180) * 45,
      penumbra: 0.01,
      decay: 0.01,
      targetAt:'',
    }
  );
};

export const getDirectionalLightConfig = function (): DirectionalLightConfig {
  return Object.assign(
    getShadowLightConfig<OrthographicCameraConfig>({
      near: 0.5,
      far: 500,
      top: window.innerHeight,
      bottom: -window.innerHeight,
      left: -window.innerWidth,
      right: window.innerWidth,
    }),
    {}
  );
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
