
import {
  Clock,
  WebGLRenderer,
  EventDispatcher,
  WebGL1Renderer,
  BaseEvent
} from 'three'
import { VisCamera } from '../visObject/visCamera/VisCamera'
import { VisScene } from './VisScene'

// 引擎参数
export interface VisEngineParameters {
  renderer: WebGLRenderer | WebGL1Renderer
  scene: VisScene
  camera: VisCamera
}

// 相机事件
export interface VisEngineSetCameraEvent extends BaseEvent {
  camera: VisCamera
}

// 改变窗口事件
export interface VisEngineSetSizeEvent extends BaseEvent {
  width: number
  height: number
}

// 引擎的整体规定的渲染方法类型
export type VisRenderFun = (delta: number, total: number) => void

export class VisEngine extends EventDispatcher<VisEngineSetCameraEvent | VisEngineSetSizeEvent> {
  private static clock: Clock = new Clock() // 引擎时钟
  private static renderSet: Set<VisRenderFun> = new Set() // 渲染方法列表
  private static animationFrame = -1 // 渲染定时器
  
  // 添加渲染方法
  static addRenderFun = (fun: VisRenderFun): void => {
    
    if (!VisEngine.renderSet.has(fun)) {
      VisEngine.renderSet.add(fun)
    } else {
      console.warn(`VisEngine has already exists this ${fun}`)
    }
    console.log(VisEngine.renderSet)
  }

  // 移除渲染方法
  static removeRenderFun = (fun: VisRenderFun): void => {
    if (VisEngine.renderSet.has(fun)) {
      VisEngine.renderSet.delete(fun)
    } else {
      console.info(`VisEngine renderFun is not found: ${fun}`)
    }
  }

  // 更新渲染
  static updateRender = (): void => {
    const clock: Clock = VisEngine.clock
    const delta: number = clock.getDelta()
    const total: number = clock.getElapsedTime()

    const renderSet: Set<VisRenderFun> = VisEngine.renderSet

    renderSet.forEach((fun: VisRenderFun) => {
      fun(delta, total)
    })
    VisEngine.animationFrame = requestAnimationFrame(() => VisEngine.updateRender())
  }

  // 停止渲染
  static stopRender = (): void => {
    cancelAnimationFrame(VisEngine.animationFrame)

    VisEngine.animationFrame = -1
  }

  // 检测是否有此渲染方法
  static hasVisRenderFun = (fun: VisRenderFun): boolean => {
    return VisEngine.renderSet.has(fun)
  }

  // 是否处于渲染当中
  static checkHasRendering = (): boolean => {
    return VisEngine.animationFrame !== -1
  }

  // 是否有效渲染队列
  static hasVaildRender = (): boolean => {
    return VisEngine.renderSet.size > 0
  }

  
  private renderer: WebGLRenderer // 渲染器
  private scene: VisScene // 场景
  private camera: VisCamera // 当前的渲染相机
  private renderFun: VisRenderFun // 渲染方法

  constructor (parameters: VisEngineParameters) {
    super()
    this.renderer = parameters.renderer
    this.scene = parameters.scene
    this.camera = parameters.camera
    this.renderFun = this.renderer.render.bind(this.renderer, this.scene, this.camera)
  }

  getRenderCanvas (): HTMLCanvasElement {
    return this.renderer.domElement
  }

  getRenderer (): WebGLRenderer {
    return this.renderer
  }

  getScene (): VisScene {
    return this.scene
  }

  getCamera (): VisCamera {
    return this.camera
  }

  // 设置相机
  setCamera (camera: VisCamera): this {
    this.camera = camera
    this.dispatchEvent({
      type: 'setCamera',
      camera
    })
    return this
  }

  // 设置窗口尺寸
  setSize (width: number, height: number): this {
    if(width <= 0 || height <= 0) {
      console.error(`you must be input width and height bigger then zero, width: ${width}, height: ${height}`)
      return this
    }
    const renderer = this.renderer
    renderer.setSize(width, height)
    this.dispatchEvent({type: 'setSize', width, height})
    return this
  }

  // 渲染
  render (): void {
    VisEngine.addRenderFun(this.renderFun)
  }

  // 停止
  stop (): void {
    VisEngine.removeRenderFun(this.renderFun)
  }

  // 清空缓存
  dispose (): void {
    this.renderer.clear()
    this.renderer.dispose()
    // TODO: scene dispose
  }
}