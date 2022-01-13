import { AmbientLight, Color, PointLight, SpotLight } from "three";
import { Compiler, COMPILEREVENTTYPE } from "../../middleware/Compiler";
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
        this.constructMap.set('AmbientLight', () => new AmbientLight());
    }
    add(vid, config) {
        if (validate(vid)) {
            if (config.type && this.constructMap.has(config.type)) {
                const light = this.constructMap.get(config.type)();
                Compiler.applyConfig(config, light);
                light.color = new Color(config.color);
                this.map.set(vid, light);
                this.dispatchEvent({
                    type: COMPILEREVENTTYPE.ADD,
                    object: light,
                    vid
                });
                this.scene.add(light);
            }
        }
        else {
            console.error(`vid parameter is illegal: ${vid}`);
        }
    }
    set(path, key, value) {
        const vid = path.shift();
        if (validate(vid) && this.map.has(vid)) {
            let config = this.map.get(vid);
            path.forEach((key, i, arr) => {
                config = config[key];
            });
            config[key] = value;
        }
        else {
            console.error(`vid parameter is illegal: ${vid} or can not found this vid light`);
        }
    }
    remove() {
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    getMap() {
        return this.map;
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