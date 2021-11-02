import { VisCamera } from "../visObject/visCamera/VisCamera";
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js'
import { VisSelectionHelper } from '../visInteractive/VisSelectionHelper'
import { VisScene } from "../visCore/VisScene"
import { Mesh, Object3D, Raycaster, Vector2, Vector3 } from "three";
import { VisPointerEvent } from './VisMouseManager'
import { VisObject3D } from "../visObject/VisObject";
import { VisMesh } from "../visObject/VisMesh";

export class VisSceneObjectStatusManager extends SelectionBox{
  private selectionHelper: VisSelectionHelper
  private raycaster: Raycaster
  private hoverObjectSet: Set<VisObject3D>
  private activeObjectSet: Set<VisObject3D>

  constructor (dom: HTMLCanvasElement, camera: VisCamera, scene: VisScene, deep?: number) {
    super(camera, scene, deep)

    this.hoverObjectSet = new Set()
    this.activeObjectSet = new Set()
    this.raycaster = new Raycaster()
    this.selectionHelper = new VisSelectionHelper(dom)
  }

  setCamera (camera: VisCamera): this {
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
      this.hoverObjectSet.add(intersects[0].object as VisObject3D)
    }
    return this
  }

  checkActiveObject (event: VisPointerEvent): this {
    this.activeObjectSet.clear()
    const mouse: Vector2 = event.mouse
    this.raycaster.setFromCamera(mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children)
    if (intersects[0]) {
      this.activeObjectSet.add(intersects[0].object as VisObject3D)
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
      this.activeObjectSet.add(object as VisMesh)
    })
    return this
  }

  getActiveObjectSet (): Set<VisObject3D> {
    return this.activeObjectSet
  }

  getHoverObjectSet (): Set<VisObject3D> {
    return this.hoverObjectSet
  }
}