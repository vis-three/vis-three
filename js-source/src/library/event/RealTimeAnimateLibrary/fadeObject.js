import { Tween } from "@tweenjs/tween.js";
import { Material } from "three";
import { timingFunction, TIMINGFUNCTION } from "./common";
export const config = {
    name: "fadeObject",
    params: {
        target: "",
        direction: "out",
        delay: 0,
        duration: 1000,
        timingFunction: TIMINGFUNCTION.EQI,
        visible: false,
    },
};
export const generator = function (engine, config) {
    const params = config.params;
    const target = engine.getObjectBySymbol(params.target);
    if (!target) {
        console.warn(`real time animation fadeObject: can not found vid object: ${params.target}`);
        return () => { };
    }
    const objectConfig = engine.getObjectConfig(target);
    if (!objectConfig.material) {
        console.warn(`real time animation fadeObject: target can not support fade: ${params.target}`);
        return () => { };
    }
    const materialList = [];
    const materialConfigList = [];
    const materialSymbolList = Array.isArray(objectConfig.material)
        ? [].concat(objectConfig.material)
        : [objectConfig.material];
    for (const vid of materialSymbolList) {
        const material = engine.getObjectBySymbol(vid);
        const materialConfig = engine.getConfigBySymbol(vid);
        if (!(material instanceof Material)) {
            console.error(`real time animation fadeObject: object config material is not instanceof Material: ${vid}`);
            continue;
        }
        if (!materialConfig) {
            console.error(`real time animation fadeObject: object config material can not found config: ${vid}`);
            continue;
        }
        materialList.push(material);
        materialConfigList.push(materialConfig);
    }
    return () => {
        const renderManager = engine.renderManager;
        materialList.forEach((material, i, arr) => {
            material.transparent = true;
            material.opacity = params.direction === "in" ? 0 : 1;
            material.needsUpdate = true;
            const tween = new Tween(material)
                .to({
                opacity: params.direction === "in" ? 1 : 0,
            })
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
                if (params.direction === "out" && params.visible) {
                    materialConfigList[i].visible = false;
                }
                else if (params.direction === "in" && params.visible) {
                    materialConfigList[i].visible = true;
                }
                materialConfigList[i].opacity = params.direction === "in" ? 1 : 0;
            });
        });
    };
};
//# sourceMappingURL=fadeObject.js.map