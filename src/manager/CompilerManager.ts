import { Material, Object3D, Texture } from "three";
import { validate } from "uuid";
import { ObjectCompiler } from "../core/Compiler";
import { Engine } from "../main";
import { CameraCompiler } from "../middleware/camera/CameraCompiler";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { ControlsCompiler } from "../middleware/controls/ControlsCompiler";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { GeometryCompiler } from "../middleware/geometry/GeometryCompiler";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { LightCompiler } from "../middleware/light/LightCompiler";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { MaterialCompiler } from "../middleware/material/MaterialCompiler";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { ModelCompiler } from "../middleware/model/ModelCompiler";
import { ModelDataSupport } from "../middleware/model/ModelDataSupport";
import { RendererCompiler } from "../middleware/render/RendererCompiler";
import { RendererDataSupport } from "../middleware/render/RendererDataSupport";
import { SceneCompiler } from "../middleware/scene/SceneCompiler";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { SpriteCompiler } from "../middleware/sprite/SpriteCompiler";
import { SpriteDataSupport } from "../middleware/sprite/SpriteDataSupport";
import { TextureCompiler } from "../middleware/texture/TextureCompiler";
import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { DataSupportManager } from "./DataSupportManager";

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

  private objectCompilerList: Array<ObjectCompiler>

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

    const textureDataSupport = dataSupportManager.getDataSupport(MODULETYPE.TEXTURE)! as TextureDataSupport
    const materialDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MATERIAL)! as MaterialDataSupport
    const cameraDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CAMERA)! as CameraDataSupport
    const lightDataSupport =  dataSupportManager.getDataSupport(MODULETYPE.LIGHT)! as LightDataSupport
    const geometryDataSupport =  dataSupportManager.getDataSupport(MODULETYPE.GEOMETRY)! as GeometryDataSupport
    const modelDataSupport =  dataSupportManager.getDataSupport(MODULETYPE.MODEL)! as ModelDataSupport
    const rendererDataSupport = dataSupportManager.getDataSupport(MODULETYPE.RENDERER)! as RendererDataSupport
    const sceneDataSupport = dataSupportManager.getDataSupport(MODULETYPE.SCENE)! as SceneDataSupport
    const controlsDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CONTROLS)! as ControlsDataSupport
    const spriteDataSupport = dataSupportManager.getDataSupport(MODULETYPE.SPRITE)! as SpriteDataSupport

    const textureCompiler = new TextureCompiler({
      target: textureDataSupport.getData()
    })

    const materialCompiler = new MaterialCompiler({
      target: materialDataSupport.getData()
    })

    const cameraCompiler = new CameraCompiler({
      target: cameraDataSupport.getData(),
      scene: engine.scene!,
      engine: engine
    })

    const lightCompiler = new LightCompiler({
      scene: engine.scene!,
      target: lightDataSupport.getData()
    })

    const geometryCompiler = new GeometryCompiler({
      target: geometryDataSupport.getData()
    })

    const modelCompiler = new ModelCompiler({
      scene: engine.scene,
      target: modelDataSupport.getData()
    })

    const rendererCompiler = new RendererCompiler({
      target: rendererDataSupport.getData(),
      engine: engine
    })

    const sceneCompiler = new SceneCompiler({
      target: sceneDataSupport.getData(),
      scene: engine.scene
    })

    const controlsCompiler = new ControlsCompiler({
      target: controlsDataSupport.getData(),
      transformControls: engine.transformControls
    })

    const spriteCompiler = new SpriteCompiler({
      target: spriteDataSupport.getData(),
      scene: engine.scene!
    })

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
    return this
  }

  getObjectVid<O extends Object3D>(object: O): SymbolConfig['vid'] | null {
    const objectCompilerList = this.objectCompilerList

    for (let compiler of objectCompilerList) {
      const vid = compiler.getSupportVid(object)
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
}