import { PerspectiveCamera } from "three";
import { getPerspectiveCameraConfig, } from "./CameraConfig";
import { defineProcessor } from "@vis-three/middleware";
import { objectCommands, objectCreate, objectDispose, } from "@vis-three/module-object";
export default defineProcessor({
    type: "PerspectiveCamera",
    config: getPerspectiveCameraConfig,
    commands: {
        add: {
            scale() { },
            ...(objectCommands.add),
        },
        set: {
            scale() { },
            adaptiveWindow({ target, value, engine, compiler }) {
                if (value) {
                    if (!compiler.cacheCameraMap.has(value)) {
                        const fun = (event) => {
                            target.aspect = event.width / event.height;
                            target.updateProjectionMatrix();
                        };
                        compiler.cacheCameraMap.set(target, fun);
                        engine.addEventListener("setSize", fun);
                        fun({
                            type: "setSize",
                            width: engine.dom.offsetWidth,
                            height: engine.dom.offsetHeight,
                        });
                    }
                }
                else {
                    const fun = compiler.cacheCameraMap.get(target);
                    if (fun) {
                        engine.removeEventListener("setSize", fun);
                        compiler.cacheCameraMap.delete(target);
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
    create(config, engine, compiler) {
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
            compiler.cacheCameraMap.set(camera, fun);
            engine.addEventListener("setSize", fun);
            fun({
                type: "setSize",
                width: engine.dom.offsetWidth,
                height: engine.dom.offsetHeight,
            });
        }
        return camera;
    },
    dispose(camera, engine, compiler) {
        compiler.cacheCameraMap.delete(camera);
        objectDispose(camera);
    },
});
