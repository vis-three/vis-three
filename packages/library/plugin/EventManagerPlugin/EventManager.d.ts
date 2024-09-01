import { EventDispatcher } from "@vis-three/core";
import { PointerManager, VisPointerEvent } from "@vis-three/plugin-pointer-manager";
import { Camera, Intersection, Object3D, Object3DEventMap, Raycaster, Scene } from "three";
export interface ObjectEvent extends VisPointerEvent, Object3DEventMap {
    intersection: Intersection<Object3D<Object3DEventMap>>;
}
export interface GlobalEvent extends VisPointerEvent, Object3DEventMap {
    intersections: Intersection<Object3D<Object3DEventMap>>[];
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
    /**射线设置 参考three.js的射线设置*/
    raycaster?: {
        params: {
            Line?: {
                threshold: number;
            };
            Points?: {
                threshold: number;
            };
        };
    };
}
export declare enum EVENTNAME {
    POINTERDOWN = "pointerdown",
    POINTERUP = "pointerup",
    POINTERMOVE = "pointermove",
    POINTERENTER = "pointerenter",
    POINTERLEAVE = "pointerleave",
    CLICK = "click",
    DBLCLICK = "dblclick",
    CONTEXTMENU = "contextmenu"
}
export declare class EventManager extends EventDispatcher {
    /**射线发射器 */
    raycaster: Raycaster;
    /**目标场景 */
    private scene;
    /**目标相机 */
    private camera;
    /**不会触发事件的过滤器 */
    private filter;
    /**递归子物体 */
    recursive: boolean;
    /**事件穿透 */
    penetrate: boolean;
    /**@todo 以事件冒泡的形式触发事件 */
    propagation: boolean;
    /**@todo 以事件委托的形式触发事件 */
    delegation: boolean;
    constructor(parameters: EventManagerParameters);
    /**
     * 设置当前场景
     * @param scene
     * @returns
     */
    setScene(scene: Scene): this;
    /**
     * 设置当前相机
     * @param camera
     * @returns
     */
    setCamera(camera: Camera): this;
    /**
     * 添加不会触发事件的场景中的物体
     * @param object Object3D
     * @returns
     */
    addFilterObject(object: Object3D): this;
    /**
     * 移除过滤器中的物体
     * @param object Object3D
     * @returns this
     */
    removeFilterObject(object: Object3D): this;
    private intersectObject;
    /**
     * 使用pointerManger
     * @param pointerManager
     * @returns
     */
    use(pointerManager: PointerManager): this;
}
