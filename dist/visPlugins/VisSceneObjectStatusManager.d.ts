import { VisCamera } from "../visObject/visCamera/VisCamera";
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js';
import { VisScene } from "../visCore/VisScene";
import { VisPointerEvent } from './VisMouseManager';
import { VisObject3D } from "../visObject/VisObject";
export declare class VisSceneObjectStatusManager extends SelectionBox {
    private selectionHelper;
    private raycaster;
    private hoverObjectSet;
    private activeObjectSet;
    constructor(dom: HTMLCanvasElement, camera: VisCamera, scene: VisScene, deep?: number);
    setCamera(camera: VisCamera): this;
    checkHoverObject(event: VisPointerEvent): this;
    checkActiveObject(event: VisPointerEvent): this;
    selectStart(event: VisPointerEvent): this;
    selecting(event: VisPointerEvent): this;
    selectEnd(event: VisPointerEvent): this;
    getActiveObjectSet(): Set<VisObject3D>;
    getHoverObjectSet(): Set<VisObject3D>;
}
//# sourceMappingURL=VisSceneObjectStatusManager.d.ts.map