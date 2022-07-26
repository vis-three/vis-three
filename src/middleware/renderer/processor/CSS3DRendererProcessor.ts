import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { CSS3DRendererConfig } from "../RendererConfig";

export default defineProcessor<CSS3DRendererConfig, CSS3DRenderer>({
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
  create(config: CSS3DRendererConfig, engine: EngineSupport): CSS3DRenderer {
    let renderer: CSS3DRenderer;

    if (engine.css3DRenderer) {
      renderer = engine.css3DRenderer!;
    } else {
      renderer = new CSS3DRenderer();
    }

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
