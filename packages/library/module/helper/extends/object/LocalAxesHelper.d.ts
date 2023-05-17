import { LineSegments, Object3D } from "three";
import { VisHelper } from "../common";
export declare class LocalAxesHelper extends LineSegments implements VisHelper {
    target: Object3D;
    constructor(target: Object3D);
    dispose(): void;
}
