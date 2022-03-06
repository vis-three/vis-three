import { BaseEvent, Camera, Object3D } from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

export enum TRANSFORMEVENT {
  OBJECTCHANGED = 'objectChanged'
}

// 控制器更新物体完成后的事件
export interface ObjectChangedEvent extends BaseEvent {
  type: 'objectChanged'
  transObjectSet: Set<Object3D>
  mode: string
  target: Object3D
}


export class VisTransformControls extends TransformControls {
  target: Object3D // 控制器的内部控制目标
  private transObjectSet: Set<Object3D> // 影响的变换物体列表

  constructor (camera: Camera, dom: HTMLElement) {
    super(camera, dom)

    // 重写pointerDown types的transformControl没写全这里直接忽略
    // @ts-ignore
    this.domElement.removeEventListener('pointerdown', this._onPointerDown )
    // @ts-ignore
    this._onPointerDown = (event) => {
      if ( ! this.enabled || !this.object?.parent) return;
      this.domElement.setPointerCapture( event.pointerId );
      // @ts-ignore
      this.domElement.addEventListener( 'pointermove', this._onPointerMove );
      // @ts-ignore
      this.pointerHover( this._getPointer( event ) );
      // @ts-ignore
      this.pointerDown( this._getPointer( event ) );
    }
    // @ts-ignore
    this.domElement.addEventListener( 'pointerdown', this._onPointerDown );
    
    this.target = new Object3D()
    this.transObjectSet = new Set()

    let mode = ''
    let target = this.target
    let transObjectSet = this.transObjectSet
    let cachaTargetTrans = {
      x: 0,
      y: 0,
      z: 0
    }

    // 缓存目标物体的自动变换设置
    // TODO: 有children的物体更新
    let objectMatrixAutoMap = new WeakMap<Object3D, boolean>()
    // TODO: 轴应用
    this.addEventListener('mouseDown', (event) => {
      mode = event.target.mode

      mode === 'translate' && (mode = 'position')
      mode === 'rotate' && (mode = 'rotation')

      // 保存 当前target的原始值
      cachaTargetTrans.x = target[mode].x
      cachaTargetTrans.y = target[mode].y
      cachaTargetTrans.z = target[mode].z

      // 关闭所有物体的自动矩阵更新，由控制器控制物体进行矩阵更新
      transObjectSet.forEach(object => {
        objectMatrixAutoMap.set(object, object.matrixAutoUpdate)
        object.matrixAutoUpdate = false
      })
    })

    this.addEventListener('objectChange', (event) => {

      // 计算 target 的增量
      const offsetX = target[mode].x - cachaTargetTrans.x
      const offsetY = target[mode].y - cachaTargetTrans.y
      const offsetZ = target[mode].z - cachaTargetTrans.z

      // 更新缓存
      cachaTargetTrans.x = target[mode].x
      cachaTargetTrans.y = target[mode].y
      cachaTargetTrans.z = target[mode].z

      // 物体应用增量
      transObjectSet.forEach(elem => {
        elem[mode].x += offsetX
        elem[mode].y += offsetY
        elem[mode].z += offsetZ
        elem.updateMatrix()
        elem.updateMatrixWorld()
      })

      this.dispatchEvent({
        type: TRANSFORMEVENT.OBJECTCHANGED,
        transObjectSet,
        mode,
        target
      })
    })

    this.addEventListener('mouseUp', event => {
      // 归还物体自动更新设置
      transObjectSet.forEach(object => {
        object.matrixAutoUpdate = objectMatrixAutoMap.get(object)!
        objectMatrixAutoMap.delete(object)
      })
    })
  }

  getTarget (): Object3D {
    return this.target
  }

  getTransObjectSet (): Set<Object3D> {
    return this.transObjectSet
  }

  setCamera (camera: Camera): this {
    this.camera = camera
    return this
  }

  setAttach (...object: Object3D[]): this {
    this.transObjectSet.clear()

    if (!object.length || !object[0]) {
      this.detach()
      return this
    }

    this.attach(this.target)

    const target = this.target

    if (object.length === 1) {
      const currentObject = object[0]

      target.scale.copy(currentObject.scale)
      target.rotation.copy(currentObject.rotation)
      target.position.copy(currentObject.position)

      target.updateMatrix()
      target.updateMatrixWorld()

      this.transObjectSet.add(currentObject)
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
    
    target.rotation.set(0, 0, 0)
    target.scale.set(0, 0, 0)
    
    target.position.x = (Math.max(...xList) - Math.min(...xList)) / 2 + Math.min(...xList)
    target.position.y = (Math.max(...yList) - Math.min(...yList)) / 2 + Math.min(...yList)
    target.position.z = (Math.max(...zList) - Math.min(...zList)) / 2 + Math.min(...zList)

    target.updateMatrix()
    target.updateMatrixWorld()


    object.forEach(elem => {
      this.transObjectSet.add(elem)
    })

    return this
  }
}