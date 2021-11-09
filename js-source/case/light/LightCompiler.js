import { PointLight, SpotLight } from "three";
import { Compiler } from "../../middleware/Compiler";
import { validate } from "uuid";
export class LightCompiler extends Compiler {
    scene;
    target;
    map;
    constructMap;
    constructor(parameters) {
        super();
        this.scene = parameters.scene;
        this.target = parameters.target;
        this.map = new Map();
        this.constructMap = new Map();
        this.constructMap.set('PointLight', () => new PointLight());
        this.constructMap.set('SpotLight', () => new SpotLight());
    }
    add(vid, config) {
        if (validate(vid)) {
            if (config.type && this.constructMap.has(config.type)) {
                const light = this.constructMap.get(config.type)();
                Compiler.applyConfig(config, light);
                this.map.set(vid, light);
                this.scene.add(light);
            }
        }
        else {
            console.error(`vid parameter is illegal: ${vid}`);
        }
    }
    compileAll() {
        const target = this.target;
        for (const key in target) {
            this.add(key, target[key]);
        }
        return this;
    }
    dispose() {
        return this;
    }
}
//# sourceMappingURL=LightCompiler.js.map