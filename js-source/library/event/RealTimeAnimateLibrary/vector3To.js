import { Tween } from "@tweenjs/tween.js";
import { timeingFunction, TIMEINGFUNCTION } from "./common";
export const config = {
    name: "vector3To",
    params: {
        target: "",
        attribute: ".position",
        props: {
            x: "x",
            y: "y",
            z: "z",
        },
        delay: 0,
        duration: 500,
        to: {},
        timingFunction: TIMEINGFUNCTION.EQI,
    },
};
export const generator = function (engine, config) {
    const params = config.params;
    const object = engine.compilerManager.getObjectBySymbol(params.target);
    if (!object) {
        console.error(`real time animation vector3To: can not found vid object: ${params.target}`);
        return () => { };
    }
    const renderManager = engine.renderManager;
    let supportData = engine.dataSupportManager.getConfigBySymbol(params.target);
    if (!supportData) {
        console.error(`real time animation vector3To: can not found object config: ${params.target}`);
        return () => { };
    }
    const attributeList = params.attribute.split(".");
    attributeList.shift();
    let targetObject = object;
    for (const key of attributeList) {
        if (targetObject[key] === undefined) {
            console.error(`real time animation vector3To: object can not support key: ${key}`, object);
            return () => { };
        }
        targetObject = targetObject[key];
        supportData = supportData[key];
    }
    // 检测属性
    const props = params.props;
    if (!(props.x in targetObject) ||
        !(props.y in targetObject) ||
        !(props.z in targetObject)) {
        console.error(`real time animation vector3To: object can not support props:`, targetObject, props);
        return () => { };
    }
    if (!(props.x in supportData) ||
        !(props.y in supportData) ||
        !(props.z in supportData)) {
        console.error(`real time animation vector3To: config can not support props:`, supportData, props);
        return () => { };
    }
    const toObject = {
        x: params.to.x ?? targetObject[props.x],
        y: params.to.y ?? targetObject[props.y],
        z: params.to.z ?? targetObject[props.z],
    };
    return () => {
        const tween = new Tween(targetObject)
            .to(toObject)
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
            supportData[props.x] = toObject.x;
            supportData[props.y] = toObject.y;
            supportData[props.z] = toObject.z;
        });
    };
};
//# sourceMappingURL=vector3To.js.map