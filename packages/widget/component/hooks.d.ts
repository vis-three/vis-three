export declare enum LifeCycleHooks {
    MOUNTED = "mounted",
    BEFORE_DISTORY = "beforeDistory",
    UPDATE = "update",
    FRAME = "frame",
    CAMERA_CHANGE = "cameraChange",
    SCENE_CHANGE = "sceneCHange"
}
/**
 * 组件挂载完成后的钩子函数
 * @param fn 函数方法
 */
export declare const onMounted: (fn?: Function) => void;
/**
 * 组件销毁之前的钩子函数
 * @param fn 函数方法
 */
export declare const onBeforeDistory: (fn?: Function) => void;
/**
 * 组件在每帧渲染时的钩子函数
 * @param fn 函数方法
 */
export declare const onFrame: (fn?: Function) => void;
