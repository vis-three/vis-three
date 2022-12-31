import { CSS3DPlane } from "@vis-three/core";
import { LineSegments } from "three";
import { VisHelper } from "../common";
export declare class CSS3DPlaneHelper extends LineSegments implements VisHelper {
    target: CSS3DPlane;
    type: string;
    private observer;
    constructor(target: CSS3DPlane);
    dispose(): void;
}
