import { LineSegments } from "three";
import { CSS3DPlane } from "../../../optimize/CSS3DPlane";
import { VisHelper } from "../common";
export declare class CSS3DPlaneHelper extends LineSegments implements VisHelper {
    target: CSS3DPlane;
    type: string;
    private observer;
    constructor(target: CSS3DPlane);
    dispose(): void;
}
