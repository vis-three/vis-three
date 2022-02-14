import { BaseEvent, Camera, OrthographicCamera, PerspectiveCamera, WebGLRenderer } from "three";
import { ModelingEngine } from "../../main";
import { RenderEvent, RenderManager } from "../../manager/RenderManager";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { Vector2Config } from "../common/CommonConfig";
import { RENDERERMANAGER } from "../constants/EVENTTYPE";
import { getWebGLRendererConfig, WebGLRendererConfig, WebGLRendererScissor, WebGLRendererViewPort } from "./RendererConfig";

export interface RendererCompilerTarget extends CompilerTarget {
  WebGLRenderer: WebGLRendererConfig
}

export interface RendererCompilerParameters {
  target?: RendererCompilerTarget
  glRenderer?: WebGLRenderer
  engine?: ModelingEngine
}

export interface GLRendererCacheData {
  adaptiveCameraFun?: (event: (BaseEvent | RenderEvent) & { type: RENDERERMANAGER.RENDER; } & { target: RenderManager; }) => void
}

export class RendererCompiler extends Compiler {

  private target!: RendererCompilerTarget
  private glRenderer!: WebGLRenderer
  private engine?: ModelingEngine
  private glRendererCacheData: GLRendererCacheData

  constructor (parameters?: RendererCompilerParameters) {
    super()
    if (parameters) {
      parameters.target && (this.target = parameters.target)
      parameters.glRenderer && (this.glRenderer = parameters.glRenderer)
      parameters.engine && (this.engine = parameters.engine)
    } else {
      this.target = {
        WebGLRenderer: getWebGLRendererConfig()
      }
      this.glRenderer = new WebGLRenderer()
    }

    this.glRendererCacheData = {}
  }

  private setClearColor (value): this {
    // 取出alpha的值
    const alpha = Number(value.slice(0, -1).split(',').pop().trim())
    this.glRenderer.setClearColor(value, alpha)
    this.glRenderer.clear()
    return this
  }

  private setPixelRatio (value): this {
    this.glRenderer.setPixelRatio(value)
    this.glRenderer.clear()
    return this
  }

  private setSize (vector2: Vector2Config | null): this {
    const glRenderer = this.glRenderer
    if (vector2) {
      glRenderer.setSize(vector2.x, vector2.y)
    } else {
      const domElement = glRenderer.domElement
      glRenderer.setSize(domElement.offsetWidth, domElement.offsetHeight)
    }
    
    return this
  }

  private setViewpoint (config: WebGLRendererViewPort | null): this {
    const glRenderer = this.glRenderer
    if (config) {
      glRenderer.setViewport(config.x, config.y, config.width, config.height)
    } else {
      const domElement = glRenderer.domElement
      glRenderer.setViewport(0, 0, domElement.offsetWidth, domElement.offsetHeight)
    }
    return this
  }

  private setScissor (config: WebGLRendererScissor | null): this {
    const glRenderer = this.glRenderer
    if (config) {
      glRenderer.setScissorTest(true)
      glRenderer.setScissor(config.x, config.y, config.width, config.height)
    } else {
      glRenderer.setScissorTest(false)
      const domElement = glRenderer.domElement
      glRenderer.setScissor(0, 0, domElement.offsetWidth, domElement.offsetHeight)
    }
    return this
  }

  private setAdaptiveCamera (value: boolean): this {
    if (!this.engine) {
      console.warn(`renderer compiler is not set engine.`)
      return this
    }

    const glRenderer = this.glRenderer
    const engine = this.engine!
    const renderManager = engine.renderManager!

    if (!value) {
      if (!this.glRendererCacheData.adaptiveCameraFun) {
        return this
      }

      if (this.glRendererCacheData.adaptiveCameraFun) {
        renderManager.removeEventListener(RENDERERMANAGER.RENDER, this.glRendererCacheData.adaptiveCameraFun)
        this.glRendererCacheData.adaptiveCameraFun = undefined
        return this
      }
    }

    if (value) {
      if (this.glRendererCacheData.adaptiveCameraFun) {
        renderManager.addEventListener(RENDERERMANAGER.RENDER, this.glRendererCacheData.adaptiveCameraFun)
        return this
      }

      const adaptiveCameraFun = (event:  (BaseEvent | RenderEvent) & { type: RENDERERMANAGER.RENDER; } & { target: RenderManager; }) => {
        const camera = engine.currentCamera!
        const domWidth = glRenderer.domElement.offsetWidth
        const domHeight = glRenderer.domElement.offsetHeight
        let width = 0
        let height = 0
        let offsetX = 0
        let offsetY = 0
        let aspect = 0
        // 根据相机类型去设置viewPoint
        if (camera instanceof PerspectiveCamera) {
          aspect = camera.aspect
        } else if (camera instanceof OrthographicCamera) {
          width = camera.right - camera.left
          height = camera.top - camera.bottom
          aspect = width / height
        } else {
          console.warn(`renderer compiler can not support this camera`, camera)
          return
        }

        if (aspect >= 1) {
          width = domWidth
          height = width / aspect
          offsetY = domHeight / 2 - height / 2
        } else {
          height = domHeight
          width = height * aspect
          offsetX = domWidth / 2 - width / 2
        }
        glRenderer.setScissor(offsetX, offsetY, width, height)
        glRenderer.setViewport(offsetX, offsetY, width, height)
        glRenderer.setScissorTest(true)
      }

      this.glRendererCacheData.adaptiveCameraFun = adaptiveCameraFun
      renderManager.addEventListener(RENDERERMANAGER.RENDER, this.glRendererCacheData.adaptiveCameraFun)
    } 

    return this
  }

  set (path: string[], key: string, value: any): this {
    const rendererType = path.shift()!
    
    if (rendererType === 'WebGLRenderer') {
      const glRendererTarget = this.target.WebGLRenderer
      const actionMap = {
        clearColor: () => this.setClearColor(value),
        pixelRatio: () => this.setPixelRatio(value),
        size: () => this.setSize(glRendererTarget.size),
        viewport: () => this.setViewpoint(glRendererTarget.viewport),
        scissor:() =>  this.setScissor(glRendererTarget.scissor),
        adaptiveCamera: () => this.setAdaptiveCamera(value)
      }

      if (actionMap[path[0] || key]) {
        actionMap[path[0] || key]()
        return this
      }
      const glRenderer = this.glRenderer
      let config = glRenderer
      path.forEach((key, i, arr) => {
        config = config[key]
      })
      config[key] = value
      glRenderer.clear()
      return this
    } else {
      console.warn(`renderer compiler can not support this type: ${rendererType}`)
      return this
    }
  }

  setTarget (target: RendererCompilerTarget): this {
    this.target = target
    return this
  }

  compileAll (): this {
    const target = this.target
    const glRendererTarget = target.WebGLRenderer

    this.setClearColor(glRendererTarget.clearColor)
    this.setPixelRatio(glRendererTarget.pixelRatio)
    this.setSize(glRendererTarget.size)
    this.setViewpoint(glRendererTarget.viewport)
    this.setScissor(glRendererTarget.scissor)
    this.setAdaptiveCamera(glRendererTarget.adaptiveCamera)

    const otherConfig = JSON.parse(JSON.stringify(glRendererTarget))
    delete otherConfig.vid
    delete otherConfig.type
    delete otherConfig.clearColor
    delete otherConfig.pixelRatio
    delete otherConfig.size
    delete otherConfig.viewport
    delete otherConfig.scissor
    delete otherConfig.adaptiveCamera

    Compiler.applyConfig(otherConfig, this.glRenderer)
    this.glRenderer.clear()
    return this
  }

  dispose (): this {
    return this
  }
}