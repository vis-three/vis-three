import { OrthographicCamera, PerspectiveCamera, Scene } from "three";
import { validate } from "uuid";
import { Compiler, COMPILEREVENTTYPE } from "../../middleware/Compiler";
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
                this.dispatchEvent({
                    type: COMPILEREVENTTYPE.ADD,
                    object: camera,
                    vid
                });
                this.scene.add(camera);
            }
        }
        else {
            console.error(`camera vid parameter is illegal: ${vid}`);
        }
        return this;
    }
    set(vid, path, key, value) {
        if (!validate(vid)) {
            console.warn(`camera compiler set function vid parameters is illeage: '${vid}'`);
            return this;
        }
        if (!this.map.has(vid)) {
            console.warn(`geometry compiler set function can not found vid geometry: '${vid}'`);
            return this;
        }
        const camera = this.map.get(vid);
        let config = camera;
        path.forEach((key, i, arr) => {
            config = camera[key];
        });
        config[key] = value;
        // TODO: 根据特点属性update
        if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
            camera.updateProjectionMatrix();
        }
        return this;
    }
    // TODO:
    remove() { }
    setScene(scene) {
        this.scene = scene;
        return this;
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
//# sourceMappingURL=CameraCompiler.js.map