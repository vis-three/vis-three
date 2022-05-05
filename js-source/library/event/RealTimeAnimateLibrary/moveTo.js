import { Tween } from "@tweenjs/tween.js";
import { timeingFunction, TIMEINGFUNCTION } from "./common";
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
        timingFunction: TIMEINGFUNCTION.EQI,
    },
};
export const generator = function (engine, config) {
    const params = config.params;
    const compiler = engine.compilerManager;
    const object = compiler.getObjectBySymbol(params.target);
    if (!object) {
        console.error(`can not found vid object: ${params.target}`);
        return () => { };
    }
    const renderManager = engine.renderManager;
    // 同步配置
    const supportData = engine.dataSupportManager.getConfigBySymbol(params.target);
    if (!config) {
        console.error(`can not found object config: ${params.target}`);
        return () => { };
    }
    return () => {
        const tween = new Tween(object.position)
            .to(params.position)
            .duration(params.duration)
            .delay(params.delay)
            .easing(timeingFunction[params.timingFunction])
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
        });
    };
};
//# sourceMappingURL=moveTo.js.map