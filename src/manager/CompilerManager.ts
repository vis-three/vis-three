import { Material, Object3D, Texture } from "three";
import { validate } from "uuid";
import { ObjectCompiler } from "../core/Compiler";
import { CameraCompiler } from "../middleware/camera/CameraCompiler";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { ControlsCompiler } from "../middleware/controls/ControlsCompiler";
import { GeometryCompiler } from "../middleware/geometry/GeometryCompiler";
import { LightCompiler } from "../middleware/light/LightCompiler";
import { MaterialCompiler } from "../middleware/material/MaterialCompiler";
import { ModelCompiler } from "../middleware/model/ModelCompiler";
import { RendererCompiler } from "../middleware/render/RendererCompiler";
import { SceneCompiler } from "../middleware/scene/SceneCompiler";
import { TextureCompiler } from "../middleware/texture/TextureCompiler";

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

  constructor (parameters: CompilerManagerParameters) {
    Object.keys(parameters).forEach(key => {
      this[key] = parameters[key]
    })
  }

  getObjectVid<O extends Object3D>(object: O): SymbolConfig['vid'] | null {
    const objectCompilerList: ObjectCompiler[] = [
      this.cameraCompiler,
      this.lightCompiler,
      this.modelCompiler
    ]

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