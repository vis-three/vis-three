import { Object3D } from "three";
import { isValidKey } from "../utils/utils";
import { VisLight, VisLightConfigType } from "../visObject/VisLight";
import { VisPointLight } from "../visObject/visLight/VisPointLight";
import { VisSpotLight } from "../visObject/visLight/VisSpotLight";
import { VisScene } from "../visCore/VisScene";
import { VisCompiler, VisCompilerTarget } from "./VisCompiler";

export interface VisLightCompileTarget extends VisCompilerTarget {
  [key: string]: VisLightConfigType
}

export class VisLightCompiler implements VisCompiler {

  private scene: VisScene
  private target: VisLightCompileTarget
  private map: Map<string, VisLight>

  constructor (scene: VisScene, target: VisLightCompileTarget) {
    this.scene = scene
    this.target = target
    this.map = new Map()
  }

  initCompile(): this {
    return this
  }

  disposeCompile(): this {
    return this
  }


  add (vid: string, type: string): this {
    const actionMap: Map<string, Function> = new Map()
    
    actionMap.set('VisPointLight', () => new VisPointLight())
    actionMap.set('VisSpotLight', () => new VisSpotLight())

    if (actionMap.has(type)) {
      const light = actionMap.get(type)!() as VisLight
      light.vid = vid
      this.scene.add(light)
    } else {
      console.warn(`type are not in vis frame: ${type}`)
    }
    return this
  }
}

Object3D