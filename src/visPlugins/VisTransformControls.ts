import { Object3D } from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { VisCamera } from '../visObject/visCamera/VisCamera'

export class VisTransformControls extends TransformControls {
  private target: Object3D // 控制器的内部控制目标
  
  constructor (camera: VisCamera, dom: HTMLElement) {
    super(camera, dom)
    this.target = new Object3D()
    this.attach(this.target)
  }

  getTarget (): Object3D {
    return this.target
  }

  setCamera (camera: VisCamera): this {
    this.camera = camera
    return this
  }
}