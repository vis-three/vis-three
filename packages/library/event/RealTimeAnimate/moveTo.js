import { Tween } from "@tweenjs/tween.js";
import { timingFunction, TIMINGFUNCTION } from "./common";
export const config = {
    name: "moveTo",
    params: {
        target: "",
        position: {
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
    const object = compiler.getObjectBySymbol(params.target);
    if (!object) {
        console.warn(`real time animation moveTO: can not found vid object: ${params.target}`);
        return () => { };
    }
    const renderManager = engine.renderManager;
    // 同步配置
    const supportData = engine.dataSupportManager.getConfigBySymbol(params.target);
    if (!supportData) {
        console.warn(`can not found object config: ${params.target}`);
        return () => { };
    }
    // 防止重复触发
    let animating = false;
    return () => {
        if (animating) {
            return;
        }
        animating = true;
        const tween = new Tween(object.position)
            .to(params.position)
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
            supportData.position.x = params.position.x;
            supportData.position.y = params.position.y;
            supportData.position.z = params.position.z;
            animating = false;
        });
    };
};
