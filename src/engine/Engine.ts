import {
  Camera,
  Object3D,
  Scene,
  WebGLRenderer,
  WebGLRendererParameters
} from "three";
import { EventDispatcher } from "../core/EventDispatcher";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SceneParameters, ScenePlugin } from "../plugins/ScenePlugin";
import { RenderManager } from "../manager/RenderManager";
import { RenderManagerPlugin } from "../plugins/RenderManagerPlugin";
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
import { Screenshot, WebGLRendererPlugin } from "../plugins/WebGLRendererPlugin";
import { LoadedEvent, LoaderManager, LoaderManagerParameters } from "../manager/LoaderManager";
import { LoaderManagerPlugin } from "../plugins/LoaderManagerPlugin";
import { ResourceManager } from "../manager/ResourceManager";
import { ResourceManagerPlugin } from "../plugins/ResourceManagerPlugin";
import { DataSupportManager, DataSupportManagerParameters } from "../manager/DataSupportManager";
import { DataSupportManagerPlugin } from "../plugins/DataSupportManagerPlugin";
import { CompilerManager, CompilerManagerParameters } from "../manager/CompilerManager";
import { CompilerManagerPlugin } from "../plugins/CompilerManagerPlugin";
import { KeyboardManager } from "../manager/KeyboardManager";
import { KeyboardManagerPlugin } from "../plugins/KeyboardManagerPlugin";
import { VIEWPOINT, ViewpointParameters, ViewpointPlugin } from "../plugins/ViewpointPlugin";
import { AxesHelperParameters, AxesHelperPlugin } from "../plugins/AxesHelperPlugin";
import { GridHelperParameters, GridHelperPlugin } from "../plugins/GridHelperPlugin";
import { DISPLAYMODE, DisplayModelPlugin, DisplayModeParameters } from "../plugins/DisplayModePlugin";
import { ObjectHelperParameters, ObjectHelperPlugin } from "../plugins/ObjectHelperPlugin";
import { SelectionParameters, SelectionPlugin } from "../plugins/SelectionPlugin";

// 存在的插件接口
export enum ENGINEPLUGIN {
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
  COMPILERMANAGER = 'CompilerManager',
  KEYBOARDMANAGER = 'KeyboardManager',
  AXESHELPER = 'AxesHelper',
  GRIDHELPER = 'GridHelper',
  VIEWPOINT = 'Viewpoint',
  DISPLAYMODE = 'DisplayMode',
  OBJECTHELPER = 'ObjectHelper',
  SELECTION = 'Selection'
}

// 引擎槽
export class Engine extends EventDispatcher {

  static pluginHandler: Map<string, Function> | undefined = new Map()

  // 注册引擎插件
  static register = function<T extends object> (name: string, handler: (this: Engine, params: T) => void): typeof Engine {
    Engine.pluginHandler && Engine.pluginHandler.set(name, handler)
    return Engine
  }

  // 清空插件缓存
  static dispose = function () {
    Engine.pluginHandler = undefined
  }  

  completeSet: Set<(engine: Engine) => void>

  IS_ENGINESUPPORT: boolean = false

  dom?: HTMLElement
  webGLRenderer?: WebGLRenderer
  currentCamera?: Camera
  scene?: Scene
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
  keyboardManager?: KeyboardManager
  stats?: Stats 
  transing?: boolean
  displayMode?: DISPLAYMODE
  selectionBox?: Set<Object3D>

  getScreenshot?: (params: Screenshot) => HTMLImageElement

  setSize?: (width: number, height: number) => this
  setCamera?: (camera: Camera) => this
  setDom?: (dom: HTMLElement) => this
  setStats?: (show: boolean) => this
  setTransformControls?: (show: boolean) => this
  setViewpoint?: (viewpoint: VIEWPOINT) => this
  setDisplayMode?: (mode: DISPLAYMODE) => this
  setAxesHelper?: (params: {show: boolean}) => this
  setGridHelper?: (params: {show: boolean}) => this
  setObjectHelper?: (params: {show: boolean}) => this
  setSelectionBox?: (params: {objects: Object3D[]}) => this

  loadResources?: (urlList: Array<string>, callback: (err: Error | undefined, event?: LoadedEvent) => void) => this
  loadResourcesAsync?: (urlList: Array<string>) => Promise<LoadedEvent>

  registerResources?: (resourceMap: {[key: string]: unknown}) => this
  toJSON?: () => string

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
  }

  protected optimizeMemory () {
    Object.keys(this).forEach(key => {
      if (this[key] === undefined) {
        delete this[key]
      }
    })
  }

  // 安装插件
  install<T extends object> (plugin: ENGINEPLUGIN, params?: T): this {
    if (Engine.pluginHandler!.has(plugin)) {
      Engine.pluginHandler!.get(plugin)!.call(this, params)
    } else {
      console.error(`engine can not support ${plugin} plugin.`)
    }
    return this
  }

  // 完成
  complete (): this {
    this.completeSet.forEach(fun => {
      fun(this)
    })
    this.completeSet.clear()
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

Engine.register<WebGLRendererParameters>(ENGINEPLUGIN.WEBGLRENDERER, WebGLRendererPlugin)

Engine.register<EffectComposerParameters>(ENGINEPLUGIN.EFFECTCOMPOSER, EffectComposerPlugin)
Engine.register<SceneParameters>(ENGINEPLUGIN.SCENE, ScenePlugin)

Engine.register<object>(ENGINEPLUGIN.RENDERMANAGER, RenderManagerPlugin)
Engine.register<PointerManagerParameters>(ENGINEPLUGIN.POINTERMANAGER, PointerManagerPlugin)
Engine.register<EventManagerParameters>(ENGINEPLUGIN.EVENTMANAGER, EventManagerPlugin)
Engine.register<LoaderManagerParameters>(ENGINEPLUGIN.LOADERMANAGER, LoaderManagerPlugin)
Engine.register<object>(ENGINEPLUGIN.RESOURCEMANAGER, ResourceManagerPlugin)
Engine.register<DataSupportManagerParameters>(ENGINEPLUGIN.DATASUPPORTMANAGER, DataSupportManagerPlugin)
Engine.register<CompilerManagerParameters>(ENGINEPLUGIN.COMPILERMANAGER, CompilerManagerPlugin)
Engine.register<object>(ENGINEPLUGIN.KEYBOARDMANAGER, KeyboardManagerPlugin)

Engine.register<object>(ENGINEPLUGIN.ORBITCONTROLS, OrbitControlsPlugin)
Engine.register<object>(ENGINEPLUGIN.TRANSFORMCONTROLS, TransformControlsPlugin)

Engine.register<AxesHelperParameters>(ENGINEPLUGIN.AXESHELPER, AxesHelperPlugin)
Engine.register<GridHelperParameters>(ENGINEPLUGIN.GRIDHELPER, GridHelperPlugin)
Engine.register<ObjectHelperParameters>(ENGINEPLUGIN.OBJECTHELPER, ObjectHelperPlugin)

Engine.register<DisplayModeParameters>(ENGINEPLUGIN.DISPLAYMODE, DisplayModelPlugin)
Engine.register<ViewpointParameters>(ENGINEPLUGIN.VIEWPOINT, ViewpointPlugin)
Engine.register<VisStatsParameters>(ENGINEPLUGIN.STATS, StatsPlugin)
Engine.register<SelectionParameters>(ENGINEPLUGIN.SELECTION, SelectionPlugin)
