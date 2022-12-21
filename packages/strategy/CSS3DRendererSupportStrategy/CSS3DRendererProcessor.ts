import { CSS3DRendererEngine } from "@vis-three/css3d-renderer-plugin";
import {
  CONFIGTYPE,
  CSS3DRendererConfig,
  defineProcessor,
  EngineSupport,
} from "@vis-three/middleware";
import { syncObject } from "@vis-three/utils";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";

export interface CSS3DRendererSupportEngine
  extends EngineSupport,
    CSS3DRendererEngine {}

export default defineProcessor<
  CSS3DRendererConfig,
  CSS3DRenderer,
  CSS3DRendererSupportEngine
>({
  configType: CONFIGTYPE.CSS3DRENDERER,
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
