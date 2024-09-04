import {
  defineModel,
  EngineSupport,
  uniqueSymbol,
} from "@vis-three/tdcm";
import { getRendererConfig, RendererConfig } from "@vis-three/module-renderer";
import { CSS3DRendererEngine } from "@vis-three/plugin-css3d-renderer";
import { syncObject } from "@vis-three/utils";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";

export interface CSS3DRendererConfig extends RendererConfig {}

export const getCSS3DRenderereConfig = function (): CSS3DRendererConfig {
  return Object.assign(getRendererConfig(), {
    vid: uniqueSymbol("CSS3DRenderer"), // WebGLRenderer or vid
  });
};

export interface CSS3DRendererSupportEngine
  extends EngineSupport,
    CSS3DRendererEngine {}

export default defineModel<
  CSS3DRendererConfig,
  CSS3DRenderer,
  {},
  {},
  CSS3DRendererSupportEngine
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
  create({ config, engine }) {
    let renderer = engine.css3DRenderer;

    if (config.size) {
      renderer.setSize(config.size.x, config.size.y);
    }

    syncObject(config, renderer, {
      size: true,
    });

    return renderer;
  },
  dispose({ target }) {},
});
