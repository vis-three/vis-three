import { Color, MeshStandardMaterial, Texture } from "three";
import { validate } from "uuid";
import { Compiler } from "../../middleware/Compiler";
export class MaterialCompiler extends Compiler {
    target;
    map;
    constructMap;
    mapAttribute;
    colorAttribute;
    texturelMap;
    resourceMap;
    cachaColor;
    constructor(parameters) {
        super();
        if (parameters) {
            parameters.target && (this.target = parameters.target);
        }
        else {
            this.target = {};
        }
        this.map = new Map();
        this.texturelMap = new Map();
        this.resourceMap = new Map();
        this.cachaColor = new Color();
        const constructMap = new Map();
        constructMap.set('MeshStandardMaterial', () => new MeshStandardMaterial());
        this.constructMap = constructMap;
        this.colorAttribute = {
            'color': true,
            'emissive': true
        };
        this.mapAttribute = {
            'roughnessMap': true,
            'normalMap': true,
            'metalnessMap': true,
            'map': true,
            'lightMap': true,
            'envMap': true,
            'emissiveMap': true,
            'displacementMap': true,
            'bumpMap': true,
            'alphaMap': true,
            'aoMap': true,
        };
    }
    linkRescourceMap(map) {
        this.resourceMap = map;
        return this;
    }
    linkTextureMap(textureMap) {
        this.texturelMap = textureMap;
        return this;
    }
    add(vid, config) {
        if (validate(vid)) {
            if (config.type && this.constructMap.has(config.type)) {
                const material = this.constructMap.get(config.type)();
                const tempConfig = JSON.parse(JSON.stringify(config));
                delete tempConfig.type;
                delete tempConfig.vid;
                // 转化颜色
                const colorAttribute = this.colorAttribute;
                for (const key in colorAttribute) {
                    if (tempConfig[key]) {
                        material[key] = new Color(tempConfig[key]);
                        delete tempConfig[key];
                    }
                }
                // 应用贴图
                const mapAttribute = this.mapAttribute;
                for (const key in mapAttribute) {
                    if (tempConfig[key]) {
                        material[key] = this.getTexture(tempConfig[key]);
                        delete tempConfig[key];
                    }
                }
                // 应用属性
                Compiler.applyConfig(tempConfig, material);
                material.needsUpdate = true;
                this.map.set(vid, material);
            }
            else {
                console.warn(`material compiler can not support this type: ${config.type}`);
            }
        }
        else {
            console.error(`material vid parameter is illegal: ${vid}`);
        }
        return this;
    }
    set(vid, path, key, value) {
        if (!validate(vid)) {
            console.warn(`material compiler set function: vid is illeage: '${vid}'`);
            return this;
        }
        if (!this.map.has(vid)) {
            console.warn(`material compiler set function: can not found material which vid is: '${vid}'`);
            return this;
        }
        const material = this.map.get(vid);
        // 颜色
        if (this.colorAttribute[key]) {
            material[key] = new Color(value);
            return this;
        }
        // 贴图
        if (this.mapAttribute[key]) {
            material[key] = this.getTexture(value);
            material.needsUpdate = true;
            return this;
        }
        let config = material;
        path.forEach((key, i, arr) => {
            config = config[key];
        });
        config[key] = value;
        return this;
    }
    getTexture(vid) {
        if (this.texturelMap.has(vid)) {
            const texture = this.texturelMap.get(vid);
            if (texture instanceof Texture) {
                return texture;
            }
            else {
                console.error(`this object which mapped by vid is not instance of Texture: ${vid}`);
                return null;
            }
        }
        else {
            console.error(`texture map can not found this vid: ${vid}`);
            return null;
        }
    }
    getMap() {
        return this.map;
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
//# sourceMappingURL=MaterialCompiler.js.map