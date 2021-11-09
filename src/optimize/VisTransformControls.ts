import { Camera, Object3D } from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

export class VisTransformControls extends TransformControls {
  private target: Object3D // 控制器的内部控制目标
  
  constructor (camera: Camera, dom: HTMLElement) {
    super(camera, dom)
    this.target = new Object3D()
    this.attach(this.target)
  }

  getTarget (): Object3D {
    return this.target
  }

  setCamera (camera: Camera): this {
    this.camera = camera
    return this
  }
}