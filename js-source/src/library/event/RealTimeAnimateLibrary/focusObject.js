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
        back: true,
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
        console.warn(`real time animation focusObject: can not found vid object: ${params.target}`);
        return () => { };
    }
    if (!cameraConfig) {
        console.warn(`engine current camera can not found config.`);
    }
    return () => {
        const renderManager = engine.renderManager;
        // 根据space计算position
        let position = {
            x: target.position.x + params.offset.x,
            y: target.position.y + params.offset.y,
            z: target.position.z + params.offset.z,
        };
        const backPosition = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z,
        };
        if (params.space === "local") {
            const vector3 = new Vector3(params.offset.x, params.offset.y, params.offset.z).applyEuler(target.rotation);
            position = {
                x: target.position.x + vector3.x,
                y: target.position.y + vector3.y,
                z: target.position.z + vector3.z,
            };
        }
        const positionTween = new Tween(camera.position)
            .to(position)
            .duration(params.duration)
            .delay(params.delay)
            .easing(timingFunction[params.timingFunction])
            .start();
        let upTween;
        const backUp = {
            x: camera.up.x,
            y: camera.up.y,
            z: camera.up.z,
        };
        if (params.space === "local") {
            // scene up
            const upVector3 = new Vector3(0, 1, 0).applyEuler(target.rotation);
            upTween = new Tween(camera.up)
                .to({
                x: upVector3.x,
                y: upVector3.y,
                z: upVector3.z,
            })
                .duration(params.duration)
                .delay(params.delay)
                .easing(timingFunction[params.timingFunction])
                .start();
        }
        let orbTween;
        const backOrb = {
            x: orbTarget.x,
            y: orbTarget.y,
            z: orbTarget.z,
        };
        if (orb) {
            orbTween = new Tween(orbTarget)
                .to(target.position)
                .duration(params.duration)
                .delay(params.delay)
                .easing(timingFunction[params.timingFunction])
                .start();
        }
        let renderFun;
        if (orb && params.space === "local") {
            renderFun = (event) => {
                positionTween.update();
                upTween.update();
                orbTween.update();
            };
        }
        else if (orb) {
            renderFun = (event) => {
                positionTween.update();
                orbTween.update();
            };
        }
        else if (params.space === "local") {
            renderFun = (event) => {
                positionTween.update();
                upTween.update();
            };
        }
        else {
            renderFun = (event) => {
                positionTween.update();
            };
        }
        renderManager.addEventListener("render", renderFun);
        positionTween.onComplete(() => {
            renderManager.removeEventListener("render", renderFun);
            if (cameraConfig) {
                cameraConfig.position.x = position.x;
                cameraConfig.position.y = position.y;
                cameraConfig.position.z = position.z;
            }
            if (params.back) {
                const backFun = () => {
                    const positionTween = new Tween(camera.position)
                        .to(backPosition)
                        .duration(params.duration)
                        .delay(params.delay)
                        .easing(timingFunction[params.timingFunction])
                        .start();
                    let upTween;
                    if (params.space === "local") {
                        upTween = new Tween(camera.up)
                            .to(backUp)
                            .duration(params.duration)
                            .delay(params.delay)
                            .easing(timingFunction[params.timingFunction])
                            .start();
                    }
                    let orbTween;
                    if (orb) {
                        orbTween = new Tween(orbTarget)
                            .to(backOrb)
                            .duration(params.duration)
                            .delay(params.delay)
                            .easing(timingFunction[params.timingFunction])
                            .start();
                    }
                    const renderFun = (event) => {
                        positionTween.update();
                        upTween && upTween.update();
                        orbTween && orbTween.update();
                    };
                    positionTween.onComplete(() => {
                        renderManager.removeEventListener("render", renderFun);
                    });
                    renderManager.addEventListener("render", renderFun);
                    document.removeEventListener("dblclick", backFun);
                };
                document.addEventListener("dblclick", backFun);
            }
        });
    };
};
//# sourceMappingURL=focusObject.js.map