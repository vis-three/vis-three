import { Tween } from "@tweenjs/tween.js";
import { Object3D } from "three";
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
        timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    },
};
export const generator = function (engine, config) {
    const params = config.params;
    const object = engine.getObjectBySymbol(params.target);
    if (!object) {
        console.warn(`can not found vid object: ${params.target}`);
        return () => { };
    }
    if (!(object instanceof Object3D)) {
        console.warn(`object is not instanceof Object3D: ${params.target}`);
        return () => { };
    }
    const renderManager = engine.renderManager;
    // 同步配置
    const supportData = engine.getConfigBySymbol(params.target);
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