import { validate } from "uuid";
import { Compiler } from "../core/Compiler";
import { CameraCompiler } from "../middleware/camera/CameraCompiler";
import { ControlsCompiler } from "../middleware/controls/ControlsCompiler";
import { EventCompiler } from "../middleware/event/EventCompiler";
import { GeometryCompiler } from "../middleware/geometry/GeometryCompiler";
import { GroupCompiler } from "../middleware/group/GroupCompiler";
import { LightCompiler } from "../middleware/light/LightCompiler";
import { LineCompiler } from "../middleware/line/LineCompiler";
import { MaterialCompiler } from "../middleware/material/MaterialCompiler";
import { MeshCompiler } from "../middleware/mesh/MeshCompiler";
import { PointsCompiler } from "../middleware/points/PointsCompiler";
import { RendererCompiler } from "../middleware/renderer/RendererCompiler";
import { SceneCompiler } from "../middleware/scene/SceneCompiler";
import { SpriteCompiler } from "../middleware/sprite/SpriteCompiler";
import { TextureCompiler } from "../middleware/texture/TextureCompiler";
export class CompilerManager {
    cameraCompiler;
    lightCompiler;
    geometryCompiler;
    textureCompiler;
    materialCompiler;
    rendererCompiler;
    sceneCompiler;
    controlsCompiler;
    spriteCompiler;
    eventCompiler;
    lineCompiler;
    meshCompiler;
    pointsCompiler;
    groupCompiler;
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
        const textureDataSupport = dataSupportManager.textureDataSupport;
        const materialDataSupport = dataSupportManager.materialDataSupport;
        const cameraDataSupport = dataSupportManager.cameraDataSupport;
        const lightDataSupport = dataSupportManager.lightDataSupport;
        const geometryDataSupport = dataSupportManager.geometryDataSupport;
        const rendererDataSupport = dataSupportManager.rendererDataSupport;
        const sceneDataSupport = dataSupportManager.sceneDataSupport;
        const controlsDataSupport = dataSupportManager.controlsDataSupport;
        const spriteDataSupport = dataSupportManager.spriteDataSupport;
        const eventDataSupport = dataSupportManager.eventDataSupport;
        const lineDataSupport = dataSupportManager.lineDataSupport;
        const meshDataSupport = dataSupportManager.meshDataSupport;
        const pointsDataSupport = dataSupportManager.pointsDataSupport;
        const groupDataSupport = dataSupportManager.groupDataSupport;
        const textureCompiler = new TextureCompiler({
            target: textureDataSupport.getData()
        });
        this.textureCompiler = textureCompiler;
        const materialCompiler = new MaterialCompiler({
            target: materialDataSupport.getData()
        });
        this.materialCompiler = materialCompiler;
        const geometryCompiler = new GeometryCompiler({
            target: geometryDataSupport.getData()
        });
        this.geometryCompiler = geometryCompiler;
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
        const spriteCompiler = new SpriteCompiler({
            target: spriteDataSupport.getData(),
            scene: engine.scene
        });
        this.spriteCompiler = spriteCompiler;
        this.objectCompilerList.push(spriteCompiler);
        const lineCompiler = new LineCompiler({
            target: lineDataSupport.getData(),
            scene: engine.scene
        });
        this.lineCompiler = lineCompiler;
        this.objectCompilerList.push(lineCompiler);
        const meshCompiler = new MeshCompiler({
            target: meshDataSupport.getData(),
            scene: engine.scene
        });
        this.meshCompiler = meshCompiler;
        this.objectCompilerList.push(meshCompiler);
        const pointsCompiler = new PointsCompiler({
            target: pointsDataSupport.getData(),
            scene: engine.scene
        });
        this.pointsCompiler = pointsCompiler;
        this.objectCompilerList.push(pointsCompiler);
        const groupCompiler = new GroupCompiler({
            target: groupDataSupport.getData(),
            scene: engine.scene
        });
        this.groupCompiler = groupCompiler;
        this.objectCompilerList.push(groupCompiler);
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
            transformControls: engine.transformControls,
            orbitControls: engine.orbitControls
        });
        this.controlsCompiler = controlsCompiler;
        const eventCompiler = new EventCompiler({
            target: eventDataSupport.getData(),
            engine: engine
        });
        this.eventCompiler = eventCompiler;
        const resourceManager = engine.resourceManager;
        // 建立编译器链接
        sceneCompiler.linkTextureMap(textureCompiler.getMap());
        materialCompiler.linkTextureMap(textureCompiler.getMap());
        const objectMapList = this.objectCompilerList.map(elem => elem.getMap());
        for (let objectCompiler of this.objectCompilerList) {
            objectCompiler
                .linkGeometryMap(geometryCompiler.getMap())
                .linkMaterialMap(materialCompiler.getMap())
                .linkObjectMap(...objectMapList);
        }
        eventCompiler.linkObjectMap(...objectMapList);
        textureCompiler.linkRescourceMap(resourceManager.resourceMap);
        geometryCompiler.linkRescourceMap(resourceManager.resourceMap);
        // 添加通知 TODO: 注意生命周期 lookAt group等
        textureDataSupport.addCompiler(textureCompiler);
        materialDataSupport.addCompiler(materialCompiler);
        cameraDataSupport.addCompiler(cameraCompiler);
        lightDataSupport.addCompiler(lightCompiler);
        geometryDataSupport.addCompiler(geometryCompiler);
        rendererDataSupport.addCompiler(rendererCompiler);
        sceneDataSupport.addCompiler(sceneCompiler);
        controlsDataSupport.addCompiler(controlsCompiler);
        spriteDataSupport.addCompiler(spriteCompiler);
        lineDataSupport.addCompiler(lineCompiler);
        meshDataSupport.addCompiler(meshCompiler);
        pointsDataSupport.addCompiler(pointsCompiler);
        groupDataSupport.addCompiler(groupCompiler);
        eventDataSupport.addCompiler(eventCompiler);
        return this;
    }
    getObjectSymbol(object) {
        const objectCompilerList = this.objectCompilerList;
        for (let compiler of objectCompilerList) {
            const vid = compiler.getObjectSymbol(object);
            if (vid) {
                return vid;
            }
        }
        return null;
    }
    getObjectBySymbol(vid) {
        const objectCompilerList = this.objectCompilerList;
        for (let compiler of objectCompilerList) {
            const object = compiler.getMap().get(vid);
            if (object) {
                return object;
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
    getObjectCompilerList() {
        return this.objectCompilerList;
    }
    dispose() {
        Object.keys(this).forEach(key => {
            if (this[key] instanceof Compiler) {
                this[key].dispose();
            }
        });
        this.objectCompilerList = [];
        return this;
    }
}
//# sourceMappingURL=CompilerManager.js.map