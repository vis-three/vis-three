import { OrthographicCamera, PerspectiveCamera, Scene } from "three";
import { validate } from "uuid";
import { Compiler } from "../../middleware/Compiler";
export class CameraCompiler extends Compiler {
    target;
    scene;
    map;
    constructMap;
    constructor(parameters) {
        super();
        if (parameters) {
            parameters.target && (this.target = parameters.target);
            parameters.scene && (this.scene = parameters.scene);
        }
        else {
            this.scene = new Scene();
            this.target = {};
        }
        this.map = new Map();
        const constructMap = new Map();
        constructMap.set('PerspectiveCamera', () => new PerspectiveCamera());
        constructMap.set('OrthographicCamera', () => new OrthographicCamera());
        this.constructMap = constructMap;
    }
    add(vid, config) {
        if (validate(vid)) {
            if (config.type && this.constructMap.has(config.type)) {
                const camera = this.constructMap.get(config.type)();
                const tempConfig = JSON.parse(JSON.stringify(config));
                delete tempConfig.vid;
                delete tempConfig.type;
                Compiler.applyConfig(tempConfig, camera);
                if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
                    camera.updateProjectionMatrix();
                }
                this.map.set(vid, camera);
                this.scene.add(camera);
            }
        }
        else {
            console.error(`camera vid parameter is illegal: ${vid}`);
        }
        return this;
    }
    setScene(scene) {
        this.scene = scene;
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
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
//# sourceMappingURL=CameraCompiler.js.map