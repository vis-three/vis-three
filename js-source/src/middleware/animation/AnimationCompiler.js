import { Compiler } from "../../core/Compiler";
import { AniScriptLibrary } from "../../main";
import { CONFIGTYPE } from "../constants/configType";
export class AnimationCompiler extends Compiler {
    target = {};
    engine;
    objectMapSet = new Set();
    scriptAniSymbol = "vis.scriptAni";
    constructor() {
        super();
    }
    linkObjectMap(...map) {
        for (const objectMap of map) {
            if (!this.objectMapSet.has(objectMap)) {
                this.objectMapSet.add(objectMap);
            }
        }
        return this;
    }
    linkTextureMap(textureMap) {
        this.objectMapSet.add(textureMap);
        return this;
    }
    linkMaterialMap(materialMap) {
        this.objectMapSet.add(materialMap);
        return this;
    }
    getObject(vid) {
        for (const map of this.objectMapSet) {
            if (map.has(vid)) {
                return map.get(vid);
            }
        }
        console.error(`animation compiler can not found object which vid: ${vid}`);
        return {};
    }
    add(vid, config) {
        const renderManager = this.engine.renderManager;
        let object = this.getObject(config.target);
        const attributeList = config.attribute.split(".");
        attributeList.shift();
        const attribute = attributeList.pop();
        for (const key of attributeList) {
            if (object[key] === undefined) {
                console.error(`animaton compiler: target object can not found key: ${key}`, object);
                break;
            }
            object = object[key];
        }
        if (config.type === CONFIGTYPE.SCRIPTANIMATION) {
            const fun = AniScriptLibrary.generateScript(this.engine, object, attribute, config.script);
            config[Symbol.for(this.scriptAniSymbol)] = fun;
            renderManager.addEventListener("render", fun);
        }
        else {
            console.warn(`animation compiler can not support this type config: ${config.type}`);
        }
        return this;
    }
    update(vid) {
        return this.remove(vid).add(vid, this.target[vid]);
    }
    remove(vid) {
        const config = this.target[vid];
        if (!config) {
            console.warn(`animation compiler can not found config with vid: ${vid}`);
            return this;
        }
        if (config.type === CONFIGTYPE.SCRIPTANIMATION) {
            this.engine.renderManager.removeEventListener("render", config[Symbol.for(this.scriptAniSymbol)]);
        }
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    useEngine(engine) {
        this.engine = engine;
        return this;
    }
    compileAll() {
        for (const config of Object.values(this.target)) {
            this.add(config.vid, config);
        }
        return this;
    }
    dispose(parameter) {
        for (const config of Object.values(this.target)) {
            this.remove(config.vid);
        }
        return this;
    }
}
//# sourceMappingURL=AnimationCompiler.js.map