import { defineProcessor } from "../../../core/Processor";
import { AniScriptLibrary } from "../../../library/aniScript/AniScriptLibrary";
import { CONFIGTYPE } from "../../constants/configType";
import { scriptAniSymbol } from "./common";
const createFunction = function (config, engine) {
    let object = engine.compilerManager.getObjectBySymbol(config.target);
    if (!object) {
        console.error(`can not found object in enigne: ${config.target}`);
        () => { };
    }
    const attributeList = config.attribute.split(".");
    attributeList.shift();
    const attribute = attributeList.pop();
    for (const key of attributeList) {
        if (object[key] === undefined) {
            console.error(`animaton processor: target object can not found key: ${key}`, object);
            return () => { };
        }
        object = object[key];
    }
    return AniScriptLibrary.generateScript(engine, object, attribute, config.script);
};
export default defineProcessor({
    configType: CONFIGTYPE.SCRIPTANIMATION,
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
                    handler({ config, engine }) {
                        const fun = config[Symbol.for(scriptAniSymbol)];
                        engine.renderManager.removeEventListener("render", fun);
                        const newFun = createFunction(config, engine);
                        config[Symbol.for(scriptAniSymbol)] = newFun;
                        config.play && engine.renderManager.addEventListener("render", fun);
                    },
                },
            ],
        },
    },
    create(config, engine) {
        const fun = createFunction(config, engine);
        config.play && engine.renderManager.addEventListener("render", fun);
        config[Symbol.for(scriptAniSymbol)] = fun;
        return fun;
    },
    dispose() { },
});
//# sourceMappingURL=ScriptAnimationProcessor.js.map