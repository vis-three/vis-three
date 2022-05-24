import { Tween } from "@tweenjs/tween.js";
import { Vector3 } from "three";
import { timingFunction, TIMINGFUNCTION } from "./common";
export const config = {
    name: "foucsObject",
    params: {
        target: "",
        space: "world",
        offset: {
            x: 0,
            y: 0,
            z: 20,
        },
        delay: 0,
        duration: 1000,
        timingFunction: TIMINGFUNCTION.EQI,
    },
    finall: {
        camera: null,
    },
};
export const generator = function (engine, config) {
    const params = config.params;
    const target = engine.getObjectBySymbol(params.target);
    const camera = engine.camera;
    const cameraConfig = engine.getObjectConfig(camera);
    const orb = engine.orbitControls && engine.orbitControls.object === camera;
    const orbTarget = engine.orbitControls.target;
    if (!target) {
        console.warn(`real time animation moveTO: can not found vid object: ${params.target}`);
        return () => { };
    }
    if (!cameraConfig) {
        console.warn(`engine current camera can not found config.`);
    }
    return () => {
        const renderManager = engine.renderManager;
        // 根据face计算position
        let position = {
            x: target.position.x + params.offset.x,
            y: target.position.y + params.offset.y,
            z: target.position.z + params.offset.z,
        };
        if (params.space === "local") {
            const vector3 = new Vector3(params.offset.x, params.offset.y, params.offset.z).applyEuler(target.rotation);
            position = {
                x: target.position.x + vector3.x,
                y: target.position.y + vector3.y,
                z: target.position.z + vector3.z,
            };
        }
        const tween = new Tween(camera.position)
            .to(position)
            .duration(params.duration)
            .delay(params.delay)
            .easing(timingFunction[params.timingFunction])
            .start();
        let tween2;
        if (orb) {
            tween2 = new Tween(orbTarget)
                .to(target.position)
                .duration(params.duration)
                .delay(params.delay)
                .easing(timingFunction[params.timingFunction])
                .start();
        }
        let renderFun;
        if (orb) {
            renderFun = (event) => {
                tween.update();
                tween2.update();
            };
        }
        else {
            renderFun = (event) => {
                tween.update();
            };
        }
        renderManager.addEventListener("render", renderFun);
        tween.onComplete(() => {
            renderManager.removeEventListener("render", renderFun);
            if (cameraConfig) {
                cameraConfig.position.x = position.x;
                cameraConfig.position.y = position.y;
                cameraConfig.position.z = position.z;
            }
        });
    };
};
//# sourceMappingURL=focusObject.js.map