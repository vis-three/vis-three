export declare enum LifeCycleHooks {
    MOUNTED = "mounted",
    BEFORE_DISTORY = "beforeDistory",
    UPDATE = "update",
    FRAME = "frame",
    CAMERA_CHANGE = "cameraChange",
    SCENE_CHANGE = "sceneCHange"
}
export declare const onMounted: (fn?: Function) => void;
export declare const onBeforeDistory: (fn?: Function) => void;
export declare const onFrame: (fn?: Function) => void;
