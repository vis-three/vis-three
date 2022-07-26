import { PerspectiveCamera } from "three";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
import { objectCommands, objectCreate, objectDispose, } from "../../object/ObjectProcessor";
import { cacheCameraMap } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.PERSPECTIVECAMERA,
    commands: {
        add: {
            scale() { },
            ...(objectCommands.add),
        },
        set: {
            scale() { },
            adaptiveWindow({ target, value, engine }) {
                if (value) {
                    if (!cacheCameraMap.has(value)) {
                        const fun = (event) => {
                            target.aspect = event.width / event.height;
                            target.updateProjectionMatrix();
                        };
                        cacheCameraMap.set(target, fun);
                        engine.addEventListener("setSize", fun);
                        fun({
                            type: "setSize",
                            width: engine.dom.offsetWidth,
                            height: engine.dom.offsetHeight,
                        });
                    }
                }
                else {
                    const fun = cacheCameraMap.get(target);
                    if (fun) {
                        engine.removeEventListener("setSize", fun);
                        cacheCameraMap.delete(target);
                    }
                }
            },
            ...(objectCommands.set),
            $reg: [
                {
                    reg: new RegExp("fov|aspect|near|far"),
                    handler({ target, key, value }) {
                        target[key] = value;
                        target.updateProjectionMatrix();
                    },
                },
            ],
        },
        delete: {
            scale() { },
            ...(objectCommands.delete),
        },
    },
    create(config, engine) {
        const camera = new PerspectiveCamera();
        objectCreate(camera, config, {
            scale: true,
            adaptiveWindow: true,
        }, engine);
        camera.updateProjectionMatrix();
        if (config.adaptiveWindow) {
            const fun = (event) => {
                camera.aspect = event.width / event.height;
                camera.updateProjectionMatrix();
            };
            cacheCameraMap.set(camera, fun);
            engine.addEventListener("setSize", fun);
            fun({
                type: "setSize",
                width: engine.dom.offsetWidth,
                height: engine.dom.offsetHeight,
            });
        }
        return camera;
    },
    dispose(camera) {
        cacheCameraMap.delete(camera);
        objectDispose(camera);
    },
});
//# sourceMappingURL=PerspectiveCameraProcessor.js.map