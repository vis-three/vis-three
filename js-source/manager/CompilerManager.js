import { validate } from "uuid";
import { CameraCompiler } from "../middleware/camera/CameraCompiler";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { ControlsCompiler } from "../middleware/controls/ControlsCompiler";
import { EventCompiler } from "../middleware/event/EventCompiler";
import { GeometryCompiler } from "../middleware/geometry/GeometryCompiler";
import { LightCompiler } from "../middleware/light/LightCompiler";
import { LineCompiler } from "../middleware/line/LineCompiler";
import { MaterialCompiler } from "../middleware/material/MaterialCompiler";
import { ModelCompiler } from "../middleware/model/ModelCompiler";
import { RendererCompiler } from "../middleware/render/RendererCompiler";
import { SceneCompiler } from "../middleware/scene/SceneCompiler";
import { SpriteCompiler } from "../middleware/sprite/SpriteCompiler";
import { TextureCompiler } from "../middleware/texture/TextureCompiler";
export class CompilerManager {
    cameraCompiler;
    lightCompiler;
    geometryCompiler;
    modelCompiler;
    textureCompiler;
    materialCompiler;
    rendererCompiler;
    sceneCompiler;
    controlsCompiler;
    spriteCompiler;
    eventCompiler;
    lineCompiler;
    objectCompilerList;
    constructor(parameters) {
        this.objectCompilerList = [];
        if (parameters) {
            Object.keys(parameters).forEach(key => {
                this[key] = parameters[key];
                parameters[key].IS_OBJECTCOMPILER && this.objectCompilerList.push(parameters[key]);
            });
        }
    }
    support(engine) {
        const dataSupportManager = engine.dataSupportManager;
        const textureDataSupport = dataSupportManager.getDataSupport(MODULETYPE.TEXTURE);
        const materialDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MATERIAL);
        const cameraDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CAMERA);
        const lightDataSupport = dataSupportManager.getDataSupport(MODULETYPE.LIGHT);
        const geometryDataSupport = dataSupportManager.getDataSupport(MODULETYPE.GEOMETRY);
        const modelDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MODEL);
        const rendererDataSupport = dataSupportManager.getDataSupport(MODULETYPE.RENDERER);
        const sceneDataSupport = dataSupportManager.getDataSupport(MODULETYPE.SCENE);
        const controlsDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CONTROLS);
        const spriteDataSupport = dataSupportManager.getDataSupport(MODULETYPE.SPRITE);
        const eventDataSupport = dataSupportManager.getDataSupport(MODULETYPE.EVENT);
        const lineDataSupport = dataSupportManager.getDataSupport(MODULETYPE.LINE);
        const textureCompiler = new TextureCompiler({
            target: textureDataSupport.getData()
        });
        this.textureCompiler = textureCompiler;
        const materialCompiler = new MaterialCompiler({
            target: materialDataSupport.getData()
        });
        this.materialCompiler = materialCompiler;
        const cameraCompiler = new CameraCompiler({
            target: cameraDataSupport.getData(),
            scene: engine.scene,
            engine: engine
        });
        this.cameraCompiler = cameraCompiler;
        this.objectCompilerList.push(cameraCompiler);
        const lightCompiler = new LightCompiler({
            scene: engine.scene,
            target: lightDataSupport.getData()
        });
        this.lightCompiler = lightCompiler;
        this.objectCompilerList.push(lightCompiler);
        const geometryCompiler = new GeometryCompiler({
            target: geometryDataSupport.getData()
        });
        this.geometryCompiler = geometryCompiler;
        const modelCompiler = new ModelCompiler({
            scene: engine.scene,
            target: modelDataSupport.getData()
        });
        this.modelCompiler = modelCompiler;
        this.objectCompilerList.push(modelCompiler);
        const rendererCompiler = new RendererCompiler({
            target: rendererDataSupport.getData(),
            engine: engine
        });
        this.rendererCompiler = rendererCompiler;
        const sceneCompiler = new SceneCompiler({
            target: sceneDataSupport.getData(),
            scene: engine.scene
        });
        this.sceneCompiler = sceneCompiler;
        const controlsCompiler = new ControlsCompiler({
            target: controlsDataSupport.getData(),
            transformControls: engine.transformControls
        });
        this.controlsCompiler = controlsCompiler;
        const spriteCompiler = new SpriteCompiler({
            target: spriteDataSupport.getData(),
            scene: engine.scene
        });
        this.spriteCompiler = spriteCompiler;
        this.objectCompilerList.push(spriteCompiler);
        const eventCompiler = new EventCompiler({
            target: eventDataSupport.getData()
        });
        this.eventCompiler = eventCompiler;
        const lineCompiler = new LineCompiler({
            target: lineDataSupport.getData(),
            engine
        });
        this.lineCompiler = lineCompiler;
        const resourceManager = engine.resourceManager;
        // 建立编译器链接
        sceneCompiler.linkTextureMap(textureCompiler.getMap());
        materialCompiler.linkTextureMap(textureCompiler.getMap());
        modelCompiler
            .linkGeometryMap(geometryCompiler.getMap())
            .linkMaterialMap(materialCompiler.getMap())
            .linkObjectMap(lightCompiler.getMap())
            .linkObjectMap(cameraCompiler.getMap())
            .linkObjectMap(modelCompiler.getMap())
            .linkObjectMap(spriteCompiler.getMap());
        lineCompiler
            .linkMaterialMap(materialCompiler.getMap())
            .linkObjectMap(lightCompiler.getMap())
            .linkObjectMap(cameraCompiler.getMap())
            .linkObjectMap(modelCompiler.getMap())
            .linkObjectMap(spriteCompiler.getMap());
        cameraCompiler
            .linkObjectMap(lightCompiler.getMap())
            .linkObjectMap(cameraCompiler.getMap())
            .linkObjectMap(modelCompiler.getMap())
            .linkObjectMap(spriteCompiler.getMap());
        spriteCompiler.linkMaterialMap(materialCompiler.getMap());
        textureCompiler.linkRescourceMap(resourceManager.resourceMap);
        geometryCompiler.linkRescourceMap(resourceManager.resourceMap);
        // 添加通知
        textureDataSupport.addCompiler(textureCompiler);
        materialDataSupport.addCompiler(materialCompiler);
        cameraDataSupport.addCompiler(cameraCompiler);
        lightDataSupport.addCompiler(lightCompiler);
        geometryDataSupport.addCompiler(geometryCompiler);
        modelDataSupport.addCompiler(modelCompiler);
        rendererDataSupport.addCompiler(rendererCompiler);
        sceneDataSupport.addCompiler(sceneCompiler);
        controlsDataSupport.addCompiler(controlsCompiler);
        spriteDataSupport.addCompiler(spriteCompiler);
        lineDataSupport.addCompiler(lineCompiler);
        return this;
    }
    getObjectVid(object) {
        const objectCompilerList = this.objectCompilerList;
        for (let compiler of objectCompilerList) {
            const vid = compiler.getSupportVid(object);
            if (vid) {
                return vid;
            }
        }
        return null;
    }
    getMaterial(vid) {
        if (!validate(vid)) {
            console.warn(`compiler manager vid is illeage: ${vid}`);
            return undefined;
        }
        const materialCompiler = this.materialCompiler;
        return materialCompiler.getMap().get(vid);
    }
    getTexture(vid) {
        if (!validate(vid)) {
            console.warn(`compiler manager vid is illeage: ${vid}`);
            return undefined;
        }
        const textureCompiler = this.textureCompiler;
        return textureCompiler.getMap().get(vid);
    }
    getObject(vid) {
        return undefined;
    }
    getObjectCompilerList() {
        return this.objectCompilerList;
    }
    dispose() {
        this.geometryCompiler.dispose();
        this.materialCompiler.dispose();
        this.lineCompiler.dispose();
        this.spriteCompiler.dispose();
        return this;
    }
}
//# sourceMappingURL=CompilerManager.js.map