import { Camera, OrthographicCamera, PerspectiveCamera, WebGLRenderer, WebGLRendererParameters } from "three"
import { Engine } from "../engine/Engine"
import { BaseEvent } from "../core/EventDispatcher"
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

export const WebGLRendererPlugin: Plugin<WebGLRendererParameters> = function (this: Engine, params: WebGLRendererParameters): boolean {
  if (this.webGLRenderer) {
    console.warn('this has installed webglRenderer plugin.')
    return false
  }

  this.webGLRenderer = new WebGLRenderer(params)

  this.dom = this.webGLRenderer.domElement

  // 设置尺寸
  this.setSize = function (width?: number, height?: number): Engine {
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
  this.setCamera = function setCamera (camera: Camera): Engine {
    this.currentCamera = camera
    this.dispatchEvent({
      type: 'setCamera',
      camera
    })
    return this
  }

  // 设置渲染的dom
  this.setDom = function (dom: HTMLElement): Engine {
    this.dom = dom
    dom.appendChild(this.webGLRenderer!.domElement)
    return this
  }

  this.addEventListener<SetSizeEvent>('setSize', (event) => {
    const width = event.width
    const height = event.height
    this.webGLRenderer!.setSize(width, height, true)
  })

  this.addEventListener('dispose', () => {
    this.webGLRenderer!.dispose()
  })

  return true
}