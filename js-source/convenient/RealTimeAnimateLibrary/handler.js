import { Tween } from "@tweenjs/tween.js";
export const moveTo = function (compiler, config) {
    const params = config.params;
    let object = compiler.getObject(params.target);
    if (!object) {
        console.error(`can not found vid object: ${params.target}`);
        return () => { };
    }
    let renderManager = compiler.engine.renderManager;
    // 同步配置
    const supportData = compiler.engine.dataSupportManager.getObjectConfig(params.target);
    if (!config) {
        console.error(`can not found object config: ${params.target}`);
        return () => { };
    }
    return () => {
        const tween = new Tween(object.position)
            .to(params.position)
            .duration(params.duration)
            .delay(params.delay)
            .easing(params.timingFunction)
            .start();
        const renderFun = (event) => {
            tween.update();
        };
        renderManager.addEventListener('render', renderFun);
        tween.onComplete(() => {
            renderManager.removeEventListener('render', renderFun);
            supportData.position.x = params.position.x;
            supportData.position.y = params.position.y;
            supportData.position.z = params.position.z;
        });
    };
};
export const moveSpacing = function (compiler, config) {
    const params = config.params;
    let object = compiler.getObject(params.target);
    if (!object) {
        console.error(`can not found vid object: ${params.target}`);
        return () => { };
    }
    let renderManager = compiler.engine.renderManager;
    // 同步配置
    const supportData = compiler.engine.dataSupportManager.getObjectConfig(params.target);
    return () => {
        let position = {
            x: object.position.x + params.spacing.x,
            y: object.position.y + params.spacing.y,
            z: object.position.z + params.spacing.z,
        };
        const tween = new Tween(object.position)
            .to(position)
            .duration(params.duration)
            .delay(params.delay)
            .easing(params.timingFunction)
            .start();
        const renderFun = (event) => {
            tween.update();
        };
        renderManager.addEventListener('render', renderFun);
        tween.onComplete(() => {
            renderManager.removeEventListener('render', renderFun);
            supportData.position.x = position.x;
            supportData.position.y = position.y;
            supportData.position.z = position.z;
        });
    };
};
//# sourceMappingURL=handler.js.map