import { VisEngine } from "../visCore/VisEngine";
import { VisScene } from "../visCore/VisScene";
import { VisObject3D } from "../visObject/VisObject";
export declare class VisModelingEngine {
    private visEngine;
    private stats;
    private orbitControls;
    private transformControls;
    private pointerManager;
    private sceneObjectStatusManager;
    private composer;
    private renderFun;
    private hoverObjectSet;
    private activeObjectSet;
    constructor(dom?: HTMLElement);
    render(): void;
    stop(): void;
    getEngine(): VisEngine;
    getScene(): VisScene;
    setSize(width: number, height: number): this;
    setStats(show: boolean): this;
    setHoverObjectSet(list: Array<VisObject3D>): this;
    setActiveObjectSet(list: Array<VisObject3D>): this;
}
//# sourceMappingURL=VisModelingEngine.d.ts.map