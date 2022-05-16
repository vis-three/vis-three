import { Intersection, Raycaster } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
export declare class CSS3DPlane extends CSS3DObject {
    private geometry;
    constructor(element?: HTMLElement);
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
