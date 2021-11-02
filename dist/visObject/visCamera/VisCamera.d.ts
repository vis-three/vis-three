import { Camera } from "three";
import { VisObject3D } from "../VisObject";
export interface VisCameraAttribute {
    setSize(width: number, height: number): void;
}
export declare type VisCamera = Camera & VisCameraAttribute & VisObject3D;
//# sourceMappingURL=VisCamera.d.ts.map