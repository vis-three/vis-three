import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Camera, MOUSE } from 'three'
export class VisOrbitControls extends OrbitControls{
  constructor (camera: Camera, domElement?: HTMLElement) {
    super(camera, domElement)
    this.mouseButtons = {
      LEFT: null as unknown as MOUSE, 
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    }
  }

  setCamera (camera: Camera): this {
    this.object = camera
    this.update()
    return this
  }
}