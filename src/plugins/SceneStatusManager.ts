import { BaseEvent, Camera, EventDispatcher, Frustum, Intersection, Object3D, Raycaster, Scene, Vector2, Vector3 } from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js'
import { VisTransformControls } from '../optimize/VisTransformControls'
import { VisPointerEvent } from './PointerManager'
import { SelectionHelper } from './SelectionHelper'


export enum SCENESTATUSTYPE {
  HOVERCHANGE = 'hover-change',
  ACTIVECHANGE = 'active-change'
}

export interface hoverChangeEvent extends BaseEvent{
  type: 'hover-change'
  objectSet: Set<Object3D>
}

export interface activeChangeEvent extends BaseEvent {
  type: 'active-change'
  objectSet: Set<Object3D>
}
export class SceneStatusManager extends EventDispatcher<hoverChangeEvent | activeChangeEvent>{

  private scene: Scene
  private camera: Camera
  private selectionBox: SelectionBox
  private selectionHelper: SelectionHelper
  private raycaster: Raycaster
  private hoverObjectSet: Set<Object3D>
  private activeObjectSet: Set<Object3D>

  private transformControls?: VisTransformControls
  private transformControlsFilterMap?: {[key: string]: boolean}

  constructor (camera: Camera, scene: Scene, deep: number = Number.MAX_VALUE) {
    super()

    this.scene = scene
    this.camera = camera
    this.hoverObjectSet = new Set()
    this.activeObjectSet = new Set()
    this.raycaster = new Raycaster()
    this.selectionHelper = new SelectionHelper()
    this.selectionBox = new SelectionBox(camera, scene, deep)
  }

  setCamera (camera: Camera): this {
    this.selectionBox.camera = camera
    this.camera = camera
    return this
  }

  // 过滤掉transformControls的选择
  filterTransformControls (controls: VisTransformControls): this {
    this.transformControlsFilterMap = {}
    this.transformControls = controls
    controls.traverse((object) => {
      this.transformControlsFilterMap![object.uuid] = true
    })
    return this
  }
  
  /// 单选
  checkHoverObject (event: VisPointerEvent): this {
    this.hoverObjectSet.clear()
    const mouse: Vector2 = event.mouse
    this.raycaster.setFromCamera(mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children)
    const reycastObject = this.getRaycastbject(intersects)

    if (reycastObject) {
      reycastObject.dispatchEvent({
        type: 'hover'
      })
      this.hoverObjectSet.add(reycastObject)
    }

    this.dispatchEvent({
      type: 'hover-change',
      objectSet: this.hoverObjectSet
    })

    return this
  }

  checkActiveObject (event: VisPointerEvent): this {

    const activeObjectSet = this.activeObjectSet
    const scene = this.scene

    const mouse: Vector2 = event.mouse
    this.raycaster.setFromCamera(mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children)
    const reycastObject = this.getRaycastbject(intersects)

    activeObjectSet.clear()

    if (reycastObject) {
      reycastObject.dispatchEvent({
        type: 'active'
      })
      activeObjectSet.add(reycastObject)
      
    }

    this.dispatchEvent({
      type: 'active-change',
      objectSet: this.hoverObjectSet
    })
    
    if (this.transformControls) {
      const transformControls = this.transformControls

      if (activeObjectSet.size) {
        scene.add(transformControls.getTarget())
        scene.add(transformControls)
        transformControls.setAttach(...activeObjectSet)
      } else {
        scene.remove(transformControls.getTarget())
        scene.remove(transformControls)
      }
    }
    

    return this
  }

  // 检测选中的物体
  private getRaycastbject (intersects: Intersection[]): Object3D | null {
    if (!intersects.length) {
      return null
    }

    if (!this.transformControlsFilterMap) {
      return intersects[0].object
    }
    
    const transformControlsFilterMap = this.transformControlsFilterMap
    let index = -1
    intersects.some((elem, i, arr) => {
      if (!transformControlsFilterMap[elem.object.uuid]) {
        index = i
        return true
      }
    })

    if (index === -1) {
      return null
    }

    return intersects[index].object
  }

  /// 框选
  // 选择开始
  selectStart(event: VisPointerEvent): this {
    const mouse: Vector2 = event.mouse
    this.selectionHelper.onSelectStart(event)
    this.selectionBox.collection = []
    this.selectionBox.startPoint.set(mouse.x, mouse.y, 0.5)
    return this
  }
  // 选择中
  selecting (event: VisPointerEvent): this {
    this.selectionHelper.onSelectMove(event)
    return this
  }

  // 选择结束
  selectEnd (event: VisPointerEvent): this {
    const activeObjectSet = this.activeObjectSet
    const scene = this.scene
    const mouse: Vector2 = event.mouse
    this.selectionHelper.onSelectOver(event)
    this.selectionBox.endPoint.set(mouse.x, mouse.y, 0.5)
    this.selectionBox.select()

    let collection = this.selectionBox.collection

    // 过滤辅助
    collection = collection.filter(object => !object.type.includes('Helper'))
    
    // 过滤transformControls
    if (this.transformControlsFilterMap) {
      const filterMap = this.transformControlsFilterMap
      collection = collection.filter(object => !filterMap[object.uuid])
    }

    collection.forEach(object => {
      object.dispatchEvent({
        type: 'active'
      })
      activeObjectSet.add(object)
      
    })

    this.dispatchEvent({
      type: 'active-change',
      objectSet: activeObjectSet
    })

    if (this.transformControls) {
      const transformControls = this.transformControls

      if (activeObjectSet.size) {
        scene.add(transformControls.getTarget())
        scene.add(transformControls)
        transformControls.setAttach(...activeObjectSet)
      } else {
        scene.remove(transformControls.getTarget())
        scene.remove(transformControls)
      }
    }
    return this
  }

  getActiveObjectSet (): Set<Object3D> {
    return this.activeObjectSet
  }

  getHoverObjectSet (): Set<Object3D> {
    return this.hoverObjectSet
  }
}