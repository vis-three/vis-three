import { CSS3DObject, CSS3DSprite, } from "three/examples/jsm/renderers/CSS3DRenderer";
import { CSS3DPlane } from "../../optimize/CSS3DPlane";
import { CONFIGTYPE } from "../constants/configType";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
export class CSS3DCompiler extends ObjectCompiler {
    MODULE = MODULETYPE.CSS3D;
    resourceMap;
    constructMap;
    constructor() {
        super();
        this.constructMap = new Map();
        this.resourceMap = new Map();
        this.constructMap.set(CONFIGTYPE.CSS3DOBJECT, (config) => new CSS3DObject(this.getElement(config.element)));
        this.constructMap.set(CONFIGTYPE.CSS3DPLANE, (config) => new CSS3DPlane(this.getElement(config.element)));
        this.constructMap.set(CONFIGTYPE.CSS3DSPRITE, (config) => new CSS3DSprite(this.getElement(config.element)));
        this.mergeFilterAttribute({
            element: true,
            interactive: true,
        });
    }
    getElement(element) {
        if (!this.resourceMap.has(element)) {
            console.warn(`css3D compiler: can not found resource element: ${element}`);
            return document.createElement("div");
        }
        const resource = this.resourceMap.get(element);
        if (resource instanceof HTMLElement) {
            return resource;
        }
        else {
            console.warn(`css3D compiler can not suport render this resource type.`, resource.constructor, element);
            return document.createElement("div");
        }
    }
    linkRescourceMap(map) {
        this.resourceMap = map;
        return this;
    }
    add(vid, config) {
        if (config.type && this.constructMap.has(config.type)) {
            const css3d = this.constructMap.get(config.type)(config);
            css3d.type = config.type;
            this.map.set(vid, css3d);
            this.weakMap.set(css3d, vid);
            super.add(vid, config);
        }
        else {
            console.warn(`css3D compiler can not support this type: ${config.type}`);
        }
        return this;
    }
    set(vid, path, key, value) {
        if (!this.map.has(vid)) {
            console.warn(`css3D compiler: can not found this vid mapping object: '${vid}'`);
            return this;
        }
        const object = this.map.get(vid);
        if (key === "element") {
            object.element = this.getElement(value);
            return this;
        }
        super.set(vid, path, key, value);
        return this;
    }
}
//# sourceMappingURL=CSS3DCompiler.js.map