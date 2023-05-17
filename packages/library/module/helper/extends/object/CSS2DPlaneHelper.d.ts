import { LineSegments } from "three";
import { CSS2DPlane } from "@vis-three/module-css2d/extends/CSS2DPlane";
import { VisHelper } from "../common";
export declare class CSS2DPlaneHelper extends LineSegments implements VisHelper {
    target: CSS2DPlane;
    type: string;
    private observer;
    constructor(target: CSS2DPlane);
    dispose(): void;
}
