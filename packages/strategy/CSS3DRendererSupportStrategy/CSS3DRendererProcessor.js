import { CONFIGTYPE, defineProcessor, } from "@vis-three/middleware";
import { syncObject } from "@vis-three/utils";
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
        let renderer = engine.css3DRenderer;
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
