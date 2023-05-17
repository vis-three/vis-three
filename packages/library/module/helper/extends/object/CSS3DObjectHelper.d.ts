import { Intersection, LineSegments, Raycaster } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { VisHelper } from "../common";
export declare class CSS3DObjectHelper extends LineSegments implements VisHelper {
    target: CSS3DObject;
    type: string;
    constructor(target: CSS3DObject);
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
    dispose(): void;
}
