import { BaseEvent, EventDispatcher, Object3D } from "three";
import { ModelingScene } from "./ModelingScene";
export declare enum HELPERCOMPILEREVENTTYPE {
    ADD = "add",
    REMOVE = "remove"
}
export interface AddHelperEvent extends BaseEvent {
    type: HELPERCOMPILEREVENTTYPE.ADD;
    helper: Object3D;
    object: Object3D;
}
export interface RemoveHelperEvent extends BaseEvent {
    type: HELPERCOMPILEREVENTTYPE.REMOVE;
    helper: Object3D;
    object: Object3D;
}
export declare class SceneHelperCompiler extends EventDispatcher<AddHelperEvent | RemoveHelperEvent> {
    private static helperColorHex;
    private static activeColorHex;
    private static hoverColorHex;
    private static typeHelperMap;
    private static filterHelperMap;
    private map;
    private scene;
    constructor(scene: ModelingScene);
    getMap(): Map<Object3D, Object3D>;
    add(object: Object3D): void;
    remove(object: Object3D): void;
    setVisiable(visiable: boolean): void;
    resetHelperColor(...object: Object3D[]): void;
    setHelperHoverColor(...object: Object3D[]): void;
    setHelperActiveColor(...object: Object3D[]): void;
}
