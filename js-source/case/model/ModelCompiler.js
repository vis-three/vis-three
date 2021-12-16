import { BoxBufferGeometry, Line, Mesh, MeshStandardMaterial, Points, Scene } from "three";
import { validate } from "uuid";
import { Compiler, COMPILEREVENTTYPE } from "../../middleware/Compiler";
export class ModelCompiler extends Compiler {
    scene;
    target;
    map;
    constructMap;
    geometryMap;
    materialMap;
    getReplaceMaterial;
    getReplaceGeometry;
    constructor(parameters) {
        super();
        if (parameters) {
            parameters.scene && (this.scene = parameters.scene);
            parameters.target && (this.target = parameters.target);
            parameters.geometryMap && (this.geometryMap = parameters.geometryMap);
            parameters.materialMap && (this.materialMap = parameters.materialMap);
        }
        else {
            this.scene = new Scene();
            this.target = {};
            this.geometryMap = new Map();
            this.materialMap = new Map();
        }
        this.map = new Map();
        this.getReplaceMaterial = () => new MeshStandardMaterial({ color: 'rgb(150, 150, 150)' });
        this.getReplaceGeometry = () => new BoxBufferGeometry(10, 10, 10);
        const constructMap = new Map();
        constructMap.set('Mesh', (config) => new Mesh(this.getGeometry(config.geometry), this.getMaterial(config.material)));
        constructMap.set('Line', (config) => new Line(this.getGeometry(config.geometry), this.getMaterial(config.material)));
        constructMap.set('Points', (config) => new Points(this.getGeometry(config.geometry), this.getMaterial(config.material)));
        this.constructMap = constructMap;
    }
    add(vid, config) {
        if (validate(vid)) {
            if (config.type && this.constructMap.has(config.type)) {
                const object = this.constructMap.get(config.type)(config);
                const tempConfig = JSON.parse(JSON.stringify(config));
                delete tempConfig.vid;
                delete tempConfig.type;
                delete tempConfig.geometry;
                delete tempConfig.material;
                Compiler.applyConfig(tempConfig, object);
                this.map.set(vid, object);
                this.dispatchEvent({
                    type: COMPILEREVENTTYPE.ADD,
                    object,
                    vid
                });
                this.scene.add(object);
            }
        }
        else {
            console.error(`model vid parameter is illegal: ${vid}`);
        }
        return this;
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
            console.error(`vid parameter is illegal: ${vid} or can not found this vid model`);
        }
    }
    remove() { }
    getMaterial(vid) {
        if (validate(vid)) {
            if (this.materialMap.has(vid)) {
                return this.materialMap.get(vid);
            }
            else {
                console.warn(`can not found material which vid: ${vid}`);
                return this.getReplaceMaterial();
            }
        }
        else {
            console.error(`material vid parameter is illegal: ${vid}`);
            return this.getReplaceMaterial();
        }
    }
    getGeometry(vid) {
        if (validate(vid)) {
            if (this.geometryMap.has(vid)) {
                return this.geometryMap.get(vid);
            }
            else {
                console.warn(`can not found geometry which vid: ${vid}`);
                return this.getReplaceGeometry();
            }
        }
        else {
            console.error(`geometry vid parameter is illegal: ${vid}`);
            return this.getReplaceGeometry();
        }
    }
    linkGeometryMap(map) {
        this.geometryMap = map;
        return this;
    }
    linkMaterialMap(materialMap) {
        this.materialMap = materialMap;
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
//# sourceMappingURL=ModelCompiler.js.map