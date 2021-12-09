import { Camera, Frustum, Intersection, Object3D, Raycaster, Scene, Vector2, Vector3 } from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js'
import { VisPointerEvent } from './PointerManager'
import { SelectionHelper } from './SelectionHelper'

export class SceneStatusManager extends SelectionBox{
  private selectionHelper: SelectionHelper
  private raycaster: Raycaster
  private hoverObjectSet: Set<Object3D>
  private activeObjectSet: Set<Object3D>

  private transformControlsFilterMap?: {[key: string]: boolean}

  constructor (camera: Camera, scene: Scene, deep: number = Number.MAX_VALUE) {
    super(camera, scene, deep)

    this.hoverObjectSet = new Set()
    this.activeObjectSet = new Set()
    this.raycaster = new Raycaster()
    this.selectionHelper = new SelectionHelper()
  }

  setCamera (camera: Camera): this {
    this.camera = camera
    return this
  }

  // 过滤掉transformControls的选择
  filterTransformControls (controls: TransformControls): this {
    this.transformControlsFilterMap = {}
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
    reycastObject && this.hoverObjectSet.add(reycastObject)
    return this
  }

  checkActiveObject (event: VisPointerEvent): this {
    this.activeObjectSet.clear()
    const mouse: Vector2 = event.mouse
    this.raycaster.setFromCamera(mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children)
    const reycastObject = this.getRaycastbject(intersects)
    reycastObject && this.activeObjectSet.add(reycastObject)
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
    this.collection = []
    this.startPoint.set(mouse.x, mouse.y, 0.5)
    return this
  }
  // 选择中
  selecting (event: VisPointerEvent): this {
    this.selectionHelper.onSelectMove(event)
    return this
  }

  // 选择结束
  selectEnd (event: VisPointerEvent): this {
    const mouse: Vector2 = event.mouse
    this.selectionHelper.onSelectOver(event)
    this.endPoint.set(mouse.x, mouse.y, 0.5)
    this.select()

    let collection = this.collection

    // 过滤辅助
    collection = collection.filter(object => !object.type.includes('Helper'))
    
    // 过滤transformControls
    if (this.transformControlsFilterMap) {
      const filterMap = this.transformControlsFilterMap
      collection = collection.filter(object => !filterMap[object.uuid])
    }

    collection.forEach(object => {
      this.activeObjectSet.add(object)
    })
    return this
  }

  getActiveObjectSet (): Set<Object3D> {
    return this.activeObjectSet
  }

  getHoverObjectSet (): Set<Object3D> {
    return this.hoverObjectSet
  }
}