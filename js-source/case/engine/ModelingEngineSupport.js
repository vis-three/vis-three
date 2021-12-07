import { ModelingEngine } from "../../main";
import { CameraCompiler } from "../camera/CameraCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { GeometryCompiler } from "../geometry/GeometryCompiler";
import { LightCompiler } from "../light/LightCompiler";
import { MaterialCompiler } from "../material/MaterialCompiler";
import { ModelCompiler } from "../model/ModelCompiler";
import { RendererCompiler } from "../render/RendererCompiler";
import { SceneCompiler } from "../scene/SceneCompiler";
import { TextureCompiler } from "../texture/TextureCompiler";
export class ModelingEngineSupport extends ModelingEngine {
    textureCompiler;
    materialCompiler;
    cameraCompiler;
    lightCompiler;
    modelCompiler;
    geometryCompiler;
    rendererCompiler;
    sceneCompiler;
    resourceManager;
    dataSupportManager;
    constructor(parameters) {
        super(parameters.dom);
        const dataSupportManager = parameters.dataSupportManager;
        const textureDataSupport = dataSupportManager.getDataSupport(MODULETYPE.TEXTURE);
        const materialDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MATERIAL);
        const cameraDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CAMERA);
        const lightDataSupport = dataSupportManager.getDataSupport(MODULETYPE.LIGHT);
        const geometryDataSupport = dataSupportManager.getDataSupport(MODULETYPE.GEOMETRY);
        const modelDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MODEL);
        const rendererDataSupport = dataSupportManager.getDataSupport(MODULETYPE.RENDERER);
        const sceneDataSupport = dataSupportManager.getDataSupport(MODULETYPE.SCENE);
        const textureCompiler = new TextureCompiler({
            target: textureDataSupport.getData()
        });
        const materialCompiler = new MaterialCompiler({
            target: materialDataSupport.getData()
        });
        const cameraCompiler = new CameraCompiler({
            target: cameraDataSupport.getData()
        });
        const lightCompiler = new LightCompiler({
            scene: this.scene,
            target: lightDataSupport.getData()
        });
        const geometryCompiler = new GeometryCompiler({
            target: geometryDataSupport.getData()
        });
        const modelCompiler = new ModelCompiler({
            scene: this.scene,
            target: modelDataSupport.getData()
        });
        const rendererCompiler = new RendererCompiler({
            target: rendererDataSupport.getData(),
            glRenderer: this.renderer
        });
        const sceneCompiler = new SceneCompiler({
            target: sceneDataSupport.getData(),
            scene: this.scene
        });
        const resourceManager = parameters.resourceManager;
        // 建立编译器链接
        sceneCompiler.linkTextureMap(textureCompiler.getMap());
        materialCompiler.linkTextureMap(textureCompiler.getMap());
        modelCompiler.linkGeometryMap(geometryCompiler.getMap());
        modelCompiler.linkMaterialMap(materialCompiler.getMap());
        textureCompiler.linkRescourceMap(resourceManager.getMappingResourceMap());
        geometryCompiler.linkRescourceMap(resourceManager.getMappingResourceMap());
        // 添加通知
        textureDataSupport.addCompiler(textureCompiler);
        materialDataSupport.addCompiler(materialCompiler);
        cameraDataSupport.addCompiler(cameraCompiler);
        lightDataSupport.addCompiler(lightCompiler);
        geometryDataSupport.addCompiler(geometryCompiler);
        modelDataSupport.addCompiler(modelCompiler);
        rendererDataSupport.addCompiler(rendererCompiler);
        sceneDataSupport.addCompiler(sceneCompiler);
        this.textureCompiler = textureCompiler;
        this.materialCompiler = materialCompiler;
        this.cameraCompiler = cameraCompiler;
        this.lightCompiler = lightCompiler;
        this.modelCompiler = modelCompiler;
        this.geometryCompiler = geometryCompiler;
        this.rendererCompiler = rendererCompiler;
        this.sceneCompiler = sceneCompiler;
        this.dataSupportManager = parameters.dataSupportManager;
        this.resourceManager = parameters.resourceManager;
    }
    getDataSupportManager() {
        return this.dataSupportManager;
    }
}
//# sourceMappingURL=ModelingEngineSupport.js.map