import { Camera, Event, Intersection, Object3D, Raycaster, Scene, Vector2 } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
import { PointerManager, VisPointerEvent } from "./PointerManager";

export interface ObjectEvent extends VisPointerEvent {
  intersection: Intersection<Object3D<Event>>
}

export interface GlobalEvent extends VisPointerEvent {
  intersections: Intersection<Object3D<Event>>[]
}

export interface EventManagerParameters {
  scene: Scene
  camera: Camera
  recursive?: boolean
  penetrate?: boolean
  support?: boolean
}

export enum EVENTNAME {
  POINTERDOWN = 'pointerdown',
  POINTERUP = 'pointerup',
  POINTERMOVE = 'pointermove',
  POINTERENTER = 'pointerenter',
  POINTERLEAVE = 'pointerleave',
  CLICK = 'click',
  DBLCLICK = 'dblclick',
  CONTEXTMENU = 'contextmenu'
}

export class EventManager extends EventDispatcher {

  private raycaster: Raycaster
  private scene: Scene
  private camera: Camera
   recursive: boolean = false // 递归子物体
   penetrate: boolean = false // 事件穿透

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

    const mergeEvent = function (event, object) {
      return Object.assign({}, event, object)
    }

    pointerManager.addEventListener<VisPointerEvent>('pointerdown', (event) => {
      const intersections = this.intersectObject(event.mouse)



      if (intersections.length) {

        // 穿透事件
        if (this.penetrate) {
          if (event.button === 0) {
            for(let intersection of intersections) {
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
                type: 'pointerdown',
                intersection
              }));
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
                type: 'mousedown',
                intersection
              }))
            }
          }
        // 单层事件 
        } else {
          const intersection = intersections[0];
          if (event.button === 0) {
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
              type: 'pointerdown',
              intersection
            }));
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
              type: 'mousedown',
              intersection
            }))
          }
        }
      }

      if (event.button === 0) {
        // 全局事件代理
        this.dispatchEvent(mergeEvent(event, {
          type: 'pointerdown',
          intersections
        }))
        this.dispatchEvent(mergeEvent(event, {
          type: 'mousedown',
          intersections
        }))
      }
    })

    const cacheObjectMap = new Map<Object3D, Intersection<Object3D<Event>>>()
    pointerManager.addEventListener<VisPointerEvent>('pointermove', (event) => {
      const intersections = this.intersectObject(event.mouse)

      if (intersections.length) {
        
        if (this.penetrate) {
          for (let intersection of intersections) {
            if (cacheObjectMap.has(intersection.object)) {
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
                type: 'pointermove',
                intersection
              }));
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
                type: 'mousemove',
                intersection
              }));
            } else {
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
                type: 'pointerenter',
                intersection
              }));
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
                type: 'mouseenter',
                intersection
              }));
            }
          }
        } else {
          const intersection = intersections[0]
          if (cacheObjectMap.has(intersection.object)) {
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
              type: 'pointermove',
              intersection
            }));
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
              type: 'mousemove',
              intersection
            }));
          } else {
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
              type: 'pointerenter',
              intersection
            }));
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
              type: 'mouseenter',
              intersection
            }));
          }
        }

        for (let intersection of intersections) {
          cacheObjectMap.set(intersection.object, intersection)
        }

      } else {
        cacheObjectMap.forEach(intersection => {
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
            type: 'pointerleave',
            intersection
          }));
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
            type: 'mouseleave',
            intersection
          }));
        })

        cacheObjectMap.clear()
      }

      this.dispatchEvent(mergeEvent(event, {
        type: 'pointermove',
        intersections
      }))
      this.dispatchEvent(mergeEvent(event, {
        type: 'mousemove',
        intersections
      }))
    })

    const cacheClickObject: Map<Object3D, boolean> = new Map()
    let cacheClickTimer: number | null = null
    pointerManager.addEventListener<VisPointerEvent>('pointerup', (event) => {
      const intersections = this.intersectObject(event.mouse)

      if (intersections.length) {
        // 穿透事件
        if (this.penetrate) {
          for(let intersection of intersections) {
            if (event.button === 0) {
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
                  type: 'pointerup',
                  intersection
                }));
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
                type: 'mouseup',
                intersection
              }));
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
                type: 'click',
                intersection
              }));

              if (cacheClickObject.has(intersection.object)) {
                (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
                  type: 'dblclick',
                  intersection
                }));
              }
            } else if (event.button === 2) {
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
                type: 'contextmenu',
                intersection
              }));
            }
          }
        // 单层事件 
        } else {
          const intersection = intersections[0];
          if (event.button === 0) {
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
              type: 'pointerup',
              intersection
            }));
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
              type: 'mouseup',
              intersection
            }));
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
              type: 'click',
              intersection
            }));

            if (cacheClickObject.has(intersection.object)) {
              (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
                type: 'dblclick',
                intersection
              }));
            }
          } else if (event.button === 2) {
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(mergeEvent(event, {
              type: 'contextmenu',
              intersection
            }));
          }
        }
      }

      if (event.button === 0) {
        // 全局事件代理
        this.dispatchEvent(mergeEvent(event, {
          type: 'pointerup',
          intersections
        }))
        this.dispatchEvent(mergeEvent(event, {
          type: 'mouseup',
          intersections
        }))
        this.dispatchEvent(mergeEvent(event, {
          type: 'click',
          intersections
        }))

        if (cacheClickTimer) {
          clearTimeout(cacheClickTimer)
          cacheClickTimer = null
          this.dispatchEvent(mergeEvent(event, {
            type: 'dblclick',
            intersections
          }))
        } else {
          if (intersections.length) {
            for (let intersection of intersections) {
              cacheClickObject.set(intersection.object, true)
            }
          }
          cacheClickTimer = setTimeout(() => {
            cacheClickTimer = null
            cacheClickObject.clear()
          }, 300)
        }

      } else if (event.button === 2) {
        this.dispatchEvent(mergeEvent(event, {
          type: 'contextmenu',
          intersections
        }))
      }

    })
    return this
  }

}