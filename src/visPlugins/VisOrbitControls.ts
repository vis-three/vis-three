import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { VisCamera } from '../visObject/visCamera/VisCamera'
import { MOUSE } from 'three'

export class VisOrbitControls extends OrbitControls{
  constructor (camera: VisCamera, domElement?: HTMLElement) {
    super(camera, domElement)
    this.mouseButtons = {
      // @ts-ignore: Unreachable code error
      LEFT: null, // 不想要左键触发事件，但是这里的mouseButtons被three做为了mouse的枚举，枚举中没有给忽略值
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    }
  }

  setCamera (camera: VisCamera): this {
    this.object = camera
    this.update()
    return this
  }
}