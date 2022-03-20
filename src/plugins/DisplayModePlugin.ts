import { BaseEvent, LineBasicMaterial, Material, MeshLambertMaterial, Object3D, PointsMaterial, Scene, SpriteMaterial } from "three";
import { Engine } from "../engine/Engine";
import { Plugin } from "./plugin";

export interface DisplayModeParameters {
  overrideColor?: string
}

export interface SceneAddEvent extends BaseEvent {
  type: 'afterAdd' // 不与three内置的ed事件命名冲突
  objects: Object3D[]
}

export interface SceneRemoveEvent extends BaseEvent {
  type: 'afterRemove' // 不与three内置的ed事件命名冲突
  objects: Object3D[]
}

export enum DISPLAYMODE {
  WIREWFRAME = 'wireframe',
  GEOMETRY = 'geometry',
  MATERIAL = 'material',
  LIGHT = 'light',
  ENV = 'env'
}

export const DisplayModelPlugin: Plugin<DisplayModeParameters> = function(this: Engine, params: DisplayModeParameters = {}): boolean {
  if (!this.webGLRenderer) {
    console.error('must install some renderer before DisplayModel plugin.')
    return false
  }

  if (!this.scene) {
    console.error('must install some scene before DisplayModel plugin.')
    return false
  }

  // 场景add装饰
  const sceneAdd = this.scene.add.bind(this.scene)

  this.scene.add = function (...object: Object3D[]): Scene {
    sceneAdd(...object)
    this.dispatchEvent({
      type: 'afterAdd',
      objects: object
    })
    return this
  }

  // 场景remove装饰
  const sceneRemove = this.scene.remove.bind(this.scene)

  this.scene.remove = function (...object: Object3D[]): Scene {
    sceneRemove(...object)
    this.dispatchEvent({
      type: 'afterRemove',
      objects: object
    })
    return this
  }

  !params.overrideColor && (params.overrideColor = 'rgb(250, 250, 250)')

  const meshOverrideMaterial = new MeshLambertMaterial({color: params.overrideColor})
  const lineOverrideMaterial = new LineBasicMaterial({color: params.overrideColor})
  const pointsOverrideMaterial = new PointsMaterial({color: params.overrideColor, size: 5, sizeAttenuation: false})
  const spriteOverrideMaterial = new SpriteMaterial({color: params.overrideColor})
 
  const cacheMaterial = new WeakMap<Object3D, Material | Material[]>()

  this.scene.addEventListener('afterAdd', event => {
    // TODO:
  })

  return true
}