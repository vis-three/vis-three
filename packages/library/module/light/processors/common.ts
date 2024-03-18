import {
  emptyHandler,
  EngineSupport,
  ProcessorCommands,
  ProcessParams,
  RenderEvent,
} from "@vis-three/middleware";
import { objectCommands, objectCreate } from "@vis-three/module-object";
import { IgnoreAttribute } from "@vis-three/utils";
import {
  Color,
  Light,
  Object3D,
  PerspectiveCamera,
  Vector2,
  WebGLRenderer,
} from "three";
import { LightCompiler } from "../LightCompiler";
import {
  LightConifg,
  PerspectiveCameraConfig,
  ShadowLightConfig,
} from "../LightConfig";
import { ENGINE_EVENT } from "@vis-three/core";
import { WebGLRendererEngine } from "@vis-three/plugin-webgl-renderer";

export interface WebGLRendererEngineSupport
  extends EngineSupport,
    WebGLRendererEngine {}

const cacheMapSize = new Vector2();
const cacheViewportSize = new Vector2();

const updateShadowSize = function (
  light: Light,
  config: ShadowLightConfig<any>,
  maxTextureSize: number
) {
  const shadow = light.shadow;

  light.shadow.mapSize.set(config.shadow.mapSize.x, config.shadow.mapSize.y);

  cacheMapSize.copy(shadow.mapSize);
  const shadowFrameExtents = shadow.getFrameExtents();
  cacheMapSize.multiply(shadowFrameExtents);
  cacheViewportSize.copy(shadow.mapSize);

  if (cacheMapSize.x > maxTextureSize || cacheMapSize.y > maxTextureSize) {
    if (cacheMapSize.x > maxTextureSize) {
      cacheViewportSize.x = Math.floor(maxTextureSize / shadowFrameExtents.x);
      cacheMapSize.x = cacheViewportSize.x * shadowFrameExtents.x;
      shadow.mapSize.x = cacheViewportSize.x;
    }

    if (cacheMapSize.y > maxTextureSize) {
      cacheViewportSize.y = Math.floor(maxTextureSize / shadowFrameExtents.y);
      cacheMapSize.y = cacheViewportSize.y * shadowFrameExtents.y;
      shadow.mapSize.y = cacheViewportSize.y;
    }
  }

  light.shadow.map.setSize(cacheMapSize.x, cacheMapSize.y);
};

export const colorHandler = function <C extends LightConifg, O extends Light>({
  target,
  value,
}: ProcessParams<C, O, EngineSupport, LightCompiler>) {
  target.color.copy(new Color(value));
};

export const lightCreate = function <C extends LightConifg, O extends Light>(
  light: O,
  config: C,
  filter: IgnoreAttribute<C>,
  engine: EngineSupport
) {
  light.color.copy(new Color(config.color));
  return objectCreate(
    light,
    config,
    {
      color: true,
      scale: true,
      rotation: true,
      lookAt: true,
      ...filter,
    },
    engine
  );
};

export const shadowLightCreate = function <
  P,
  C extends ShadowLightConfig<P>,
  O extends Light
>(
  light: O,
  config: C,
  filter: IgnoreAttribute<C>,
  engine: WebGLRendererEngineSupport
) {
  const shadowRenderFun = () => {
    if (light.shadow.map) {
      updateShadowSize(
        light,
        config,
        engine.webGLRenderer.capabilities.maxTextureSize
      );
    }
    engine.renderManager.removeEventListener<RenderEvent>(
      ENGINE_EVENT.RENDER,
      shadowRenderFun
    );
  };

  engine.renderManager.addEventListener<RenderEvent>(
    ENGINE_EVENT.RENDER,
    shadowRenderFun
  );

  for (const key in config.shadow.camera) {
    (<any>light.shadow.camera)[key] = config.shadow.camera[key];
  }

  (<any>light.shadow.camera).updateProjectionMatrix();

  return lightCreate(
    light,
    config,
    {
      shadow: {
        mapSize: true,
        camera: true,
      },
      ...filter,
    },
    engine
  );
};

export type LightCommands<
  C extends LightConifg,
  O extends Light
> = ProcessorCommands<C, O, WebGLRendererEngineSupport, LightCompiler>;

export const lightCommands: LightCommands<LightConifg, Light> = Object.assign(
  {},
  objectCommands as any,
  {
    set: {
      color: colorHandler,
      scale: emptyHandler,
      rotation: emptyHandler,
      lookAt: emptyHandler,
    },
  }
);

export const ShadowCommands = {
  set: {
    shadow: {
      mapSize({
        target,
        config,
        engine,
        key,
        value,
      }: ProcessParams<
        ShadowLightConfig,
        Light,
        WebGLRendererEngineSupport,
        LightCompiler
      >) {
        target.shadow.mapSize[key] = value;
        updateShadowSize(
          target,
          config,
          engine.webGLRenderer.capabilities.maxTextureSize
        );
      },
      camera({
        target,
        key,
        value,
      }: ProcessParams<
        ShadowLightConfig,
        Light,
        EngineSupport,
        LightCompiler
      >) {
        target.shadow.camera[key] = value;
        (<PerspectiveCamera>target.shadow.camera).updateProjectionMatrix();
      },
    },
  },
};
