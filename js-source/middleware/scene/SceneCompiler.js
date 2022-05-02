import { Color, Fog, FogExp2, Scene } from "three";
import { validate } from "uuid";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
export class SceneCompiler extends ObjectCompiler {
    COMPILER_NAME = MODULETYPE.SCENE;
    textureMap;
    fogCache;
    constructor() {
        super();
        this.textureMap = new Map();
        this.fogCache = null;
        this.mergeFilterAttribute({
            background: true,
            environment: true,
            fog: true,
        });
    }
    /**
     * @override
     */
    setLookAt(vid, target) {
        return this;
    }
    background(vid, value) {
        if (!this.map.has(vid)) {
            console.warn(`${this.COMPILER_NAME} compiler can not found this vid mapping object: '${vid}'`);
            return;
        }
        const scene = this.map.get(vid);
        if (!value) {
            scene.background = null;
            return;
        }
        if (validate(value)) {
            if (this.textureMap.has(value)) {
                scene.background = this.textureMap.get(value);
            }
            else {
                console.warn(`scene compiler can not found this vid texture : '${value}'`);
            }
        }
        else {
            scene.background = new Color(value);
        }
    }
    environment(vid, value) {
        if (!this.map.has(vid)) {
            console.warn(`${this.COMPILER_NAME} compiler can not found this vid mapping object: '${vid}'`);
            return;
        }
        const scene = this.map.get(vid);
        if (!value) {
            scene.environment = null;
            return;
        }
        if (validate(value)) {
            if (this.textureMap.has(value)) {
                scene.environment = this.textureMap.get(value);
            }
            else {
                console.warn(`scene compiler can not found this vid texture : '${value}'`);
            }
        }
        else {
            console.warn(`this vid is illegal: '${value}'`);
        }
    }
    fog(vid, config) {
        if (!this.map.has(vid)) {
            console.warn(`${this.COMPILER_NAME} compiler can not found this vid mapping object: '${vid}'`);
            return;
        }
        const scene = this.map.get(vid);
        if (config.type === "") {
            this.fogCache = null;
            scene.fog = null;
            return;
        }
        if (config.type === "Fog") {
            if (this.fogCache instanceof Fog) {
                const fog = this.fogCache;
                fog.color = new Color(config.color);
                fog.near = config.near;
                fog.far = config.far;
            }
            else {
                scene.fog = new Fog(config.color, config.near, config.far);
                this.fogCache = scene.fog;
            }
            return;
        }
        if (config.type === "FogExp2") {
            if (this.fogCache instanceof FogExp2) {
                const fog = this.fogCache;
                fog.color = new Color(config.color);
                fog.density = config.density;
            }
            else {
                scene.fog = new FogExp2(config.color, config.density);
                this.fogCache = scene.fog;
            }
            return;
        }
        console.warn(`scene compiler can not support this type fog:'${config.type}'`);
    }
    linkTextureMap(map) {
        this.textureMap = map;
        return this;
    }
    add(vid, config) {
        const scene = new Scene();
        this.map.set(vid, scene);
        this.weakMap.set(scene, vid);
        this.background(vid, config.background);
        this.environment(vid, config.environment);
        this.fog(vid, config.fog);
        super.add(vid, config);
        return this;
    }
    set(vid, path, key, value) {
        if (!this.map.has(vid)) {
            console.warn(`sceneCompiler: can not found this vid mapping object: '${vid}'`);
            return this;
        }
        const attribute = path.length ? path[0] : key;
        const actionMap = {
            background: () => this.background(vid, value),
            environment: () => this.environment(vid, value),
            fog: () => this.fog(vid, this.target[vid].fog),
        };
        if (actionMap[attribute]) {
            actionMap[attribute]();
            return this;
        }
        super.set(vid, path, key, value);
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    dispose() {
        super.dispose();
        return this;
    }
}
//# sourceMappingURL=SceneCompiler.js.map