import { OrthographicCamera } from "three";
import { VisCameraAttribute } from './VisCamera';
import { VisObject3DAttribute } from "../VisObject";
export declare class VisOrthographicCamera extends OrthographicCamera implements VisCameraAttribute, VisObject3DAttribute {
    vid: string;
    constructor(left: number, right: number, top: number, bottom: number, near?: number, far?: number);
    setSize(width: number, height: number): void;
}
//# sourceMappingURL=VisOrthographicCamera.d.ts.map