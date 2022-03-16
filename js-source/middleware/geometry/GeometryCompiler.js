import { BoxBufferGeometry, BufferGeometry, Euler, Matrix4, Quaternion, SphereBufferGeometry, Vector3 } from "three";
import { validate } from "uuid";
import { LoadGeometry } from "../../extends/geometry/LoadGeometry";
import { Compiler } from "../../core/Compiler";
export class GeometryCompiler extends Compiler {
    // 变换锚点
    static transfromAnchor = function (geometry, config) {
        geometry.center();
        !geometry.boundingBox && geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const position = config.position;
        const rotation = config.rotation;
        const scale = config.scale;
        const materix = new Matrix4();
        const vPostion = new Vector3((box.max.x - box.min.x) / 2 * position.x, (box.max.y - box.min.y) / 2 * position.y, (box.max.z - box.min.z) / 2 * position.z);
        const quaternion = new Quaternion().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z, 'XYZ'));
        const vScale = new Vector3(scale.x, scale.y, scale.z);
        materix.compose(vPostion, quaternion, vScale);
        geometry.applyMatrix4(materix);
        return geometry;
    };
    target;
    map;
    constructMap;
    resourceMap;
    replaceGeometry;
    constructor(parameters) {
        super();
        this.target = parameters.target;
        this.map = new Map();
        const constructMap = new Map();
        constructMap.set('BoxGeometry', (config) => {
            return GeometryCompiler.transfromAnchor(new BoxBufferGeometry(config.width, config.height, config.depth, config.widthSegments, config.heightSegments, config.depthSegments), config);
        });
        constructMap.set('SphereGeometry', (config) => {
            return GeometryCompiler.transfromAnchor(new SphereBufferGeometry(config.radius, config.widthSegments, config.heightSegments, config.phiStart, config.phiLength, config.thetaStart, config.thetaLength), config);
        });
        constructMap.set('LoadGeometry', (config) => {
            return GeometryCompiler.transfromAnchor(new LoadGeometry(this.getRescource(config.url)), config);
        });
        this.constructMap = constructMap;
        this.resourceMap = new Map();
        this.replaceGeometry = new BoxBufferGeometry(10, 10, 10);
    }
    linkRescourceMap(map) {
        this.resourceMap = map;
        return this;
    }
    getRescource(url) {
        if (!this.resourceMap.has(url)) {
            console.error(`rescoure can not found url: ${url}`);
            return this.replaceGeometry.clone();
        }
        if (this.resourceMap.has(url) && this.resourceMap.get(url) instanceof BufferGeometry) {
            const geometry = this.resourceMap.get(url);
            return geometry.clone();
        }
        else {
            console.error(`url mapping rescource is not class with BufferGeometry: ${url}`);
            return this.replaceGeometry.clone();
        }
    }
    getMap() {
        return this.map;
    }
    setTarget() {
        return this;
    }
    add(vid, config) {
        if (config.type && this.constructMap.has(config.type)) {
            const geometry = this.constructMap.get(config.type)(config);
            this.map.set(vid, geometry);
        }
        return this;
    }
    // 几何的set是重新生成几何然后clone或者copy
    set(vid, path, value) {
        if (!validate(vid)) {
            console.warn(`geometry compiler set function vid parameters is illeage: '${vid}'`);
            return this;
        }
        if (!this.map.has(vid)) {
            console.warn(`geometry compiler set function can not found vid geometry: '${vid}'`);
            return this;
        }
        const currentGeometry = this.map.get(vid);
        const config = this.target[vid];
        const newGeometry = this.constructMap.get(config.type)(config);
        currentGeometry.copy(newGeometry);
        // 辅助的更新根据uuid的更新而更新，直接copy无法判断是否更新
        currentGeometry.uuid = newGeometry.uuid;
        newGeometry.dispose();
        return this;
    }
    remove(vid) {
        if (!this.map.has(vid)) {
            console.warn(`Geometry Compiler: can not found vid in compiler: ${vid}`);
            return this;
        }
        const geometry = this.map.get(vid);
        geometry.dispose();
        this.map.delete(vid);
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
        this.map.forEach((geometry, vid) => {
            geometry.dispose();
        });
        return this;
    }
}
//# sourceMappingURL=GeometryCompiler.js.map