import { AmbientLight, BufferGeometry, Color, Material, PointLight, SpotLight } from "three";
import { Compiler } from "../../core/Compiler";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
export class LightCompiler extends ObjectCompiler {
    COMPILER_NAME = MODULETYPE.LIGHT;
    constructMap;
    filterAttribute;
    replaceMaterial = new Material();
    replaceGeometry = new BufferGeometry();
    constructor(parameters) {
        super(parameters);
        this.constructMap = new Map();
        this.constructMap.set('PointLight', () => new PointLight());
        this.constructMap.set('SpotLight', () => new SpotLight());
        this.constructMap.set('AmbientLight', () => new AmbientLight());
        this.setLookAt = function (vid, target) {
            return this;
        };
        this.filterAttribute = {
            scale: true,
            rotation: true,
            lookAt: true
        };
    }
    getReplaceMaterial() {
        console.warn(`LightCompiler: can not use material in LightCompiler.`);
        return this.replaceMaterial;
    }
    getReplaceGeometry() {
        console.warn(`LightCompiler: can not use geometry in LightCompiler.`);
        return this.replaceGeometry;
    }
    add(vid, config) {
        if (config.type && this.constructMap.has(config.type)) {
            const light = this.constructMap.get(config.type)();
            Compiler.applyConfig(config, light, this.filterAttribute);
            light.color = new Color(config.color);
            this.map.set(vid, light);
            this.weakMap.set(light, vid);
            this.scene.add(light);
        }
        else {
            console.warn(`LightCompiler: can not support Light type: ${config.type}.`);
        }
        return this;
    }
    set(vid, path, key, value) {
        if (!this.map.has(vid)) {
            console.warn(`LightCompiler: can not found this vid mapping object: '${vid}'`);
            return this;
        }
        if (this.filterAttribute[key]) {
            return this;
        }
        let object = this.map.get(vid);
        if (key === 'color') {
            object.color = new Color(value);
            return this;
        }
        for (let key of path) {
            if (this.filterAttribute[key]) {
                return this;
            }
            object = object[key];
        }
        object[key] = value;
        return this;
    }
    dispose() {
        super.dispose();
        this.replaceGeometry.dispose();
        this.replaceMaterial.dispose();
        return this;
    }
}
//# sourceMappingURL=LightCompiler.js.map