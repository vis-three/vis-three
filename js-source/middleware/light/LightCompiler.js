import { AmbientLight, Color, DirectionalLight, PointLight, SpotLight, } from "three";
import { ObjectCompiler, } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { CONFIGTYPE } from "../constants/configType";
export class LightCompiler extends ObjectCompiler {
    COMPILER_NAME = MODULETYPE.LIGHT;
    constructMap;
    constructor(parameters) {
        super(parameters);
        this.constructMap = new Map();
        this.constructMap.set(CONFIGTYPE.POINTLIGHT, () => new PointLight());
        this.constructMap.set(CONFIGTYPE.SPOTLIGHT, () => new SpotLight());
        this.constructMap.set(CONFIGTYPE.AMBIENTLIGHT, () => new AmbientLight());
        this.constructMap.set(CONFIGTYPE.DIRECTIONALLIGHT, () => new DirectionalLight());
        this.mergeFilterAttribute({
            scale: true,
            rotation: true,
        });
    }
    setLookAt(vid, target) {
        return this;
    }
    add(vid, config) {
        if (config.type && this.constructMap.has(config.type)) {
            const light = this.constructMap.get(config.type)();
            light.color = new Color(config.color);
            this.map.set(vid, light);
            this.weakMap.set(light, vid);
            super.add(vid, config);
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
        const object = this.map.get(vid);
        if (key === "color") {
            object.color = new Color(value);
            return this;
        }
        super.set(vid, path, key, value);
        return this;
    }
    dispose() {
        super.dispose();
        return this;
    }
}
//# sourceMappingURL=LightCompiler.js.map