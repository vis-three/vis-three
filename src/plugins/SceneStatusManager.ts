import { Camera, Object3D, Raycaster, Scene, Vector2 } from 'three'
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js'
import { VisPointerEvent } from './PointerManager'
import { SelectionHelper } from './SelectionHelper'

export class SceneStatusManager extends SelectionBox{
  private selectionHelper: SelectionHelper
  private raycaster: Raycaster
  private hoverObjectSet: Set<Object3D>
  private activeObjectSet: Set<Object3D>

  constructor (dom: HTMLCanvasElement, camera: Camera, scene: Scene, deep?: number) {
    super(camera, scene, deep)

    this.hoverObjectSet = new Set()
    this.activeObjectSet = new Set()
    this.raycaster = new Raycaster()
    this.selectionHelper = new SelectionHelper(dom)
  }

  setCamera (camera: Camera): this {
    this.camera = camera
    return this
  }
  
  /// 单选
  checkHoverObject (event: VisPointerEvent): this {
    this.hoverObjectSet.clear()
    const mouse: Vector2 = event.mouse
    this.raycaster.setFromCamera(mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children)
    if (intersects[0]) {
      this.hoverObjectSet.add(intersects[0].object)
    }
    return this
  }

  checkActiveObject (event: VisPointerEvent): this {
    this.activeObjectSet.clear()
    const mouse: Vector2 = event.mouse
    this.raycaster.setFromCamera(mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children)
    if (intersects[0]) {
      this.activeObjectSet.add(intersects[0].object)
    }
    return this
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
    
    this.collection.forEach(object => {
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