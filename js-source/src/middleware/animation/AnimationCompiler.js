import { Compiler } from "../../core/Compiler";
import { AniScriptLibrary } from "../../library/aniScript/AniScriptLibrary";
import { CONFIGTYPE } from "../constants/configType";
import { MODULETYPE } from "../constants/MODULETYPE";
export class AnimationCompiler extends Compiler {
    MODULE = MODULETYPE.ANIMATION;
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
            config.play && renderManager.addEventListener("render", fun);
        }
        else {
            console.warn(`animation compiler can not support this type config: ${config.type}`);
        }
        return this;
    }
    update(vid, path, key, value) {
        if (!this.target[vid]) {
            console.warn(`AnimationCompiler can not found vid config: ${vid}`);
            return this;
        }
        const config = this.target[vid];
        if (config.type === CONFIGTYPE.SCRIPTANIMATION) {
            const renderManager = this.engine.renderManager;
            const fun = config[Symbol.for(this.scriptAniSymbol)];
            if (fun === undefined) {
                console.warn(`AnimationCompiler can not found function in update fun: ${vid}`);
                return this;
            }
            if (key === "play" && value) {
                if (!renderManager.hasEventListener("render", fun)) {
                    renderManager.addEventListener("render", fun);
                }
                return this;
            }
            if (key === "play" && !value) {
                renderManager.removeEventListener("render", fun);
                return this;
            }
        }
        return this.remove(this.target[vid]).add(vid, this.target[vid]);
    }
    remove(config) {
        if (config.type === CONFIGTYPE.SCRIPTANIMATION) {
            this.engine.renderManager.removeEventListener("render", config[Symbol.for(this.scriptAniSymbol)]);
            // remove之后把当前的属性归位
            let objectConfig = this.engine.getConfigBySymbol(config.target);
            if (!objectConfig) {
                console.warn(`AnimationCompiler can not found vid object: ${config.target}`);
                return this;
            }
            const attributeList = config.attribute.split(".");
            attributeList.shift();
            const attribute = attributeList.pop();
            for (const key of attributeList) {
                if (objectConfig[key] === undefined) {
                    console.warn(`animaton compiler: target object can not found key: ${key}`, objectConfig);
                    return this;
                }
                objectConfig = objectConfig[key];
            }
            objectConfig[attribute] = objectConfig[attribute];
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
            this.remove(config);
        }
        return this;
    }
    getObjectSymbol(animation) {
        return null;
    }
    getObjectBySymbol(vid) {
        return null;
    }
}
//# sourceMappingURL=AnimationCompiler.js.map