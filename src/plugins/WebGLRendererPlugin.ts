import { Camera, WebGLRenderer, WebGLRendererParameters } from "three"
import { Engine } from "../engine/Engine"
import { BaseEvent } from "../middleware/EventDispatcher"
import { Plugin } from "./plugin"

export interface SetSizeEvent extends BaseEvent {
  type: 'setSize'
  width: number
  height: number
}

export interface SetCameraEvent extends BaseEvent {
  type: 'setCamera'
  camera: Camera
}

export const WebGLRendererPlugin: Plugin<WebGLRenderer> = function (engine: Engine, params: WebGLRendererParameters) {
  if (engine.webGLRenderer) {
    console.warn('engine has installed webglRenderer plugin.')
    return
  }

  engine.webGLRenderer = new WebGLRenderer(params)

  // 设置尺寸
  engine.setSize = function (width?: number, height?: number): Engine {
    if(width && width <= 0 || height && height <= 0) {
      console.warn(`you must be input width and height bigger then zero, width: ${width}, height: ${height}`)
      return this
    }
    !width && (width = this.dom?.offsetWidth)
    !height && (height = this.dom?.offsetHeight)

    this.dispatchEvent({type: 'setSize', width, height})
    return this
  }

  // 设置相机
  engine.setCamera = function setCamera (camera: Camera): Engine {
    this.currentCamera = camera
    this.dispatchEvent({
      type: 'setCamera',
      camera
    })
    return this
  }

  // 设置渲染的dom
  engine.setDom = function (dom: HTMLElement): Engine {
    this.dom = dom
    dom.appendChild(this.webGLRenderer!.domElement)
    return this
  }

  engine.addEventListener<SetSizeEvent>('setSize', (event) => {
    console.log('setSize')
    const width = event.width
    const height = event.height
    engine.webGLRenderer!.setSize(width, height, true)
  })

  engine.addEventListener('dispose', () => {
    engine.webGLRenderer!.dispose()
  })
}
