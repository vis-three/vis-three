export declare enum LifeCycleHooks {
    MOUNTED = "mounted",
    BEFORE_DISTORY = "beforeDistory",
    UPDATE = "update"
}
export declare const onMounted: (fn?: Function) => void;
export declare const onBeforeDistory: (fn?: Function) => void;
