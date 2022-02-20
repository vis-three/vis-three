import { Sprite, SpriteMaterial } from "three";
import { validate } from "uuid";
import { Compiler } from "../../core/Compiler";
export class SpriteCompiler extends Compiler {
    IS_OBJECTCOMPILER = true;
    target;
    scene;
    map;
    weakMap;
    materialMap;
    constructor(parametes) {
        super();
        if (parametes) {
            parametes.target && (this.target = parametes.target);
            parametes.scene && (this.scene = parametes.scene);
        }
        else {
            this.target = {};
        }
        this.map = new Map();
        this.weakMap = new WeakMap();
        this.materialMap = new Map();
    }
    getReplaceMaterial() {
        return new SpriteMaterial({
            color: 'rgb(150, 150, 150)'
        });
    }
    // 获取材质
    getMaterial(vid) {
        if (validate(vid)) {
            if (this.materialMap.has(vid)) {
                const material = this.materialMap.get(vid);
                if (material instanceof SpriteMaterial) {
                    return material;
                }
                else {
                    console.warn(`vid mapping material not instanceof SpriteMaterial. vid: ${vid}, material: ${material}`);
                    return this.getReplaceMaterial();
                }
            }
            else {
                console.warn(`can not found material which vid: ${vid}`);
                return this.getReplaceMaterial();
            }
        }
        else {
            console.warn(`material vid parameter is illegal: ${vid}`);
            return this.getReplaceMaterial();
        }
    }
    linkMaterialMap(materialMap) {
        this.materialMap = materialMap;
        return this;
    }
    getSupportVid(object) {
        if (this.weakMap.has(object)) {
            return this.weakMap.get(object);
        }
        else {
            return null;
        }
    }
    add(vid, config) {
        if (!validate(vid)) {
            console.log(`Sprite compiler vid is illeage: ${vid}`);
            return this;
        }
        const sprite = new Sprite();
        sprite.material = this.getMaterial(config.material);
        sprite.center.set(config.center.x, config.center.y);
        const tempConfig = JSON.parse(JSON.stringify(config));
        delete tempConfig.material;
        delete tempConfig.center;
        Compiler.applyConfig(tempConfig, sprite);
        this.map.set(vid, sprite);
        this.weakMap.set(sprite, vid);
        this.scene.add(sprite);
        return this;
    }
    set(vid, path, key, value) {
        if (!validate(vid)) {
            console.warn(`sprite compiler vid is illegal: '${vid}'`);
            return this;
        }
        if (!this.map.has(vid)) {
            console.warn(`sprite compiler can not found this vid mapping object: '${vid}'`);
            return this;
        }
        let sprite = this.map.get(vid);
        if (key === 'material') {
            sprite.material = this.getMaterial(vid);
            return this;
        }
        path.forEach((key, i, arr) => {
            sprite = sprite[key];
        });
        sprite[key] = value;
        return this;
    }
    remove() { }
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
//# sourceMappingURL=SpriteCompiler.js.map