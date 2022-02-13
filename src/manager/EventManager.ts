import { Camera, Event, Intersection, Object3D, Raycaster, Scene, Vector2 } from "three";
import { EventDispatcher } from "../middleware/EventDispatcher";
import { PointerManager, VisPointerEvent } from "./PointerManager";

export interface ObjectEvent extends Event {
  intersection: Intersection<Object3D<Event>>
}

export interface EventManagerParameters {
  scene: Scene
  camera: Camera
  recursive?: boolean
  penetrate?: boolean
}

export class EventManager extends EventDispatcher {

  private raycaster: Raycaster
  private scene: Scene
  private camera: Camera
  private recursive: boolean = false
  private penetrate: boolean = false

  constructor (parameters: EventManagerParameters) {
    super()

    this.raycaster = new Raycaster()
    this.camera = parameters.camera
    this.scene = parameters.scene

    parameters.recursive && (this.recursive = parameters.recursive)
    parameters.penetrate && (this.penetrate = parameters.penetrate)
  }

  setCamera (camera: Camera): this {
    this.camera = camera
    return this
  }

  intersectObject (mouse: Vector2): Intersection<Object3D<Event>>[] {
    this.raycaster.setFromCamera(mouse, this.camera)
    return this.raycaster.intersectObjects(this.scene.children, this.recursive)
  }

  use(pointerManager: PointerManager): this {

    pointerManager.addEventListener<VisPointerEvent>('pointerdown', (event) => {
      const intersections = this.intersectObject(event.mouse)

      if (intersections.length) {
        // 全局事件代理
        this.dispatchEvent({
          type: 'pointerdown',
          intersections
        })
        this.dispatchEvent({
          type: 'mousedown',
          intersections
        })

        // 穿透事件
        if (this.penetrate) {
          for(let intersection of intersections) {
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
              type: 'pointerdown',
              intersection
            });
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
              type: 'mousedown',
              intersection
            })
          }
        // 单层事件 
        } else {
          const intersection = intersections[0];
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
            type: 'pointerdown',
            intersection
          });
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
            type: 'mousedown',
            intersection
          })
        }
      }
    })

    const cacheObjectMap = new Map<Object3D, Intersection<Object3D<Event>>>()
    pointerManager.addEventListener<VisPointerEvent>('pointermove', (event) => {
      const intersections = this.intersectObject(event.mouse)

      if (intersections.length) {
        this.dispatchEvent({
          type: 'pointermove',
          intersections
        })
        this.dispatchEvent({
          type: 'mousemove',
          intersections
        })
        
        if (this.penetrate) {
          for (let intersection of intersections) {
            if (cacheObjectMap.has(intersection.object)) {
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
                type: 'pointermove',
                intersection
              });
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
                type: 'mousemove',
                intersection
              });
            } else {
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
                type: 'pointerenter',
                intersection
              });
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
                type: 'mouseenter',
                intersection
              });
            }
          }
        } else {
          const intersection = intersections[0]
          if (cacheObjectMap.has(intersection.object)) {
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
              type: 'pointermove',
              intersection
            });
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
              type: 'mousemove',
              intersection
            });
          } else {
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
              type: 'pointerenter',
              intersection
            });
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
              type: 'mouseenter',
              intersection
            });
          }
        }

        for (let intersection of intersections) {
          cacheObjectMap.set(intersection.object, intersection)
        }

      } else {
        cacheObjectMap.forEach(intersection => {
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
            type: 'pointerleave',
            intersection
          });
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
            type: 'mouseleave',
            intersection
          });
        })

        cacheObjectMap.clear()
      }
    })

    pointerManager.addEventListener<VisPointerEvent>('pointup', (event) => {
      const intersections = this.intersectObject(event.mouse)

      if (intersections.length) {
        // 全局事件代理
        this.dispatchEvent({
          type: 'pointerup',
          intersections
        })
        this.dispatchEvent({
          type: 'mouseup',
          intersections
        })
        this.dispatchEvent({
          type: 'click',
          intersections
        })

        // 穿透事件
        if (this.penetrate) {
          for(let intersection of intersections) {
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
              type: 'pointerup',
              intersection
            });
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
              type: 'mouseup',
              intersection
            });
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
              type: 'click',
              intersection
            });
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
              type: 'click',
              intersection
            })
          }
        // 单层事件 
        } else {
          const intersection = intersections[0];
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
            type: 'pointerup',
            intersection
          });
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
            type: 'mouseup',
            intersection
          });
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
            type: 'click',
            intersection
          });
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent({
            type: 'click',
            intersection
          })
        }
      }
    })
    return this
  }

}