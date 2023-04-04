import { Vector3 } from "three";
import { CurveGeometry } from "./CurveGeometry";
export declare class QuadraticBezierCurveGeometry extends CurveGeometry {
    constructor(path?: Vector3[], divisions?: number, space?: boolean);
}
