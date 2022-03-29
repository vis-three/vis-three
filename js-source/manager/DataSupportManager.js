import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { RendererDataSupport } from "../middleware/renderer/RendererDataSupport";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { SpriteDataSupport } from '../middleware/sprite/SpriteDataSupport';
import { EventDataSupport } from '../middleware/event/EventDataSupport';
import { LineDataSupport } from '../middleware/line/LineDataSupport';
import { MeshDataSupport } from '../middleware/mesh/MeshDataSupport';
import { PointsDataSupport } from '../middleware/points/PointsDataSupport';
import { validate } from 'uuid';
import { GroupDataSupport } from '../middleware/group/GroupDataSupport';
export class DataSupportManager {
    static register = function (module, dataSupport) {
        return DataSupportManager;
    };
    cameraDataSupport;
    lightDataSupport;
    geometryDataSupport;
    textureDataSupport;
    materialDataSupport;
    rendererDataSupport;
    sceneDataSupport;
    controlsDataSupport;
    spriteDataSupport;
    eventDataSupport;
    lineDataSupport;
    meshDataSupport;
    pointsDataSupport;
    groupDataSupport;
    dataSupportMap;
    objectDataSupportList;
    constructor(parameters) {
        this.cameraDataSupport = new CameraDataSupport();
        this.lightDataSupport = new LightDataSupport();
        this.geometryDataSupport = new GeometryDataSupport();
        this.textureDataSupport = new TextureDataSupport();
        this.materialDataSupport = new MaterialDataSupport();
        this.rendererDataSupport = new RendererDataSupport();
        this.sceneDataSupport = new SceneDataSupport();
        this.controlsDataSupport = new ControlsDataSupport();
        this.spriteDataSupport = new SpriteDataSupport();
        this.eventDataSupport = new EventDataSupport();
        this.lineDataSupport = new LineDataSupport();
        this.meshDataSupport = new MeshDataSupport();
        this.pointsDataSupport = new PointsDataSupport();
        this.groupDataSupport = new GroupDataSupport();
        this.objectDataSupportList = [];
        if (parameters) {
            Object.keys(parameters).forEach(key => {
                if (this[key] !== undefined) {
                    this[key] = parameters[key];
                    if (parameters[key].IS_OBJECTDATASUPPORT) {
                        this.objectDataSupportList.push(parameters[key]);
                    }
                }
            });
        }
        else {
            Object.keys(this).forEach(key => {
                if (typeof this[key] === 'object' && this[key].IS_OBJECTDATASUPPORT) {
                    this.objectDataSupportList.push(this[key]);
                }
            });
        }
        const dataSupportMap = new Map();
        for (let module in MODULETYPE) {
            this[`${MODULETYPE[module]}DataSupport`] && dataSupportMap.set(MODULETYPE[module], this[`${MODULETYPE[module]}DataSupport`]);
        }
        this.dataSupportMap = dataSupportMap;
    }
    getObjectDataSupportList() {
        return this.objectDataSupportList;
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
    getObjectConfig(vid) {
        if (!validate(vid)) {
            console.warn(`vid is illeage: ${vid}`);
            return null;
        }
        for (let objectDataSupport of this.objectDataSupportList) {
            const config = objectDataSupport.getConfig(vid);
            if (config) {
                return config;
            }
        }
        return null;
    }
    load(config) {
        const dataSupportMap = this.dataSupportMap;
        dataSupportMap.forEach((dataSupport, module) => {
            config[module] && dataSupport.load(config[module]);
        });
        return this;
    }
    remove(config) {
        const dataSupportMap = this.dataSupportMap;
        dataSupportMap.forEach((dataSupport, module) => {
            config[module] && dataSupport.remove(config[module]);
        });
        return this;
    }
    toJSON(extendsConfig) {
        const jsonObject = extendsConfig || {};
        const dataSupportMap = this.dataSupportMap;
        dataSupportMap.forEach((dataSupport, module) => {
            jsonObject[module] = dataSupport.getData();
        });
        return JSON.stringify(jsonObject);
    }
}
//# sourceMappingURL=DataSupportManager.js.map