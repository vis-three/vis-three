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
import { LineDataSupport } from "../middleware/line/LineDataSupport";
import { MeshDataSupport } from "../middleware/mesh/MeshDataSupport";
import { PointsDataSupport } from "../middleware/points/PointsDataSupport";
import { GroupDataSupport } from "../middleware/group/GroupDataSupport";
import { stringify } from "../convenient/JSONHandler";
import { PassDataSupport } from "../middleware/pass/PassDataSupport";
import { CONFIGMODULE } from "../middleware/constants/CONFIGMODULE";
export class DataSupportManager {
    static configModuleMap = CONFIGMODULE;
    cameraDataSupport = new CameraDataSupport();
    lightDataSupport = new LightDataSupport();
    geometryDataSupport = new GeometryDataSupport();
    textureDataSupport = new TextureDataSupport();
    materialDataSupport = new MaterialDataSupport();
    rendererDataSupport = new RendererDataSupport();
    sceneDataSupport = new SceneDataSupport();
    controlsDataSupport = new ControlsDataSupport();
    spriteDataSupport = new SpriteDataSupport();
    lineDataSupport = new LineDataSupport();
    meshDataSupport = new MeshDataSupport();
    pointsDataSupport = new PointsDataSupport();
    groupDataSupport = new GroupDataSupport();
    passDataSupport = new PassDataSupport();
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
     * 获取该模块下的支持插件
     * @param type MODULETYPE
     * @returns DataSupport
     */
    getDataSupport(type) {
        if (this.dataSupportMap.has(type)) {
            return this.dataSupportMap.get(type);
        }
        else {
            console.warn(`can not found this type in dataSupportManager: ${type}`);
            return null;
        }
    }
    /**
     * @experimental 获取该模块下的响应式数据对象
     */
    getSupportData(type) {
        if (this.dataSupportMap.has(type)) {
            return this.dataSupportMap.get(type).getData();
        }
        else {
            console.warn(`can not found this type in dataSupportManager: ${type}`);
            return null;
        }
    }
    /**
     * @experimental 设置该模块下的响应式数据对象
     */
    setSupportData(type, data) {
        if (this.dataSupportMap.has(type)) {
            this.dataSupportMap.get(type).setData(data);
        }
        else {
            console.warn(`can not found this type in dataSupportManager: ${type}`);
        }
        return this;
    }
    /**
     * 通过vid标识获取相应配置对象
     * @param vid vid标识
     * @returns config || null
     */
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
    /**
     * 通过vid标识移除相关配置对象
     * @param vid vid标识
     * @returns this
     */
    removeConfigBySymbol(vid) {
        const dataSupportList = this.dataSupportMap.values();
        for (const dataSupport of dataSupportList) {
            if (dataSupport.existSymbol(vid)) {
                dataSupport.removeConfig(vid);
                return this;
            }
        }
        return this;
    }
    /**
     * 通过vid标识获取该标识所处的模块
     * @param vid vid标识
     * @returns MODULETYPE || null
     */
    getModuleBySymbol(vid) {
        const dataSupportList = this.dataSupportMap.values();
        for (const dataSupport of dataSupportList) {
            if (dataSupport.existSymbol(vid)) {
                return dataSupport.MODULE;
            }
        }
        return null;
    }
    /**
     * 应用配置对象
     * @param config vis相关配置对象
     * @returns this
     */
    applyConfig(...configs) {
        for (const config of configs) {
            const module = DataSupportManager.configModuleMap[config.type];
            if (module) {
                this.dataSupportMap.get(module).addConfig(config);
            }
            else {
                console.warn(`dataSupportManager can not found this config module: ${config.type}`);
            }
        }
        return this;
    }
    /**
     * 获取响应式配置对象
     * @param config vis相关配置对象
     * @returns config
     */
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
    /**
     * 根据配置单加载对象
     * @param config 符合vis配置选项的配置单对象
     * @returns this
     */
    load(config) {
        const dataSupportMap = this.dataSupportMap;
        dataSupportMap.forEach((dataSupport, module) => {
            config[module] && dataSupport.load(config[module]);
        });
        return this;
    }
    /**
     * 根据配置单移除相关对象
     * @param config  符合vis配置选项的配置单对象
     * @returns this
     */
    remove(config) {
        const dataSupportMap = this.dataSupportMap;
        dataSupportMap.forEach((dataSupport, module) => {
            config[module] && dataSupport.remove(config[module]);
        });
        return this;
    }
    /**
     * 获取JSON化的配置单
     * @param extendsConfig 需要额外JSON化的配置对象，会被dataSupport的对象覆盖
     * @param compress 是否压缩配置单 default true
     * @returns JSON string
     */
    toJSON(extendsConfig = {}, compress = true) {
        return JSON.stringify(this.exportConfig(extendsConfig, compress), stringify);
    }
    /**
     * 导出配置单
     * @param extendsConfig 拓展配置对象
     * @param compress 是否压缩配置单 default true
     * @returns LoadOptions
     */
    exportConfig(extendsConfig = {}, compress = true) {
        const dataSupportMap = this.dataSupportMap;
        dataSupportMap.forEach((dataSupport, module) => {
            extendsConfig[module] = dataSupport.exportConfig(compress);
        });
        return extendsConfig;
    }
}
//# sourceMappingURL=DataSupportManager.js.map