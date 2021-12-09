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

  setAttach (...object: Object3D[]): this {

    if (!object.length) {
      this.visible = false
      return this
    }

    const target = this.target

    if (object.length === 1) {
      const currentObject = object[0]

      target.scale.copy(currentObject.scale)
      target.rotation.copy(currentObject.rotation)
      target.position.copy(currentObject.position)

      target.updateMatrix()
      target.updateMatrixWorld()

      return this
    }

    const xList: number[] = []
    const yList: number[] = []
    const zList: number[] = []

    object.forEach(elem => {
      xList.push(elem.position.x)
      yList.push(elem.position.y)
      zList.push(elem.position.z)
    })

    console.log(xList)
    console.log(yList)
    console.log(zList)
    
    target.rotation.set(0, 0, 0)
    target.scale.set(0, 0, 0)
    
    target.position.x = (Math.max(...xList) - Math.min(...xList)) / 2 + Math.min(...xList)
    target.position.y = (Math.max(...yList) - Math.min(...yList)) / 2 + Math.min(...yList)
    target.position.z = (Math.max(...zList) - Math.min(...zList)) / 2 + Math.min(...zList)
    console.log(target.position)

    target.updateMatrix()
    target.updateMatrixWorld()

    return this
  }
}