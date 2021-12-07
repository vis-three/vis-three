import { TextureDataSupport } from "../case/texture/TextureDataSupport";
import { ModelDataSupport } from "../case/model/ModelDataSupport";
import { MaterialDataSupport } from "../case/material/MaterialDataSupport";
import { LightDataSupport } from "../case/light/LightDataSupport";
import { GeometryDataSupport } from "../case/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../case/camera/CameraDataSupport";
import { MODULETYPE } from "../case/constants/MODULETYPE";
import { RendererDataSupport } from "../case/render/RendererDataSupport";
import { SceneDataSupport } from "../case/scene/SceneDataSupport";
export class DataSupportManager {
    cameraDataSupport;
    lightDataSupport;
    geometryDataSupport;
    modelDataSupport;
    textureDataSupport;
    materialDataSupport;
    rendererDataSupport;
    sceneDataSupport;
    dataSupportMap;
    constructor(parameters) {
        this.cameraDataSupport = parameters?.cameraDataSupport || new CameraDataSupport();
        this.lightDataSupport = parameters?.lightDataSupport || new LightDataSupport();
        this.geometryDataSupport = parameters?.geometryDataSupport || new GeometryDataSupport();
        this.modelDataSupport = parameters?.modelDataSupport || new ModelDataSupport();
        this.textureDataSupport = parameters?.textureDataSupport || new TextureDataSupport();
        this.materialDataSupport = parameters?.materialDataSupport || new MaterialDataSupport();
        this.rendererDataSupport = parameters?.rendererDataSupport || new RendererDataSupport();
        this.sceneDataSupport = parameters?.sceneDataSupport || new SceneDataSupport();
        const dataSupportMap = new Map();
        dataSupportMap.set(MODULETYPE.CAMERA, this.cameraDataSupport);
        dataSupportMap.set(MODULETYPE.LIGHT, this.lightDataSupport);
        dataSupportMap.set(MODULETYPE.GEOMETRY, this.geometryDataSupport);
        dataSupportMap.set(MODULETYPE.MODEL, this.modelDataSupport);
        dataSupportMap.set(MODULETYPE.TEXTURE, this.textureDataSupport);
        dataSupportMap.set(MODULETYPE.MATERIAL, this.materialDataSupport);
        dataSupportMap.set(MODULETYPE.RENDERER, this.rendererDataSupport);
        dataSupportMap.set(MODULETYPE.SCENE, this.sceneDataSupport);
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
    load(config) {
        config.camera && this.cameraDataSupport.load(config.camera);
        config.geometry && this.geometryDataSupport.load(config.geometry);
        config.light && this.lightDataSupport.load(config.light);
        config.material && this.materialDataSupport.load(config.material);
        config.model && this.modelDataSupport.load(config.model);
        config.texture && this.textureDataSupport.load(config.texture);
        config.renderer && this.rendererDataSupport.load(config.renderer);
        config.scene && this.sceneDataSupport.load(config.scene);
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
            [MODULETYPE.TEXTURE]: this.textureDataSupport.toJSON()
        };
        return JSON.stringify(jsonObject);
    }
}
//# sourceMappingURL=DataSupportManager.js.map