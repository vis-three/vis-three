import { Compiler } from "../../core/Compiler";
import { CONFIGTYPE } from "../constants/configType";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { Vector2 } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
export class PassCompiler extends Compiler {
    MODULE = MODULETYPE.PASS;
    target;
    map;
    weakMap;
    constructMap;
    composer;
    width = window.innerWidth * window.devicePixelRatio;
    height = window.innerHeight * window.devicePixelRatio;
    constructor() {
        super();
        this.map = new Map();
        this.weakMap = new WeakMap();
        const constructMap = new Map();
        constructMap.set(CONFIGTYPE.SMAAPASS, () => new SMAAPass(this.width, this.height));
        constructMap.set(CONFIGTYPE.UNREALBLOOMPASS, (config) => new UnrealBloomPass(new Vector2(this.width, this.height), config.strength, config.radius, config.threshold));
        this.constructMap = constructMap;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    useEngine(engine) {
        if (!engine.effectComposer) {
            console.warn(`engine need install effectComposer plugin that can use pass compiler.`);
            return this;
        }
        this.composer = engine.effectComposer;
        const pixelRatio = this.composer.renderer.getPixelRatio();
        this.width =
            Number(this.composer.renderer.domElement.getAttribute("width")) *
                pixelRatio;
        this.height =
            Number(this.composer.renderer.domElement.getAttribute("height")) *
                pixelRatio;
        return this;
    }
    add(config) {
        if (this.constructMap.has(config.type)) {
            const pass = this.constructMap.get(config.type)(config);
            this.composer.addPass(pass);
            this.map.set(config.vid, pass);
            this.weakMap.set(pass, config.vid);
        }
        else {
            console.warn(`pass compiler can not support this type pass: ${config.type}.`);
        }
    }
    set(vid, path, key, value) {
        if (!this.map.has(vid)) {
            console.warn(`pass compiler set function: can not found material which vid is: '${vid}'`);
            return this;
        }
        const pass = this.map.get(vid);
        let config = pass;
        path.forEach((key, i, arr) => {
            config = config[key];
        });
        config[key] = value;
        return this;
    }
    remove(vid) {
        if (!this.map.has(vid)) {
            console.warn(`pass compiler can not found this vid pass: ${vid}.`);
            return this;
        }
        const pass = this.map.get(vid);
        this.composer.removePass(pass);
        this.map.delete(vid);
        this.weakMap.delete(pass);
        return this;
    }
    compileAll() {
        const target = this.target;
        for (const config of Object.values(target)) {
            this.add(config);
        }
        return this;
    }
    dispose() {
        this.map.clear();
        return this;
    }
    getObjectSymbol(object) {
        return this.weakMap.get(object) || null;
    }
    getObjectBySymbol(vid) {
        return this.map.get(vid) || null;
    }
}
//# sourceMappingURL=PassCompiler.js.map