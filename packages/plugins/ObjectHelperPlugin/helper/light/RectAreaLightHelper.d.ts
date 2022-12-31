import { Intersection, LineSegments, Raycaster, RectAreaLight } from "three";
import { VisHelper } from "../common";
export declare class RectAreaLightHelper extends LineSegments implements VisHelper {
    target: RectAreaLight;
    type: string;
    private cacheBox;
    private cacheVector3;
    private cacheColor;
    private cacheIntensity;
    constructor(rectAreaLight: RectAreaLight);
    private generateShape;
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
