import {
  CONFIGTYPE,
  defineProcessor,
  EngineSupport,
  WebGLRendererConfig,
} from "@vis-three/middleware";
import { syncObject } from "@vis-three/utils";
import { WebGLRendererEngine } from "@vis-three/webgl-renderer-plugin";
import { WebGLRenderer } from "three";

export interface WebGLRendererSupportEngine
  extends EngineSupport,
    WebGLRendererEngine {}

export default defineProcessor<
  WebGLRendererConfig,
  WebGLRenderer,
  WebGLRendererSupportEngine
>({
  configType: CONFIGTYPE.WEBGLRENDERER,
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
  create(
    config: WebGLRendererConfig,
    engine: WebGLRendererSupportEngine
  ): WebGLRenderer {
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
  dispose(renderer: WebGLRenderer) {
    renderer.clear();
    renderer.dispose();
  },
});
