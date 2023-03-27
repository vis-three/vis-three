import { CSS3DRendererEngine } from "@vis-three/css3d-renderer-plugin";
import {
  defineProcessor,
  EngineSupport,
  uniqueSymbol,
} from "@vis-three/middleware";
import { RendererCompiler } from "@vis-three/module-renderer/RendererCompiler";
import {
  getRendererConfig,
  RendererConfig,
} from "@vis-three/module-renderer/RendererConfig";
import { syncObject } from "@vis-three/utils";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";

export interface CSS3DRendererConfig extends RendererConfig {}

export const getCSS3DRenderereConfig = function (): CSS3DRendererConfig {
  return Object.assign(getRendererConfig(), {
    vid: uniqueSymbol("CSS3DRenderer"), // WebGLRenderer or vid
  });
};

export interface CSS3DRendererSupportEngine
  extends EngineSupport,
    CSS3DRendererEngine {}

export default defineProcessor<
  CSS3DRendererConfig,
  CSS3DRenderer,
  CSS3DRendererSupportEngine,
  RendererCompiler
>({
  type: "CSS3DRenderer",
  config: getCSS3DRenderereConfig,
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
    },
  },
  create(
    config: CSS3DRendererConfig,
    engine: CSS3DRendererSupportEngine
  ): CSS3DRenderer {
    let renderer = engine.css3DRenderer;

    if (config.size) {
      renderer.setSize(config.size.x, config.size.y);
    }

    syncObject(config, renderer, {
      size: true,
    });

    return renderer;
  },
  dispose(target: CSS3DRenderer) {},
});
