import { Material, Mesh, Object3D, Texture } from "three";
import { validate } from "uuid";
import { Compiler } from "../core/Compiler";
import { Engine } from "../main";
import { CameraCompiler } from "../middleware/camera/CameraCompiler";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { ControlsCompiler } from "../middleware/controls/ControlsCompiler";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { EventCompiler } from "../middleware/event/EventCompiler";
import { EventDataSupport } from "../middleware/event/EventDataSupport";
import { GeometryCompiler } from "../middleware/geometry/GeometryCompiler";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { LightCompiler } from "../middleware/light/LightCompiler";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { LineCompiler } from "../middleware/line/LineCompiler";
import { LineDataSupport } from "../middleware/line/LineDataSupport";
import { MaterialCompiler } from "../middleware/material/MaterialCompiler";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { MeshCompiler } from "../middleware/mesh/MeshCompiler";
import { ModelCompiler } from "../middleware/model/ModelCompiler";
import { ModelDataSupport } from "../middleware/model/ModelDataSupport";
import { PointsCompiler } from "../middleware/points/PointsCompiler";
import { RendererCompiler } from "../middleware/render/RendererCompiler";
import { RendererDataSupport } from "../middleware/render/RendererDataSupport";
import { SceneCompiler } from "../middleware/scene/SceneCompiler";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { SpriteCompiler } from "../middleware/sprite/SpriteCompiler";
import { SpriteDataSupport } from "../middleware/sprite/SpriteDataSupport";
import { TextureCompiler } from "../middleware/texture/TextureCompiler";
import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";

export interface CompilerManagerParameters {
  cameraCompiler: CameraCompiler
  lightCompiler: LightCompiler
  geometryCompiler: GeometryCompiler
  modelCompiler: ModelCompiler
  textureCompiler: TextureCompiler
  materialCompiler: MaterialCompiler
  rendererCompiler: RendererCompiler
  sceneCompiler: SceneCompiler
  controlsCompiler: ControlsCompiler
  spriteCompiler: SpriteCompiler
  lineCompiler: LineCompiler
  meshCompiler: MeshCompiler
  pointsCompiler: PointsCompiler
}

export class CompilerManager {

  private cameraCompiler!: CameraCompiler
  private lightCompiler!: LightCompiler
  private geometryCompiler!: GeometryCompiler
  private modelCompiler!: ModelCompiler
  private textureCompiler!: TextureCompiler
  private materialCompiler!: MaterialCompiler
  private rendererCompiler!: RendererCompiler
  private sceneCompiler!: SceneCompiler
  private controlsCompiler!: ControlsCompiler
  private spriteCompiler!: SpriteCompiler
  private eventCompiler!: EventCompiler
  private lineCompiler!: LineCompiler
  private meshCompiler!: MeshCompiler
  private pointsCompiler!: PointsCompiler

  private objectCompilerList: Array<Compiler>

  constructor (parameters?: CompilerManagerParameters) {
    
    this.objectCompilerList = []

    if (parameters) {
      Object.keys(parameters).forEach(key => {
        this[key] = parameters[key]
        parameters[key].IS_OBJECTCOMPILER && this.objectCompilerList.push(parameters[key])
      })
    }

  }

  support (engine: Engine): this {

    const dataSupportManager = engine.dataSupportManager!

    const textureDataSupport = dataSupportManager.textureDataSupport
    const materialDataSupport = dataSupportManager.materialDataSupport
    const cameraDataSupport = dataSupportManager.cameraDataSupport
    const lightDataSupport =  dataSupportManager.lightDataSupport
    const geometryDataSupport =  dataSupportManager.geometryDataSupport
    const modelDataSupport =  dataSupportManager.modelDataSupport
    const rendererDataSupport = dataSupportManager.rendererDataSupport
    const sceneDataSupport = dataSupportManager.sceneDataSupport
    const controlsDataSupport = dataSupportManager.controlsDataSupport
    const spriteDataSupport = dataSupportManager.spriteDataSupport
    const eventDataSupport = dataSupportManager.eventDataSupport
    const lineDataSupport  = dataSupportManager.lineDataSupport
    const meshDataSupport = dataSupportManager.meshDataSupport
    const pointsDataSupport = dataSupportManager.pointsDataSupport

    const textureCompiler = new TextureCompiler({
      target: textureDataSupport.getData()
    })

    this.textureCompiler = textureCompiler


    const materialCompiler = new MaterialCompiler({
      target: materialDataSupport.getData()
    })
    this.materialCompiler = materialCompiler


    const cameraCompiler = new CameraCompiler({
      target: cameraDataSupport.getData(),
      scene: engine.scene!,
      engine: engine
    })
    this.cameraCompiler = cameraCompiler
    this.objectCompilerList.push(cameraCompiler)

    const lightCompiler = new LightCompiler({
      scene: engine.scene!,
      target: lightDataSupport.getData()
    })
    this.lightCompiler = lightCompiler
    this.objectCompilerList.push(lightCompiler)

    const geometryCompiler = new GeometryCompiler({
      target: geometryDataSupport.getData()
    })
    this.geometryCompiler = geometryCompiler


    const modelCompiler = new ModelCompiler({
      scene: engine.scene,
      target: modelDataSupport.getData()
    })
    this.modelCompiler = modelCompiler
    this.objectCompilerList.push(modelCompiler)


    const rendererCompiler = new RendererCompiler({
      target: rendererDataSupport.getData(),
      engine: engine
    })
    this.rendererCompiler = rendererCompiler


    const sceneCompiler = new SceneCompiler({
      target: sceneDataSupport.getData(),
      scene: engine.scene
    })
    this.sceneCompiler = sceneCompiler


    const controlsCompiler = new ControlsCompiler({
      target: controlsDataSupport.getData(),
      transformControls: engine.transformControls
    })
    this.controlsCompiler = controlsCompiler


    const spriteCompiler = new SpriteCompiler({
      target: spriteDataSupport.getData(),
      scene: engine.scene!
    })
    this.spriteCompiler = spriteCompiler
    this.objectCompilerList.push(spriteCompiler)


    const eventCompiler = new EventCompiler({
      target: eventDataSupport.getData()
    })
    this.eventCompiler = eventCompiler

    const lineCompiler = new LineCompiler({
      target: lineDataSupport.getData(),
      scene: engine.scene!
    })
    this.lineCompiler = lineCompiler

    const meshCompiler = new MeshCompiler({
      target: meshDataSupport.getData(),
      scene: engine.scene!
    })
    this.meshCompiler = meshCompiler

    const pointsCompiler = new PointsCompiler({
      target: pointsDataSupport.getData(),
      scene: engine.scene!
    })
    this.pointsCompiler = pointsCompiler

    const resourceManager = engine.resourceManager!

    // 建立编译器链接
    sceneCompiler.linkTextureMap(textureCompiler.getMap())
    materialCompiler.linkTextureMap(textureCompiler.getMap())

    modelCompiler
    .linkGeometryMap(geometryCompiler.getMap())
    .linkMaterialMap(materialCompiler.getMap())
    .linkObjectMap(lightCompiler.getMap())
    .linkObjectMap(cameraCompiler.getMap())
    .linkObjectMap(modelCompiler.getMap())
    .linkObjectMap(spriteCompiler.getMap())

    meshCompiler
    .linkGeometryMap(geometryCompiler.getMap())
    .linkMaterialMap(materialCompiler.getMap())
    .linkObjectMap(lightCompiler.getMap())
    .linkObjectMap(cameraCompiler.getMap())
    .linkObjectMap(modelCompiler.getMap())
    .linkObjectMap(spriteCompiler.getMap())
    
    pointsCompiler
    .linkGeometryMap(geometryCompiler.getMap())
    .linkMaterialMap(materialCompiler.getMap())
    .linkObjectMap(lightCompiler.getMap())
    .linkObjectMap(cameraCompiler.getMap())
    .linkObjectMap(modelCompiler.getMap())
    .linkObjectMap(spriteCompiler.getMap())

    lineCompiler
    .linkGeometryMap(geometryCompiler.getMap())
    .linkMaterialMap(materialCompiler.getMap())
    .linkObjectMap(lightCompiler.getMap())
    .linkObjectMap(cameraCompiler.getMap())
    .linkObjectMap(modelCompiler.getMap())
    .linkObjectMap(spriteCompiler.getMap())

    cameraCompiler
    .linkObjectMap(lightCompiler.getMap())
    .linkObjectMap(cameraCompiler.getMap())
    .linkObjectMap(modelCompiler.getMap())
    .linkObjectMap(spriteCompiler.getMap())

    spriteCompiler.linkMaterialMap(materialCompiler.getMap())

    textureCompiler.linkRescourceMap(resourceManager.resourceMap)
    geometryCompiler.linkRescourceMap(resourceManager.resourceMap)

    // 添加通知
    textureDataSupport.addCompiler(textureCompiler)
    materialDataSupport.addCompiler(materialCompiler)
    cameraDataSupport.addCompiler(cameraCompiler)
    lightDataSupport.addCompiler(lightCompiler)
    geometryDataSupport.addCompiler(geometryCompiler)
    modelDataSupport.addCompiler(modelCompiler)
    rendererDataSupport.addCompiler(rendererCompiler)
    sceneDataSupport.addCompiler(sceneCompiler)
    controlsDataSupport.addCompiler(controlsCompiler)
    spriteDataSupport.addCompiler(spriteCompiler)
    lineDataSupport.addCompiler(lineCompiler)
    meshDataSupport.addCompiler(meshCompiler)
    pointsDataSupport.addCompiler(pointsCompiler)
    return this
  }

  getObjectVid<O extends Object3D>(object: O): SymbolConfig['vid'] | null {
    const objectCompilerList = this.objectCompilerList

    for (let compiler of objectCompilerList) {
      // @ts-ignore
      const vid = compiler.getSupportVid(object) || compiler.getObjectSymbol(object)
      if (vid) {
        return vid
      }
    }

    return null
  }

  getMaterial (vid: string): Material | undefined {
    if (!validate(vid)) {
      console.warn(`compiler manager vid is illeage: ${vid}`)
      return undefined
    }

    const materialCompiler = this.materialCompiler
    return materialCompiler.getMap().get(vid)
  }

  getTexture (vid: string): Texture | undefined {
    if (!validate(vid)) {
      console.warn(`compiler manager vid is illeage: ${vid}`)
      return undefined
    }

    const textureCompiler = this.textureCompiler
    return textureCompiler.getMap().get(vid)
  }

  getObject (vid: string): Object3D | undefined {
    return undefined
  }

  getObjectCompilerList (): Compiler[] {
    return this.objectCompilerList
  }

  dispose (): this {
    this.geometryCompiler.dispose()
    this.materialCompiler.dispose()
    this.lineCompiler.dispose()
    this.spriteCompiler.dispose()
    return this
  }
}