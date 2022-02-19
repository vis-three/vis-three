import { CanvasTexture, CubeTexture } from "three";
import { validate } from "uuid";
import { ImageTexture } from "../../extends/texture/ImageTexture";
import { Compiler } from "../../core/Compiler";
import { CONFIGTYPE } from "../constants/configType";
export class TextureCompiler extends Compiler {
    target;
    map;
    constructMap;
    resourceMap;
    constructor(parameters) {
        super();
        if (parameters) {
            parameters.target && (this.target = parameters.target);
        }
        else {
            this.target = {};
        }
        this.map = new Map();
        this.resourceMap = new Map();
        const constructMap = new Map();
        constructMap.set(CONFIGTYPE.IMAGETEXTURE, () => new ImageTexture());
        constructMap.set(CONFIGTYPE.CUBETEXTURE, () => new CubeTexture());
        constructMap.set(CONFIGTYPE.CANVASTEXTURE, () => new CanvasTexture(document.createElement('canvas')));
        this.constructMap = constructMap;
    }
    getResource(url) {
        const resourceMap = this.resourceMap;
        if (resourceMap.has(url)) {
            const resource = resourceMap.get(url);
            if (resource instanceof HTMLImageElement || resource instanceof HTMLCanvasElement || resource instanceof HTMLVideoElement) {
                return resource;
            }
            else {
                console.error(`this url mapping resource is not a texture image class: ${url}`);
                return null;
            }
        }
        else {
            console.warn(`resource can not font url: ${url}`);
            return null;
        }
    }
    linkRescourceMap(map) {
        this.resourceMap = map;
        return this;
    }
    add(vid, config) {
        if (validate(vid)) {
            if (config.type && this.constructMap.has(config.type)) {
                const texture = this.constructMap.get(config.type)();
                const tempConfig = JSON.parse(JSON.stringify(config));
                delete tempConfig.type;
                delete tempConfig.vid;
                // 应用资源
                // 区分不同的texture类型
                if (config.type === CONFIGTYPE.IMAGETEXTURE || config.type === CONFIGTYPE.CANVASTEXTURE) {
                    texture.image = this.getResource(tempConfig.url);
                    delete tempConfig.url;
                }
                else if (config.type === CONFIGTYPE.CUBETEXTURE) {
                    const cube = config.cube;
                    const images = [
                        this.getResource(cube.px),
                        this.getResource(cube.nx),
                        this.getResource(cube.py),
                        this.getResource(cube.ny),
                        this.getResource(cube.pz),
                        this.getResource(cube.nz),
                    ];
                    texture.image = images;
                    delete tempConfig.cube;
                }
                Compiler.applyConfig(tempConfig, texture);
                texture.needsUpdate = true;
                this.map.set(vid, texture);
            }
            else {
                console.warn(`texture compiler can not support this type: ${config.type}`);
            }
        }
        else {
            console.error(`texture vid parameter is illegal: ${vid}`);
        }
        return this;
    }
    set(vid, path, key, value) {
        if (!validate(vid)) {
            console.warn(`texture compiler set function: vid is illeage: '${vid}'`);
            return this;
        }
        if (!this.map.has(vid)) {
            console.warn(`texture compiler set function: can not found texture which vid is: '${vid}'`);
            return this;
        }
        const texture = this.map.get(vid);
        if (key === 'needsUpdate') {
            if (value) {
                texture.needsUpdate = true;
                const config = this.target[vid];
                config.needsUpdate = false;
            }
            return this;
        }
        let config = texture;
        path.forEach((key, i, arr) => {
            config = config[key];
        });
        config[key] = value;
        texture.needsUpdate = true;
        return this;
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
//# sourceMappingURL=TextureCompiler.js.map