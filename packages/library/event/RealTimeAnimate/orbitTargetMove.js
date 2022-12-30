import { Tween } from "@tweenjs/tween.js";
import { timingFunction, TIMINGFUNCTION } from "./common";
export const config = {
    name: "orbitTargetMove",
    params: {
        target: "",
        offset: {
            x: 0,
            y: 0,
            z: 0,
        },
        delay: 0,
        duration: 1000,
        timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    },
};
export const generator = function (engine, config) {
    const params = config.params;
    const compiler = engine.compilerManager;
    if (!engine.orbitControls) {
        console.warn(`real time animation orbitTargetMove: engine can not install orbitControls.`);
        return () => { };
    }
    const renderManager = engine.renderManager;
    // 防止重复触发
    let animating = false;
    return () => {
        if (animating) {
            return;
        }
        animating = true;
        let position = params.offset;
        if (params.target) {
            const object = engine.getObjectBySymbol(params.target);
            if (!object) {
                console.warn(`real time animation orbitTargetMove: can not found vid object: ${params.target}`);
            }
            else {
                position = {
                    x: object.matrixWorld.elements[12] + position.x,
                    y: object.matrixWorld.elements[13] + position.y,
                    z: object.matrixWorld.elements[14] + position.z,
                };
            }
        }
        const tween = new Tween(engine.orbitControls.target)
            .to(position)
            .duration(params.duration)
            .delay(params.delay)
            .easing(timingFunction[params.timingFunction])
            .start();
        const renderFun = (event) => {
            tween.update();
        };
        renderManager.addEventListener("render", renderFun);
        tween.onComplete(() => {
            renderManager.removeEventListener("render", renderFun);
            animating = false;
        });
    };
};
