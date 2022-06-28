import { Intersection, Raycaster } from "three";
import { VisCSS3DObject } from "./VisCSS3DObject";
export declare class CSS3DPlane extends VisCSS3DObject {
    constructor(element?: HTMLElement);
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
