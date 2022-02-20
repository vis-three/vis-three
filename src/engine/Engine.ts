import {
  Camera,
  Scene,
  WebGLRenderer,
  WebGLRendererParameters
} from "three";
import { EventDispatcher } from "../core/EventDispatcher";
import { ModelingScene, ModelingSceneParameters } from "../extends/ModelingScene/ModelingScene";
import { ModelingScenePlugin } from "../plugins/ModelingScenePlugin";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SceneParameters, ScenePlugin } from "../plugins/ScenePlugin";
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
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { TransformControlsPlugin } from "../plugins/TransformControlsPlugin";
import { WebGLRendererPlugin } from "../plugins/WebGLRendererPlugin";
import { LoaderManager, LoaderManagerParameters } from "../manager/LoaderManager";
import { LoaderManagerPlugin } from "../plugins/LoaderManagerPlugin";
import { ResourceManager } from "../manager/ResourceManager";
import { ResourceManagerPlugin } from "../plugins/ResourceManagerPlugin";
import { DataSupportManager, DataSupportManagerParameters } from "../manager/DataSupportManager";
import { DataSupportManagerPlugin } from "../plugins/DataSupportManagerPlugin";
import { CompilerManager, CompilerManagerParameters } from "../manager/CompilerManager";
import { CompilerManagerPlugin } from "../plugins/CompilerManagerPlugin";

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
  EVENTMANAGER = 'EventManager',
  TRANSFORMCONTROLS = 'TransformControls',
  LOADERMANAGER = 'LoaderManager',
  RESOURCEMANAGER = 'ResourceManager',
  DATASUPPORTMANAGER = 'DataSupportManager',
  COMPILERMANAGER = 'CompilerManager'
}

export type EnginePluginParams = 
  WebGLRendererParameters |
  SceneParameters |
  ModelingSceneParameters |
  VisStatsParameters |
  EffectComposerParameters |
  PointerManagerParameters |
  EventManagerParameters |
  LoaderManagerParameters |
  DataSupportManagerParameters |
  CompilerManagerParameters

// 插件处理集合
let pluginHandler: Map<string, Function> = new Map()
pluginHandler.set('WebGLRenderer', WebGLRendererPlugin)
pluginHandler.set('Scene', ScenePlugin)
pluginHandler.set('ModelingScene', ModelingScenePlugin)
pluginHandler.set('RenderManager', RendererManagerPlugin)
pluginHandler.set('OrbitControls', OrbitControlsPlugin)
pluginHandler.set('Stats', StatsPlugin)
pluginHandler.set('EffectComposer', EffectComposerPlugin)
pluginHandler.set('PointerManager', PointerManagerPlugin)
pluginHandler.set('EventManager', EventManagerPlugin)
pluginHandler.set('TransformControls', TransformControlsPlugin)
pluginHandler.set('LoaderManager', LoaderManagerPlugin)
pluginHandler.set('ResourceManager', ResourceManagerPlugin)
pluginHandler.set('DataSupportManager', DataSupportManagerPlugin)
pluginHandler.set('CompilerManager', CompilerManagerPlugin)

// 引擎槽
export class Engine extends EventDispatcher {

  static pluginHandler: Map<string, Function> | undefined = pluginHandler

  // 注册
  static register = function (name: string, handler: (this: Engine, params?: Object) => void) {
    Engine.pluginHandler && Engine.pluginHandler.set(name, handler)
  }

  // 清空缓存
  static dispose = function () {
    Engine.pluginHandler = undefined
  }  

  completeSet?: Set<(engine: Engine) => void>


  dom?: HTMLElement
  webGLRenderer?: WebGLRenderer
  currentCamera?: Camera
  scene?: Scene | ModelingScene
  orbitControls?: OrbitControls
  transformControls?: TransformControls
  effectComposer?: EffectComposer
  renderManager?: RenderManager
  pointerManager?: PointerManager
  eventManager?: EventManager
  loaderManager?: LoaderManager
  resourceManager?: ResourceManager
  dataSupportManager?: DataSupportManager
  compilerManager?: CompilerManager
  stats?: Stats 
  transing?: boolean

  setSize?: (width: number, height: number) => this
  setCamera?: (camera: Camera) => this
  setDom?: (dom: HTMLElement) => this
  setStats?: (show: boolean) => this
  setTransformControls?: (show: boolean) => this

  loadResources?: (urlList: Array<string>) => this
  registerResources?: (resourceMap: {[key: string]: unknown}) => this

  play?: () => this
  stop?: () => this
  render?: () => this

  constructor () {
    super()

    this.completeSet = new Set()
    this.render = function () {
      console.warn('can not install some plugin')
      return this
    }

    this.optimizeMemory()
  }

  protected optimizeMemory () {
    Object.keys(this).forEach(key => {
      if (this[key] === undefined) {
        delete this[key]
      }
    })
  }

  // 安装插件
  install (plugin: EnginePlugin, params?: EnginePluginParams): this {
    if (Engine.pluginHandler!.has(plugin)) {
      Engine.pluginHandler!.get(plugin)!.call(this, params)
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