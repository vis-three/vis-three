import { BaseEvent, Camera, EventDispatcher, Object3D, Scene } from 'three';
import { VisTransformControls } from '../optimize/VisTransformControls';
import { VisPointerEvent } from './PointerManager';
export declare enum SCENESTATUSTYPE {
    HOVERCHANGE = "hover-change",
    ACTIVECHANGE = "active-change"
}
export interface hoverChangeEvent extends BaseEvent {
    type: 'hover-change';
    objectSet: Set<Object3D>;
}
export interface activeChangeEvent extends BaseEvent {
    type: 'active-change';
    objectSet: Set<Object3D>;
}
export declare class SceneStatusManager extends EventDispatcher<hoverChangeEvent | activeChangeEvent> {
    private scene;
    private camera;
    private selectionBox;
    private selectionHelper;
    private raycaster;
    private hoverObjectSet;
    private activeObjectSet;
    private isSelecting;
    private transformControls?;
    private transformControlsFilterMap?;
    constructor(camera: Camera, scene: Scene, deep?: number);
    private getRaycastbject;
    private triggerActiveEvent;
    private triggerHoverEvent;
    setCamera(camera: Camera): this;
    filterTransformControls(controls: VisTransformControls): this;
    checkHoverObject(event: VisPointerEvent): this;
    checkActiveObject(event: VisPointerEvent): this;
    selectStart(event: VisPointerEvent): this;
    selecting(event: VisPointerEvent): this;
    selectEnd(event: VisPointerEvent): this;
    getActiveObjectSet(): Set<Object3D>;
    getHoverObjectSet(): Set<Object3D>;
    setHoverObjectSet(...object: Object3D[]): this;
    setActiveObject(...object: Object3D[]): this;
}
