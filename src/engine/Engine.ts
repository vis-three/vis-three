import {
  Camera,
  Scene,
  WebGLRenderer,
  WebGLRendererParameters
} from "three";
import { 
  WebGLRendererPlugin, ScenePlugin, Plugin
} from "../plugins/plugin";
import { EventDispatcher } from "../middleware/EventDispatcher";
import { ModelingScene } from "../extends/ModelingScene/ModelingScene";
import { ModelingScenePlugin } from "../plugins/ModelingScenePlugin";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SceneParameters } from "../plugins/ScenePlugin";
import { ModelingSceneParameters } from "./ModelingEngine/ModelingScene";
import { RenderManager } from "../manager/RenderManager";
import { RendererManagerPlugin } from "../plugins/RenderManagerPlugin";
import { OrbitControlsPlugin } from "../plugins/OrbitControlsPlugin";

// 存在的插件接口
export enum EnginePlugin {
  WEBGLRENDERER = 'WebGLRenderer',
  SCENE = 'Scene',
  MODELINGSCENE = 'ModelingScene',
  RENDERMANAGER = 'RenderManager',
  ORBITCONTROLS = 'OrbitControls'
}

export type EnginePluginParams = 
  WebGLRendererParameters |
  SceneParameters |
  ModelingSceneParameters

// 引擎槽
export class Engine extends EventDispatcher {

  private pluginHandler?: Map<string, Plugin<Object>>

  completeSet?: Set<(engine: Engine) => void>


  dom?: HTMLElement
  webGLRenderer?: WebGLRenderer
  currentCamera?: Camera
  scene?: Scene
  modelingScene?: ModelingScene
  orbitControls?: OrbitControls
  composer?: EffectComposer
  renderManager?: RenderManager

  setSize?: (width: number, height: number) => this
  setCamera?: (camera: Camera) => this
  setDom?: (dom: HTMLElement) => this

  render?: () => void

  constructor () {
    super()
    this.completeSet = new Set()

    // 插件处理集合
    const pluginHandler = new Map()
    pluginHandler.set('WebGLRenderer', WebGLRendererPlugin)
    pluginHandler.set('Scene', ScenePlugin)
    pluginHandler.set('ModelingScene', ModelingScenePlugin)
    pluginHandler.set('RenderManager', RendererManagerPlugin)
    pluginHandler.set('OrbitControls', OrbitControlsPlugin)

    this.pluginHandler = pluginHandler

    this.render = function () {
      console.warn('can not install some plugin')
    }
  }

  // 安装
  install (plugin: EnginePlugin, params: EnginePluginParams): this {
    if (this.pluginHandler!.has(plugin)) {
      this.pluginHandler!.get(plugin)!(this, params)
    }
    return this
  }

  // 完成
  complete (): this {
    this.completeSet!.forEach(fun => {
      fun(this)
    })
    this.completeSet = undefined
    this.pluginHandler = undefined
    return this
  }

  // 清除缓存
  dispose (): this {
    this.dispatchEvent({
      type: 'dispose'
    })
    return this
  }
}