import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { defineProcessor } from "../../../core/Processor";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
export default defineProcessor({
    configType: CONFIGTYPE.CSS3DRENDERER,
    commands: {
        set: {
            size({ target, config }) {
                if (!config.size) {
                    target.setSize(target.domElement.offsetWidth, target.domElement.offsetHeight);
                }
                else {
                    target.setSize(config.size.x, config.size.y);
                }
            },
        },
    },
    create(config, engine) {
        let renderer;
        if (engine.css3DRenderer) {
            renderer = engine.css3DRenderer;
        }
        else {
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
    dispose(target) { },
});
//# sourceMappingURL=CSS3DRendererProcessor.js.map