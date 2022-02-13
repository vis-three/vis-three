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
import { VisStatsParameters } from "../optimize/VisStats";
import Stats from "three/examples/jsm/libs/stats.module";
import { StatsPlugin } from "../plugins/StatsPlugin";
import { EffectComposerParameters, EffectComposerPlugin } from "../plugins/EffectComposerPlugin";
import { PointerManager } from "../manager/PointerManager";
import { PointerManagerParameters } from "../manager/PointerManager";
import { PointerManagerPlugin } from "../plugins/PointerManagerPlugin";
import { EventManager, EventManagerParameters } from "../manager/EventManager";
import { EventManagerPlugin } from "../plugins/EventManagerPlugin";

// 存在的插件接口
export enum EnginePlugin {
  WEBGLRENDERER = 'WebGLRenderer',
  SCENE = 'Scene',
  MODELINGSCENE = 'ModelingScene',
  RENDERMANAGER = 'RenderManager',
  ORBITCONTROLS = 'OrbitControls',
  STATS = 'Stats',
  EFFECTCOMPOSER = 'EffectComposer',
  POINTERMANAGER = 'PointerManager',
  EVENTMANAGER = 'EventManager'
}

export type EnginePluginParams = 
  WebGLRendererParameters |
  SceneParameters |
  ModelingSceneParameters |
  VisStatsParameters |
  EffectComposerParameters |
  PointerManagerParameters |
  EventManagerParameters

// 插件处理集合
let pluginHandler: Map<string, Function> | null = new Map()
pluginHandler.set('WebGLRenderer', WebGLRendererPlugin)
pluginHandler.set('Scene', ScenePlugin)
pluginHandler.set('ModelingScene', ModelingScenePlugin)
pluginHandler.set('RenderManager', RendererManagerPlugin)
pluginHandler.set('OrbitControls', OrbitControlsPlugin)
pluginHandler.set('Stats', StatsPlugin)
pluginHandler.set('EffectComposer', EffectComposerPlugin)
pluginHandler.set('PointerManager', PointerManagerPlugin)
pluginHandler.set('EventManager', EventManagerPlugin)


// 引擎槽
export class Engine extends EventDispatcher {

  completeSet?: Set<(engine: Engine) => void>


  dom?: HTMLElement
  webGLRenderer?: WebGLRenderer
  currentCamera?: Camera
  scene?: Scene
  modelingScene?: ModelingScene
  orbitControls?: OrbitControls
  effectComposer?: EffectComposer
  renderManager?: RenderManager
  pointerManager?: PointerManager
  eventManager?: EventManager
  stats?: Stats 

  setSize?: (width: number, height: number) => this
  setCamera?: (camera: Camera) => this
  setDom?: (dom: HTMLElement) => this
  setStats?: (show: boolean) => this

  render?: () => void

  constructor () {
    super()

    this.completeSet = new Set()
    this.render = function () {
      console.warn('can not install some plugin')
    }
  }

  // 安装
  install (plugin: EnginePlugin, params: EnginePluginParams): this {
    if (pluginHandler!.has(plugin)) {
      pluginHandler!.get(plugin)!.call(this, params)
    } else {
      console.error(`engine can not support ${plugin} plugin.`)
    }
    return this
  }

  // 完成
  complete (): this {
    this.completeSet!.forEach(fun => {
      fun(this)
    })
    this.completeSet = undefined
    pluginHandler = null
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