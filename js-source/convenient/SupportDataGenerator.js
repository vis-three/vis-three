import { CONFIGTYPE } from "../case/constants/configType";
import { MODULETYPE } from "../case/constants/MODULETYPE";
import { generateConfig } from "./generateConfig";
export class SupportDataGenerator {
    static dataTypeMap = {
        [CONFIGTYPE.IMAGETEXTURE]: MODULETYPE.TEXTURE,
        [CONFIGTYPE.MESHSTANDARDMATERIAL]: MODULETYPE.MATERIAL,
        [CONFIGTYPE.AMBIENTLIGHT]: MODULETYPE.LIGHT,
        [CONFIGTYPE.SPOTLIGHT]: MODULETYPE.LIGHT,
        [CONFIGTYPE.POINTLIGHT]: MODULETYPE.LIGHT,
        [CONFIGTYPE.BOXGEOMETRY]: MODULETYPE.GEOMETRY,
        [CONFIGTYPE.SPHEREGEOMETRY]: MODULETYPE.GEOMETRY,
        [CONFIGTYPE.LOADGEOMETRY]: MODULETYPE.GEOMETRY,
        [CONFIGTYPE.MODEL]: MODULETYPE.MODEL,
        [CONFIGTYPE.MESH]: MODULETYPE.MODEL,
        [CONFIGTYPE.LINE]: MODULETYPE.MODEL,
        [CONFIGTYPE.POINTS]: MODULETYPE.MODEL,
        [CONFIGTYPE.PERSPECTIVECAMERA]: MODULETYPE.CAMERA,
        [CONFIGTYPE.ORTHOGRAPHICCAMERA]: MODULETYPE.CAMERA,
        [CONFIGTYPE.WEBGLRENDERER]: MODULETYPE.RENDERER,
        [CONFIGTYPE.SCENE]: MODULETYPE.SCENE,
        [CONFIGTYPE.TRNASFORMCONTROLS]: MODULETYPE.CONTROLS
    };
    supportData;
    supportDataType;
    constructor() { }
    create(type) {
        if (!type) {
            console.warn('you must give a module type in create params');
            return this;
        }
        this.supportData = {};
        this.supportDataType = type;
        return this;
    }
    add(config) {
        if (!this.supportData || !this.supportDataType) {
            console.warn(`you must call 'create' method before the 'add' method`);
            return this;
        }
        if (!config.type) {
            console.warn(`config can not found attribute 'type'`);
            return this;
        }
        if (SupportDataGenerator.dataTypeMap[config.type] !== this.supportDataType) {
            console.warn(`current generator create config which module is in: ${this.supportDataType}, but you provide type is '${config.type}'`);
            return this;
        }
        this.supportData[config.vid] = generateConfig(config.type, config);
        return this;
    }
    get() {
        this.supportDataType = undefined;
        if (this.supportData) {
            return this.supportData;
        }
        else {
            return {};
        }
    }
}
//# sourceMappingURL=SupportDataGenerator.js.map