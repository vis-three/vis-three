import { Vector3 } from "three";
import { syncObject } from "@vis-three/utils";
import { defineProcessor, uniqueSymbol, } from "@vis-three/middleware";
const type = "OrbitControls";
export const getOrbitControlsConfig = function () {
    return {
        vid: uniqueSymbol(type),
        type: "",
        autoRotate: false,
        autoRotateSpeed: 2.0,
        enableDamping: false,
        dampingFactor: 0.05,
        enabled: true,
        enablePan: true,
        enableRotate: true,
        enableZoom: true,
        maxAzimuthAngle: Infinity,
        maxDistance: Infinity,
        maxPolarAngle: Math.PI,
        maxZoom: Infinity,
        minAzimuthAngle: -Infinity,
        minDistance: 0,
        minPolarAngle: 0,
        minZoom: 0,
        panSpeed: 1,
        rotateSpeed: 1,
        zoomSpeed: 1,
        screenSpacePanning: true,
        target: null,
    };
};
export default defineProcessor({
    type: type,
    config: getOrbitControlsConfig,
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
        let controls = engine.orbitControls;
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
