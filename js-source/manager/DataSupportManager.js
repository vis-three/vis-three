import { DataSupport } from "./../core/DataSupport";
import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { RendererDataSupport } from "../middleware/renderer/RendererDataSupport";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { SpriteDataSupport } from "../middleware/sprite/SpriteDataSupport";
import { EventDataSupport } from "../middleware/event/EventDataSupport";
import { LineDataSupport } from "../middleware/line/LineDataSupport";
import { MeshDataSupport } from "../middleware/mesh/MeshDataSupport";
import { PointsDataSupport } from "../middleware/points/PointsDataSupport";
import { GroupDataSupport } from "../middleware/group/GroupDataSupport";
import { stringify } from "../convenient/JSONHandler";
import { getConfigModuleMap } from "../utils/utils";
export class DataSupportManager {
    static configModuleMap = getConfigModuleMap();
    cameraDataSupport = new CameraDataSupport();
    lightDataSupport = new LightDataSupport();
    geometryDataSupport = new GeometryDataSupport();
    textureDataSupport = new TextureDataSupport();
    materialDataSupport = new MaterialDataSupport();
    rendererDataSupport = new RendererDataSupport();
    sceneDataSupport = new SceneDataSupport();
    controlsDataSupport = new ControlsDataSupport();
    spriteDataSupport = new SpriteDataSupport();
    eventDataSupport = new EventDataSupport();
    lineDataSupport = new LineDataSupport();
    meshDataSupport = new MeshDataSupport();
    pointsDataSupport = new PointsDataSupport();
    groupDataSupport = new GroupDataSupport();
    dataSupportMap;
    constructor(parameters) {
        if (parameters) {
            Object.keys(parameters).forEach((key) => {
                if (this[key] !== undefined) {
                    this[key] = parameters[key];
                }
            });
        }
        const dataSupportMap = new Map();
        Object.keys(this).forEach((key) => {
            const dataSupport = this[key];
            if (dataSupport instanceof DataSupport) {
                dataSupportMap.set(dataSupport.MODULE, dataSupport);
            }
        });
        this.dataSupportMap = dataSupportMap;
    }
    /**
     *
     * @deprecated - 下版本废弃 不在单独区分object dataSupport
     *
     */
    getObjectDataSupportList() {
        return [];
    }
    /**
     *
     * @deprecated - 下版本废弃 -> getConfigBySymbol
     *
     */
    getObjectConfig(vid) {
        return null;
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
    getConfigBySymbol(vid) {
        const dataSupportList = this.dataSupportMap.values();
        for (const dataSupport of dataSupportList) {
            const config = dataSupport.getConfig(vid);
            if (config) {
                return config;
            }
        }
        return null;
    }
    removeConfigBySymbol(vid) {
        const dataSupportList = this.dataSupportMap.values();
        for (const dataSupport of dataSupportList) {
            if (dataSupport.existSymbol(vid)) {
                dataSupport.removeConfig(vid);
                return;
            }
        }
    }
    getModuleBySymbol(vid) {
        const dataSupportList = this.dataSupportMap.values();
        for (const dataSupport of dataSupportList) {
            if (dataSupport.existSymbol(vid)) {
                return dataSupport.MODULE;
            }
        }
        return null;
    }
    applyConfig(config) {
        const module = DataSupportManager.configModuleMap[config.type];
        if (module) {
            this.dataSupportMap.get(module).addConfig(config);
        }
        else {
            console.warn(`dataSupportManager can not found this config module: ${config.type}`);
        }
        return this;
    }
    reactiveConfig(config) {
        const module = DataSupportManager.configModuleMap[config.type];
        if (module) {
            return this.dataSupportMap
                .get(module)
                .addConfig(config)
                .getConfig(config.vid);
        }
        else {
            console.warn(`dataSupportManager can not found this config module: ${config.type}`);
            return config;
        }
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
        return JSON.stringify(jsonObject, stringify);
    }
}
//# sourceMappingURL=DataSupportManager.js.map