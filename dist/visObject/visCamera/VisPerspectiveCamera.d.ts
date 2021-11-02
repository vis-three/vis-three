import { PerspectiveCamera } from "three";
import { VisObject3DAttribute } from "../VisObject";
import { VisCameraAttribute } from './VisCamera';
export declare class VisPerspectiveCamera extends PerspectiveCamera implements VisCameraAttribute, VisObject3DAttribute {
    vid: string;
    constructor(fov?: number, aspect?: number, near?: number, far?: number);
    setSize(width: number, height: number): void;
}
//# sourceMappingURL=VisPerspectiveCamera.d.ts.map