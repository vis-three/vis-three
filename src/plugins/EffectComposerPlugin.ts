import { RGBAFormat, Vector2, WebGLMultisampleRenderTarget } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { Engine } from "../engine/Engine";
import { RenderEvent } from "../manager/RenderManager";
import { Plugin } from "./plugin";
import { SetCameraEvent, SetSizeEvent } from "./WebGLRendererPlugin";

export interface EffectComposerParameters {
  WebGLMultisampleRenderTarget?: boolean
}

export const EffectComposerPlugin: Plugin<EffectComposerParameters> = function (this: Engine, params: EffectComposerParameters) {
  if (this.effectComposer) {
    console.warn('this has installed effect composer plugin.')
    return
  }

  if (!this.webGLRenderer) {
    console.error('must install some renderer before this plugin.')
    return
  }

  let composer: EffectComposer

  if (params?.WebGLMultisampleRenderTarget) {
    const renderer = this.webGLRenderer!
    const pixelRatio = renderer.getPixelRatio()
    const size = renderer.getDrawingBufferSize(new Vector2())
    composer = new EffectComposer(
      renderer,
      new WebGLMultisampleRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
        format: RGBAFormat
      })
    )
  } else {
    composer = new EffectComposer(this.webGLRenderer)
  }

  this.effectComposer = composer

  let renderPass!: RenderPass

  if (this.scene) {
    renderPass = new RenderPass(this.scene, this.currentCamera!)
  } else if (this.modelingScene) {
    renderPass = new RenderPass(this.modelingScene, this.currentCamera!)
  } else {
    console.error(`composer con not found support scene plugin.`)
    return
  }

  composer.addPass(renderPass)
  
  this.addEventListener<SetCameraEvent>('setCamera', event => {
    renderPass.camera = event.camera
  })

  this.addEventListener<SetSizeEvent>('setSize', event => {
    composer.setSize(event.width, event.height)
  })

  if (this.renderManager) {
    this.renderManager.removeEventListener('render', this.render!)
  }

  this.render = () => {
    this.effectComposer!.render()
  }

  if (this.renderManager) {
    this.renderManager.addEventListener('render', (event) => {
      this.effectComposer!.render((event as RenderEvent).delta)
    })
  }
}