import { Vector3 } from "three";
import { defineProcessor } from "../../../core/Processor";
import { VisOrbitControls } from "../../../optimize/VisOrbitControls";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
export default defineProcessor({
    configType: CONFIGTYPE.ORBITCONTROLS,
    commands: {
        set: {
            target({ target, config, path, key, value }) {
                const targetConfig = config.target;
                if (!config.type) {
                    config.target = new Vector3(0, 0, 0);
                    return;
                }
                if (typeof config.target === "string") {
                    // TODO:
                }
                else {
                    if (path.length > 1) {
                        target.target[key] = value;
                    }
                    else {
                        target.target = new Vector3(targetConfig.x, targetConfig.y, targetConfig.z);
                    }
                }
            },
        },
    },
    create(config, engine) {
        let controls;
        if (engine.orbitControls) {
            controls = engine.orbitControls;
        }
        else {
            controls = new VisOrbitControls();
            controls.setCamera(engine.camera);
            controls.setDom(engine.dom);
        }
        if (config.target) {
            if (typeof config.target === "string") {
                // TODO:
            }
            else {
                controls.target = new Vector3(config.target.x, config.target.y, config.target.z);
            }
        }
        syncObject(config, controls, {
            target: true,
        });
        return controls;
    },
    dispose(target) {
        target.dispose();
    },
});
//# sourceMappingURL=OrbitControlsProcessor.js.map