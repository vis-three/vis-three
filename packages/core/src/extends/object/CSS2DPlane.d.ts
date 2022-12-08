import { Box3, Intersection, Raycaster, Vector3 } from "three";
import { VisCSS2DObject } from "../../optimize/VisCSS2DObject";
export declare class CSS2DPlane extends VisCSS2DObject {
    protected cacheBox: Box3;
    private viewWorldMatrix;
    private mvPosition;
    matrixScale: Vector3;
    private worldScale;
    private vA;
    private vB;
    private vC;
    private alignedPosition;
    private rotatedPosition;
    private intersectPoint;
    constructor(element?: HTMLElement);
    private transformVertex;
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
