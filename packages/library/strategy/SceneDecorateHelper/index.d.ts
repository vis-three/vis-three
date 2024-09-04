import { Engine, Strategy } from "@vis-three/core";
export interface AfterAddEvent extends BaseEvent {
    objects: Object3D[];
}
export interface AfterRemoveEvent extends BaseEvent {
    objects: Object3D[];
}
export declare const AFTERADD = "afterAdd";
export declare const AFTERREMOVE = "afterRemove";
export declare const SCENE_DECORATE_HELPER_STRATEGY: string;
export declare const SceneDecorateHelperStrategy: Strategy<Engine>;
