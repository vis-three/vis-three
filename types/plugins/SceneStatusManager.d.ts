import { Camera, Object3D, Scene } from 'three';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js';
import { VisPointerEvent } from './PointerManager';
export declare class SceneStatusManager extends SelectionBox {
    private selectionHelper;
    private raycaster;
    private hoverObjectSet;
    private activeObjectSet;
    constructor(dom: HTMLCanvasElement, camera: Camera, scene: Scene, deep?: number);
    setCamera(camera: Camera): this;
    checkHoverObject(event: VisPointerEvent): this;
    checkActiveObject(event: VisPointerEvent): this;
    selectStart(event: VisPointerEvent): this;
    selecting(event: VisPointerEvent): this;
    selectEnd(event: VisPointerEvent): this;
    getActiveObjectSet(): Set<Object3D>;
    getHoverObjectSet(): Set<Object3D>;
}
