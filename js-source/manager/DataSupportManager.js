import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { ModelDataSupport } from "../middleware/model/ModelDataSupport";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { RendererDataSupport } from "../middleware/render/RendererDataSupport";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { SpriteDataSupport } from '../middleware/sprite/SpriteDataSupport';
import { EventDataSupport } from '../middleware/event/EventDataSupport';
import { LineDataSupport } from '../middleware/line/LineDataSupport';
export class DataSupportManager {
    cameraDataSupport;
    lightDataSupport;
    geometryDataSupport;
    modelDataSupport;
    textureDataSupport;
    materialDataSupport;
    rendererDataSupport;
    sceneDataSupport;
    controlsDataSupport;
    spriteDataSupport;
    eventDataSupport;
    lineDataSupport;
    dataSupportMap;
    constructor(parameters) {
        this.cameraDataSupport = new CameraDataSupport();
        this.lightDataSupport = new LightDataSupport();
        this.geometryDataSupport = new GeometryDataSupport();
        this.modelDataSupport = new ModelDataSupport();
        this.textureDataSupport = new TextureDataSupport();
        this.materialDataSupport = new MaterialDataSupport();
        this.rendererDataSupport = new RendererDataSupport();
        this.sceneDataSupport = new SceneDataSupport();
        this.controlsDataSupport = new ControlsDataSupport();
        this.spriteDataSupport = new SpriteDataSupport();
        this.eventDataSupport = new EventDataSupport();
        this.lineDataSupport = new LineDataSupport();
        if (parameters) {
            Object.keys(parameters).forEach(key => {
                this[key] = parameters[key];
            });
        }
        const dataSupportMap = new Map();
        for (let module in MODULETYPE) {
            dataSupportMap.set(MODULETYPE[module], this[`${MODULETYPE[module]}DataSupport`]);
        }
        this.dataSupportMap = dataSupportMap;
    }
    getDataSupport(type) {
        if (this.dataSupportMap.has(type)) {
            return this.dataSupportMap.get(type);
        }
        else {
            console.warn(`can not found this type in dataSupportManager: ${type}`);
            return null;
        }
    }
    getSupportData(type) {
        if (this.dataSupportMap.has(type)) {
            return this.dataSupportMap.get(type).getData();
        }
        else {
            console.warn(`can not found this type in dataSupportManager: ${type}`);
            return null;
        }
    }
    setSupportData(type, data) {
        if (this.dataSupportMap.has(type)) {
            this.dataSupportMap.get(type).setData(data);
        }
        else {
            console.warn(`can not found this type in dataSupportManager: ${type}`);
        }
        return this;
    }
    load(config) {
        const dataSupportMap = this.dataSupportMap;
        dataSupportMap.forEach((dataSupport, module) => {
            config[module] && dataSupport.load(config[module]);
        });
        return this;
    }
    toJSON() {
        const jsonObject = {};
        const dataSupportMap = this.dataSupportMap;
        dataSupportMap.forEach((dataSupport, module) => {
            jsonObject[module] = dataSupport.toJSON();
        });
        return JSON.stringify(jsonObject);
    }
}
//# sourceMappingURL=DataSupportManager.js.map