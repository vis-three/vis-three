import { defineObjectModel, ObjectModel } from "@vis-three/module-object";
import { LightConifg, ShadowLightConfig } from "../LightConfig";
import { Color, Light, PerspectiveCamera, Vector2 } from "three";
import {
  Compiler,
  emptyHandler,
  EngineSupport,
  Model,
  RenderEvent,
} from "@vis-three/tdcm";
import { IgnoreAttribute } from "@vis-three/utils";
import { ENGINE_EVENT } from "@vis-three/core";
import { WebGLRendererEngine } from "@vis-three/plugin-webgl-renderer";

export interface WebGLRendererEngineSupport
  extends EngineSupport,
    WebGLRendererEngine {}

export interface LightContext {
  cacheColor: Color;
}

export interface LightShared {
  cacheMapSize: Vector2;
  cacheViewportSize: Vector2;
  updateShadowSize: (
    light: Light,
    config: ShadowLightConfig<any>,
    maxTextureSize: number
  ) => void;
}

export type LightModel = Model<LightConifg, Light> &
  Readonly<LightShared> &
  LightContext;

export const defineLightModel = defineObjectModel.extend<
  LightConifg,
  Light,
  LightContext,
  LightShared,
  WebGLRendererEngineSupport,
  Compiler<WebGLRendererEngineSupport>,
  <L extends Light = Light, C extends LightConifg = LightConifg>(params: {
    model: LightModel;
    light: L;
    config: C;
    filter: IgnoreAttribute<C>;
    engine: WebGLRendererEngineSupport;
    shadow: boolean;
  }) => void
>((objectModel) => ({
  shared: {
    cacheMapSize: new Vector2(),
    cacheViewportSize: new Vector2(),
    updateShadowSize(
      light: Light,
      config: ShadowLightConfig<any>,
      maxTextureSize: number
    ) {
      const cacheMapSize = this.cacheMapSize;
      const cacheViewportSize = this.cacheViewportSize;

      const shadow = light.shadow!;

      light.shadow!.mapSize.set(
        config.shadow.mapSize.x,
        config.shadow.mapSize.y
      );

      cacheMapSize.copy(shadow.mapSize);
      const shadowFrameExtents = shadow.getFrameExtents();
      cacheMapSize.multiply(shadowFrameExtents);
      cacheViewportSize.copy(shadow.mapSize);

      if (cacheMapSize.x > maxTextureSize || cacheMapSize.y > maxTextureSize) {
        if (cacheMapSize.x > maxTextureSize) {
          cacheViewportSize.x = Math.floor(
            maxTextureSize / shadowFrameExtents.x
          );
          cacheMapSize.x = cacheViewportSize.x * shadowFrameExtents.x;
          shadow.mapSize.x = cacheViewportSize.x;
        }

        if (cacheMapSize.y > maxTextureSize) {
          cacheViewportSize.y = Math.floor(
            maxTextureSize / shadowFrameExtents.y
          );
          cacheMapSize.y = cacheViewportSize.y * shadowFrameExtents.y;
          shadow.mapSize.y = cacheViewportSize.y;
        }
      }

      light.shadow!.map!.setSize(cacheMapSize.x, cacheMapSize.y);
    },
  },
  context() {
    return {
      cacheColor: new Color(),
    };
  },
  commands: {
    set: {
      color({ model, target, value }) {
        target.color.copy(model.cacheColor.set(value));
      },
      scale: emptyHandler,
      rotation: emptyHandler,
      lookAt: emptyHandler,
      shadow: {
        mapSize({ model, target, config, engine, key, value }) {
          target.shadow.mapSize[key] = value;
          model.updateShadowSize(
            target,
            config,
            engine.webGLRenderer.capabilities.maxTextureSize
          );
        },
        camera({ target, key, value }) {
          target.shadow.camera[key] = value;
          (<PerspectiveCamera>target.shadow.camera).updateProjectionMatrix();
        },
      },
    },
  },
  create({ model, light, config, filter, engine, shadow }) {
    light.color.copy(model.cacheColor.set(config.color));

    if (shadow) {
      const shadowConfig = config as unknown as ShadowLightConfig;

      const shadowRenderFun = () => {
        if (light.shadow!.map) {
          model.updateShadowSize(
            light,
            shadowConfig,
            engine.webGLRenderer.capabilities.maxTextureSize
          );
          engine.renderManager.removeEventListener<RenderEvent>(
            ENGINE_EVENT.RENDER,
            shadowRenderFun
          );
        }
      };

      engine.renderManager.addEventListener<RenderEvent>(
        ENGINE_EVENT.RENDER,
        shadowRenderFun
      );

      if (shadowConfig.shadow) {
        for (const key in shadowConfig.shadow.camera) {
          (<any>light.shadow!.camera)[key] = shadowConfig.shadow.camera[key];
        }
  
        (<any>light.shadow!.camera).updateProjectionMatrix();
      }

    }

    objectModel.create!({
      model: model as unknown as ObjectModel,
      target: light,
      config,
      filter: {
        color: true,
        scale: true,
        rotation: true,
        lookAt: true,
        shadow: {
          mapSize: true,
          camera: true,
        },
        ...filter,
      },
      engine,
    });
  },

  dispose(light: Light) {
    objectModel.dispose!(light);
  },
}));
