import { Tween } from "@tweenjs/tween.js";
import { timingFunction, TIMINGFUNCTION } from "./common";
export const config = {
    name: "moveSpacing",
    params: {
        target: "",
        spacing: {
            x: 10,
            y: 10,
            z: 10,
        },
        delay: 0,
        duration: 1000,
        timingFunction: TIMINGFUNCTION.EQI,
    },
};
export const generator = function (engine, config) {
    const params = config.params;
    const object = engine.compilerManager.getObjectBySymbol(params.target);
    if (!object) {
        console.error(`can not found vid object: ${params.target}`);
        return () => { };
    }
    const renderManager = engine.renderManager;
    // 同步配置
    const supportData = engine.dataSupportManager.getConfigBySymbol(params.target);
    return () => {
        const position = {
            x: object.position.x + params.spacing.x,
            y: object.position.y + params.spacing.y,
            z: object.position.z + params.spacing.z,
        };
        const tween = new Tween(object.position)
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
            supportData.position.x = position.x;
            supportData.position.y = position.y;
            supportData.position.z = position.z;
        });
    };
};
//# sourceMappingURL=moveSpacing.js.map