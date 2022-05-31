import { CanvasTexture, CubeTexture } from "three";
import { validate } from "uuid";
import { ImageTexture } from "../../extends/texture/ImageTexture";
import { Compiler } from "../../core/Compiler";
import { CONFIGTYPE } from "../constants/configType";
import { VideoTexture } from "../../optimize/VideoTexture";
import { CanvasGenerator } from "../../convenient/CanvasGenerator";
import { MODULETYPE } from "../constants/MODULETYPE";
export class TextureCompiler extends Compiler {
    static replaceImage = new CanvasGenerator({
        width: 512,
        height: 512,
    })
        .draw((ctx) => {
        ctx.translate(256, 256);
        ctx.font = "52px";
        ctx.fillStyle = "white";
        ctx.fillText("暂无图片", 0, 0);
    })
        .get();
    MODULE = MODULETYPE.TEXTURE;
    target = {};
    map;
    weakMap;
    constructMap;
    resourceMap;
    constructor() {
        super();
        this.map = new Map();
        this.weakMap = new WeakMap();
        this.resourceMap = new Map();
        const constructMap = new Map();
        constructMap.set(CONFIGTYPE.IMAGETEXTURE, () => new ImageTexture());
        constructMap.set(CONFIGTYPE.CUBETEXTURE, () => new CubeTexture());
        constructMap.set(CONFIGTYPE.CANVASTEXTURE, () => new CanvasTexture(document.createElement("canvas")));
        constructMap.set(CONFIGTYPE.VIDEOTEXTURE, () => new VideoTexture(document.createElement("video")));
        this.constructMap = constructMap;
    }
    getResource(url) {
        if (!url) {
            return TextureCompiler.replaceImage;
        }
        const resourceMap = this.resourceMap;
        if (resourceMap.has(url)) {
            const resource = resourceMap.get(url);
            if (resource instanceof HTMLImageElement ||
                resource instanceof HTMLCanvasElement ||
                resource instanceof HTMLVideoElement) {
                return resource;
            }
            else {
                console.error(`this url mapping resource is not a texture image class: ${url}`);
                return TextureCompiler.replaceImage;
            }
        }
        else {
            console.warn(`resource can not font url: ${url}`);
            return TextureCompiler.replaceImage;
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
                if ([
                    CONFIGTYPE.IMAGETEXTURE,
                    CONFIGTYPE.CANVASTEXTURE,
                    CONFIGTYPE.VIDEOTEXTURE,
                ].includes(config.type)) {
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
                this.weakMap.set(texture, vid);
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
        if (!path.length && key === "url") {
            const config = this.target[vid];
            if ([
                CONFIGTYPE.IMAGETEXTURE,
                CONFIGTYPE.CANVASTEXTURE,
                CONFIGTYPE.VIDEOTEXTURE,
            ].includes(config.type)) {
                texture.image = this.getResource(value);
            }
            else {
                console.warn(`texture compiler can not support this type config set url: ${config.type}`);
            }
            return this;
        }
        if (key === "needsUpdate") {
            if (value) {
                texture.needsUpdate = true;
                const config = this.target[vid];
                config.needsUpdate = false;
            }
            return this;
        }
        let config = texture;
        for (const key of path) {
            if (config[key] === undefined) {
                console.warn(`texture compiler set function: can not found key:${key} in object.`);
                return this;
            }
            config = config[key];
        }
        config[key] = value;
        texture.needsUpdate = true;
        return this;
    }
    remove(vid) {
        if (!this.map.has(vid)) {
            console.warn(`texture compiler can not found vid match object: ${vid}`);
            return this;
        }
        const texture = this.map.get(vid);
        texture.dispose();
        this.map.delete(vid);
        this.weakMap.delete(texture);
        return this;
    }
    getMap() {
        return this.map;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    useEngine(engine) {
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
        this.map.forEach((texture, vid) => {
            texture.dispose();
        });
        this.map.clear();
        return this;
    }
    getObjectSymbol(texture) {
        return this.weakMap.get(texture) || null;
    }
    getObjectBySymbol(vid) {
        return this.map.get(vid) || null;
    }
}
//# sourceMappingURL=TextureCompiler.js.map