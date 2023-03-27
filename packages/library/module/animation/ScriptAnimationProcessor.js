import { AniScriptGeneratorManager, defineProcessor, } from "@vis-three/middleware";
import { getScriptAnimationConfig, } from "./AnimationConfig";
const createFunction = function (config, engine) {
    let object = engine.compilerManager.getObjectBySymbol(config.target);
    if (!object) {
        console.warn(`can not found object in enigne: ${config.target}`);
        return () => { };
    }
    const attributeList = config.attribute.split(".");
    attributeList.shift();
    const attribute = attributeList.pop();
    for (const key of attributeList) {
        if (object[key] === undefined) {
            console.warn(`animaton processor: target object can not found key: ${key}`, object);
            return () => { };
        }
        object = object[key];
    }
    return AniScriptGeneratorManager.generateScript(engine, object, attribute, config.script);
};
export default defineProcessor({
    type: "ScriptAnimation",
    config: getScriptAnimationConfig,
    commands: {
        set: {
            play({ target, engine, value }) {
                if (value) {
                    engine.renderManager.addEventListener("render", target);
                }
                else {
                    engine.renderManager.removeEventListener("render", target);
                }
            },
            $reg: [
                {
                    reg: new RegExp(".*"),
                    handler({ config, engine, compiler }) {
                        const fun = config[Symbol.for(compiler.scriptAniSymbol)];
                        engine.renderManager.removeEventListener("render", fun);
                        const newFun = createFunction(config, engine);
                        config[Symbol.for(compiler.scriptAniSymbol)] = newFun;
                        config.play && engine.renderManager.addEventListener("render", fun);
                    },
                },
            ],
        },
    },
    create(config, engine, compiler) {
        const fun = createFunction(config, engine);
        config.play && engine.renderManager.addEventListener("render", fun);
        config[Symbol.for(compiler.scriptAniSymbol)] = fun;
        return fun;
    },
    dispose() { },
});
