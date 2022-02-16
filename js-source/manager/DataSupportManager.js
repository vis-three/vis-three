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
    dataSupportMap;
    constructor(parameters) {
        if (parameters) {
            Object.keys(parameters).forEach(key => {
                this[key] = parameters[key];
            });
        }
        else {
            this.cameraDataSupport = new CameraDataSupport();
            this.lightDataSupport = new LightDataSupport();
            this.geometryDataSupport = new GeometryDataSupport();
            this.modelDataSupport = new ModelDataSupport();
            this.textureDataSupport = new TextureDataSupport();
            this.materialDataSupport = new MaterialDataSupport();
            this.rendererDataSupport = new RendererDataSupport();
            this.sceneDataSupport = new SceneDataSupport();
            this.controlsDataSupport = new ControlsDataSupport();
        }
        const dataSupportMap = new Map();
        dataSupportMap.set(MODULETYPE.CAMERA, this.cameraDataSupport);
        dataSupportMap.set(MODULETYPE.LIGHT, this.lightDataSupport);
        dataSupportMap.set(MODULETYPE.GEOMETRY, this.geometryDataSupport);
        dataSupportMap.set(MODULETYPE.MODEL, this.modelDataSupport);
        dataSupportMap.set(MODULETYPE.TEXTURE, this.textureDataSupport);
        dataSupportMap.set(MODULETYPE.MATERIAL, this.materialDataSupport);
        dataSupportMap.set(MODULETYPE.RENDERER, this.rendererDataSupport);
        dataSupportMap.set(MODULETYPE.SCENE, this.sceneDataSupport);
        dataSupportMap.set(MODULETYPE.CONTROLS, this.controlsDataSupport);
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
        config.camera && this.cameraDataSupport.load(config.camera);
        config.geometry && this.geometryDataSupport.load(config.geometry);
        config.light && this.lightDataSupport.load(config.light);
        config.material && this.materialDataSupport.load(config.material);
        config.model && this.modelDataSupport.load(config.model);
        config.texture && this.textureDataSupport.load(config.texture);
        config.renderer && this.rendererDataSupport.load(config.renderer);
        config.scene && this.sceneDataSupport.load(config.scene);
        config.controls && this.controlsDataSupport.load(config.controls);
        return this;
    }
    toJSON() {
        const jsonObject = {
            [MODULETYPE.RENDERER]: this.rendererDataSupport.toJSON(),
            [MODULETYPE.SCENE]: this.sceneDataSupport.toJSON(),
            [MODULETYPE.CAMERA]: this.cameraDataSupport.toJSON(),
            [MODULETYPE.GEOMETRY]: this.geometryDataSupport.toJSON(),
            [MODULETYPE.LIGHT]: this.lightDataSupport.toJSON(),
            [MODULETYPE.MATERIAL]: this.materialDataSupport.toJSON(),
            [MODULETYPE.MODEL]: this.modelDataSupport.toJSON(),
            [MODULETYPE.TEXTURE]: this.textureDataSupport.toJSON(),
            [MODULETYPE.CONTROLS]: this.controlsDataSupport.toJSON()
        };
        return JSON.stringify(jsonObject);
    }
}
//# sourceMappingURL=DataSupportManager.js.map