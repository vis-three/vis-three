import { defineModel, EngineSupport, uniqueSymbol } from "@vis-three/tdcm";
import {
  getRendererConfig,
  RendererConfig,
  RendererCompiler,
} from "@vis-three/module-renderer";

import { syncObject } from "@vis-three/utils";
import { WebGLRendererEngine } from "@vis-three/plugin-webgl-renderer";
import {
  NoToneMapping,
  PCFShadowMap,
  SRGBColorSpace,
  WebGLRenderer,
} from "three";

export interface ShadowMapConfig {
  enabled: boolean;
  autoUpdate: boolean;
  needsUpdate: boolean;
  type: number;
}

export interface WebGLRendererViewPort {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type WebGLRendererScissor = WebGLRendererViewPort;

export interface WebGLRendererConfig extends RendererConfig {
  clearColor: string;
  pixelRatio: number;
  /**@deprecated use outputColorSpace */
  outputEncoding: number;
  outputColorSpace: string;
  physicallyCorrectLights: boolean;
  shadowMap: ShadowMapConfig;
  toneMapping: number;
  toneMappingExposure: number;
  adaptiveCamera: boolean; // 适应相机
  viewport: WebGLRendererViewPort | null; // 为null 默认跟随canves
  scissor: WebGLRendererScissor | null; // 为null 默认跟随canves
}

export const getWebGLRendererConfig = function (): WebGLRendererConfig {
  return Object.assign(getRendererConfig(), {
    vid: uniqueSymbol("WebGLRenderer"), // WebGLRenderer or vid
    clearColor: "rgba(0, 0, 0, 0)",
    outputEncoding: 0,
    outputColorSpace: SRGBColorSpace,
    physicallyCorrectLights: false,
    shadowMap: {
      enabled: false,
      autoUpdate: true,
      needsUpdate: false,
      type: PCFShadowMap,
    },
    toneMapping: NoToneMapping,
    toneMappingExposure: 1,
    pixelRatio: window.devicePixelRatio,
    adaptiveCamera: false,
    viewport: null,
    scissor: null,
  });
};

export interface WebGLRendererSupportEngine
  extends EngineSupport,
    WebGLRendererEngine {}

export default defineModel<
  WebGLRendererConfig,
  WebGLRenderer,
  {},
  {},
  WebGLRendererSupportEngine,
  RendererCompiler
>({
  type: "WebGLRenderer",
  config: getWebGLRendererConfig,
  commands: {
    set: {
      size({ target, config }) {
        if (!config.size) {
          target.setSize(
            target.domElement.offsetWidth,
            target.domElement.offsetHeight
          );
        } else {
          target.setSize(config.size.x, config.size.y);
        }
      },
      clearColor({ target, value }) {
        // 取出alpha的值
        const alpha = Number(value.slice(0, -1).split(",").pop().trim());
        target.setClearColor(value, alpha);
        target.clear();
      },
      viewport({ target, config }) {
        const viewport = config.viewport;
        if (viewport) {
          target.setViewport(
            viewport.x,
            viewport.y,
            viewport.width,
            viewport.height
          );
        } else {
          const domElement = target.domElement;
          target.setViewport(
            0,
            0,
            domElement.offsetWidth,
            domElement.offsetHeight
          );
        }
      },
      scissor({ target, config }) {
        const scissor = config.scissor;
        if (scissor) {
          target.setScissorTest(true);
          target.setScissor(
            scissor.x,
            scissor.y,
            scissor.width,
            scissor.height
          );
        } else {
          target.setScissorTest(false);
          const domElement = target.domElement;
          target.setScissor(
            0,
            0,
            domElement.offsetWidth,
            domElement.offsetHeight
          );
        }
      },
      pixelRatio({ target, value }) {
        target.setPixelRatio(value);
        target.clear();
      },
    },
  },
  create({ config, engine }): WebGLRenderer {
    let renderer = engine.webGLRenderer;

    if (config.size) {
      renderer.setSize(config.size.x, config.size.y);
    }
    if (config.clearColor) {
      const alpha = Number(
        config.clearColor.slice(0, -1).split(",").pop()!.trim()
      );
      renderer.setClearColor(config.clearColor, alpha);
    }
    if (config.viewport) {
      const viewport = config.viewport;
      renderer.setViewport(
        viewport.x,
        viewport.y,
        viewport.width,
        viewport.height
      );
    }
    if (config.scissor) {
      const scissor = config.scissor;
      renderer.setScissorTest(true);
      renderer.setScissor(scissor.x, scissor.y, scissor.width, scissor.height);
    }
    if (config.pixelRatio) {
      renderer.setPixelRatio(config.pixelRatio);
    }

    syncObject(config, renderer, {
      size: true,
      clearColor: true,
      viewport: true,
      scissor: true,
      pixelRatio: true,
    });

    return renderer;
  },
  dispose({ target }) {
    target.clear();
    target.dispose();
  },
});
