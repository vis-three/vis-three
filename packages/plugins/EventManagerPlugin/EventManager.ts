import { EventDispatcher } from "@vis-three/core";
import {
  PointerManager,
  VisPointerEvent,
} from "@vis-three/plugin-pointer-manager";
import {
  Camera,
  Event,
  Intersection,
  Object3D,
  Raycaster,
  Scene,
  Vector2,
} from "three";

export interface ObjectEvent extends VisPointerEvent {
  intersection: Intersection<Object3D<Event>>;
}

export interface GlobalEvent extends VisPointerEvent {
  intersections: Intersection<Object3D<Event>>[];
}

export interface EventManagerParameters {
  /**指定事件触发场景 */
  scene: Scene;
  /**指定事件触发相机 */
  camera: Camera;
  /**是否递归场景物体子集 */
  recursive?: boolean;
  /**是否穿透触发事件，比如2个物体即使重叠都会触发 */
  penetrate?: boolean;
  // support?: boolean;
  /**射线设置 参考three.js的射线设置*/
  raycaster?: {
    params: {
      Line?: { threshold: number };
      Points?: { threshold: number };
    };
  };
}

export enum EVENTNAME {
  POINTERDOWN = "pointerdown",
  POINTERUP = "pointerup",
  POINTERMOVE = "pointermove",
  POINTERENTER = "pointerenter",
  POINTERLEAVE = "pointerleave",
  CLICK = "click",
  DBLCLICK = "dblclick",
  CONTEXTMENU = "contextmenu",
}

export class EventManager extends EventDispatcher {
  /**射线发射器 */
  raycaster: Raycaster;
  /**目标场景 */
  private scene: Scene;
  /**目标相机 */
  private camera: Camera;
  /**不会触发事件的过滤器 */
  private filter = new Set<Object3D>();
  /**递归子物体 */
  recursive = false;
  /**事件穿透 */
  penetrate = false;
  /**@todo 以事件冒泡的形式触发事件 */
  propagation = false;
  /**@todo 以事件委托的形式触发事件 */
  delegation = false;

  constructor(parameters: EventManagerParameters) {
    super();

    this.raycaster = new Raycaster();
    this.camera = parameters.camera;
    this.scene = parameters.scene;

    parameters.recursive && (this.recursive = parameters.recursive);
    parameters.penetrate && (this.penetrate = parameters.penetrate);

    if (parameters.raycaster) {
      Object.assign(this.raycaster.params, parameters.raycaster.params);
    }
  }
  /**
   * 设置当前场景
   * @param scene
   * @returns
   */
  setScene(scene: Scene): this {
    this.scene = scene;
    return this;
  }

  /**
   * 设置当前相机
   * @param camera
   * @returns
   */
  setCamera(camera: Camera): this {
    this.camera = camera;
    return this;
  }

  /**
   * 添加不会触发事件的场景中的物体
   * @param object Object3D
   * @returns
   */
  addFilterObject(object: Object3D): this {
    this.filter.add(object);
    return this;
  }

  /**
   * 移除过滤器中的物体
   * @param object Object3D
   * @returns this
   */
  removeFilterObject(object: Object3D): this {
    this.filter.delete(object);
    return this;
  }

  private intersectObject(mouse: Vector2): Intersection<Object3D<Event>>[] {
    this.raycaster.setFromCamera(mouse, this.camera);
    const filter = this.filter;
    const filterScene = this.scene.children.filter(
      (object) => !filter.has(object)
    );

    return this.raycaster.intersectObjects(filterScene, this.recursive);
  }

  /**
   * 使用pointerManger
   * @param pointerManager 
   * @returns 
   */
  use(pointerManager: PointerManager): this {
    const mergeEvent = function (event, object) {
      return Object.assign({}, event, object);
    };

    const genericEventHanlder = (event: VisPointerEvent, eventName: string) => {
      const intersections = this.intersectObject(event.mouse);
      if (intersections.length) {
        // 穿透事件
        if (this.penetrate) {
          for (const intersection of intersections) {
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
              mergeEvent(event, {
                type: eventName,
                intersection,
              })
            );
          }
          // 单层事件
        } else {
          const intersection = intersections[0];
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
            mergeEvent(event, {
              type: eventName,
              intersection,
            })
          );
        }
      }

      // 全局事件代理
      this.dispatchEvent(
        mergeEvent(event, {
          type: eventName,
          intersections,
        })
      );
    };

    const genericEvents = [
      "pointerdown",
      "pointerup",
      "mousedown",
      "mouseup",
      "pointermove",
      "click",
      "dblclick",
      "contextmenu",
    ];

    for (const name of genericEvents) {
      pointerManager.addEventListener<VisPointerEvent>(name, (event) => {
        genericEventHanlder(event, name);
      });
    }

    const cacheObjectMap = new Map<Object3D, Intersection<Object3D<Event>>>();
    let topCacheIntersection: Intersection<Object3D<Event>> | null = null;

    pointerManager.addEventListener<VisPointerEvent>("pointermove", (event) => {
      const intersections = this.intersectObject(event.mouse);

      // 穿透触发
      if (this.penetrate) {
        // 无交集触发离开，清空缓存
        if (!intersections.length) {
          cacheObjectMap.forEach((intersection) => {
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
              mergeEvent(event, {
                type: "pointerleave",
                intersection,
              })
            );
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
              mergeEvent(event, {
                type: "mouseleave",
                intersection,
              })
            );
          });

          cacheObjectMap.clear();
          return;
        }

        for (const intersection of intersections) {
          // 缓存中存在的物体触发move
          if (cacheObjectMap.has(intersection.object)) {
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
              mergeEvent(event, {
                type: "pointermove",
                intersection,
              })
            );
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
              mergeEvent(event, {
                type: "mousemove",
                intersection,
              })
            );
            cacheObjectMap.delete(intersection.object);
          } else {
            // 缓存中没有物体触发enter
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
              mergeEvent(event, {
                type: "pointerenter",
                intersection,
              })
            );
            (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
              mergeEvent(event, {
                type: "mouseenter",
                intersection,
              })
            );
          }
        }

        // 缓存中剩下的物体触发leave
        for (const intersection of cacheObjectMap.values()) {
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
            mergeEvent(event, {
              type: "pointerleave",
              intersection,
            })
          );
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
            mergeEvent(event, {
              type: "mouseleave",
              intersection,
            })
          );
        }

        // 重新记录缓存
        cacheObjectMap.clear();
        for (const intersection of intersections) {
          cacheObjectMap.set(intersection.object, intersection);
        }
      } else {
        // 没交集
        if (!intersections.length) {
          // 有缓存触发leave
          if (topCacheIntersection) {
            (
              topCacheIntersection.object as Object3D<ObjectEvent>
            ).dispatchEvent(
              mergeEvent(event, {
                type: "pointerleave",
                intersection: topCacheIntersection,
              })
            );
            (
              topCacheIntersection.object as Object3D<ObjectEvent>
            ).dispatchEvent(
              mergeEvent(event, {
                type: "mouseleave",
                intersection: topCacheIntersection,
              })
            );
            topCacheIntersection = null;
          }
          return;
        }

        const intersection = intersections[0];
        // 没缓存触发enter 并缓存
        if (!topCacheIntersection) {
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
            mergeEvent(event, {
              type: "pointerenter",
              intersection,
            })
          );
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
            mergeEvent(event, {
              type: "mouseenter",
              intersection,
            })
          );

          topCacheIntersection = intersection;
          return;
        }

        // 如何当前与缓存不一致触发缓存leave 触发当前enter 缓存
        if (intersection.object !== topCacheIntersection.object) {
          (topCacheIntersection.object as Object3D<ObjectEvent>).dispatchEvent(
            mergeEvent(event, {
              type: "pointerleave",
              intersection,
            })
          );
          (topCacheIntersection.object as Object3D<ObjectEvent>).dispatchEvent(
            mergeEvent(event, {
              type: "mouseleave",
              intersection,
            })
          );

          (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
            mergeEvent(event, {
              type: "pointerenter",
              intersection,
            })
          );
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
            mergeEvent(event, {
              type: "mouseenter",
              intersection,
            })
          );

          topCacheIntersection = intersection;

          return;
        }

        // 一致触发move
        if (intersection.object === topCacheIntersection.object) {
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
            mergeEvent(event, {
              type: "pointermove",
              intersection,
            })
          );
          (intersection.object as Object3D<ObjectEvent>).dispatchEvent(
            mergeEvent(event, {
              type: "mousemove",
              intersection,
            })
          );
        }
      }

      this.dispatchEvent(
        mergeEvent(event, {
          type: "pointermove",
          intersections,
        })
      );
      this.dispatchEvent(
        mergeEvent(event, {
          type: "mousemove",
          intersections,
        })
      );
    });

    return this;
  }
}
