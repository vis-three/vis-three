import { COMPILER_EVENT, defineProcessor, globalAntiShake, } from "@vis-three/middleware";
import { BooleanModifier } from "@vis-three/modifier-library";
import { getBooleanModifierConfig, } from "./ModifierConfig";
const modifyKey = [
    "position.x",
    "position.y",
    "position.z",
    "rotation.x",
    "rotation.y",
    "rotation.z",
    "scale.x",
    "scale.y",
    "scale.z",
];
export default defineProcessor({
    type: "BooleanModifier",
    config: getBooleanModifierConfig,
    commands: {
        set: {
            source: () => { },
            target: ({ target: modifier, config, engine, compiler }) => {
                globalAntiShake.exec((finish) => {
                    if (config.target) {
                        const target = engine.compilerManager.getObjectBySymbol(config.target);
                        if (!target) {
                            finish &&
                                console.warn(`Boolean modifier processor can not found object by vid: ${config.target}`);
                            return false;
                        }
                        modifier.target = target;
                        const renderFun = compiler.cacheRenderFun.get(modifier);
                        if (!renderFun) {
                            console.error(`can not found cache render fun in ${compiler.MODULE} compiler`);
                            return true;
                        }
                        const oldTarget = compiler.cacheTarget.get(modifier);
                        if (oldTarget) {
                            for (const key of modifyKey) {
                                oldTarget.removeEventListener(`${COMPILER_EVENT.COMPILE}:${key}`, renderFun);
                            }
                            oldTarget.geometry.removeEventListener(`${COMPILER_EVENT.COMPILE}:update`, renderFun);
                        }
                        for (const key of modifyKey) {
                            target.addEventListener(`${COMPILER_EVENT.COMPILE}:${key}`, renderFun);
                        }
                        target.geometry.addEventListener(`${COMPILER_EVENT.COMPILE}:update`, renderFun);
                        compiler.cacheTarget.set(modifier, target);
                        renderFun();
                        return true;
                    }
                    return true;
                });
            },
            $reg: [
                {
                    reg: new RegExp(".*"),
                    handler({ value, key, target: modifier, compiler }) {
                        modifier[key] = value;
                        const renderFun = compiler.cacheRenderFun.get(modifier);
                        if (!renderFun) {
                            console.error(`can not found cache render fun in ${compiler.MODULE} compiler`);
                            return;
                        }
                        renderFun();
                    },
                },
            ],
        },
    },
    create: function (config, engine, compiler) {
        const modifier = new BooleanModifier({
            mode: config.mode,
        });
        const renderFun = () => {
            modifier.render();
            compiler.chainRender(modifier);
        };
        compiler.cacheRenderFun.set(modifier, renderFun);
        globalAntiShake.exec((finish) => {
            if (config.source) {
                const source = engine.compilerManager.getObjectBySymbol(config.source);
                if (!source) {
                    finish &&
                        console.warn(`Boolean modifier processor can not found object by vid: ${config.source}`);
                    return false;
                }
                modifier.source = source;
                for (const key of modifyKey) {
                    source.addEventListener(`${COMPILER_EVENT.COMPILE}:${key}`, renderFun);
                }
                source.geometry.addEventListener(`${COMPILER_EVENT.COMPILE}:update`, renderFun);
                compiler.integrateModifer(modifier);
                renderFun();
                return true;
            }
            return true;
        });
        globalAntiShake.exec((finish) => {
            if (config.target) {
                const target = engine.compilerManager.getObjectBySymbol(config.target);
                if (!target) {
                    finish &&
                        console.warn(`Boolean modifier processor can not found object by vid: ${config.target}`);
                    return false;
                }
                modifier.target = target;
                for (const key of modifyKey) {
                    target.addEventListener(`${COMPILER_EVENT.COMPILE}:${key}`, renderFun);
                }
                target.geometry.addEventListener(`${COMPILER_EVENT.COMPILE}:update`, renderFun);
                compiler.cacheTarget.set(modifier, target);
                renderFun();
                return true;
            }
            return true;
        });
        return modifier;
    },
    dispose: function (target, engine, compiler) {
        target.dispose();
    },
});
