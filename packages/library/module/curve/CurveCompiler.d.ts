import { Compiler } from "@vis-three/middleware";
import { CurveAllType } from "./CurveConfig";
import { Curve, Vector2, Vector3 } from "three";
export declare class CurveCompiler extends Compiler<CurveAllType, Curve<Vector2 | Vector3>> {
    constructor();
}
