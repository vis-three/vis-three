import { PlaneBufferGeometry, Sprite, SpriteMaterial, } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler, } from "../solidObject/SolidObjectCompiler";
export class SpriteCompiler extends SolidObjectCompiler {
    MODULE = MODULETYPE.SPRITE;
    replaceMaterial = new SpriteMaterial({ color: "rgb(150, 150, 150)" });
    replaceGeometry = new PlaneBufferGeometry(1, 1);
    constructor() {
        super();
        this.mergeFilterAttribute({
            geometry: true,
        });
    }
    getReplaceMaterial() {
        return this.replaceMaterial;
    }
    getReplaceGeometry() {
        console.warn(`SpriteCompiler: can not use geometry in SpriteCompiler.`);
        return this.replaceGeometry;
    }
    /**
     * @override
     */
    setLookAt(vid, target) {
        return this;
    }
    /**
     * @override
     */
    getMaterial(vid) {
        const tempMaterial = super.getMaterial(vid);
        if (tempMaterial instanceof SpriteMaterial) {
            return tempMaterial;
        }
        else {
            console.warn(`SpriteCompiler: sprite object can not support this type material: ${tempMaterial.type}, vid: ${vid}.`);
            return this.getReplaceMaterial();
        }
    }
    add(vid, config) {
        const sprite = new Sprite();
        this.map.set(vid, sprite);
        this.weakMap.set(sprite, vid);
        super.add(vid, config);
        return this;
    }
    dispose() {
        this.map.forEach((sprite, vid) => {
            sprite.geometry.dispose();
        });
        super.dispose();
        this.replaceGeometry.dispose();
        this.replaceMaterial.dispose();
        return this;
    }
}
//# sourceMappingURL=SpriteCompiler.js.map