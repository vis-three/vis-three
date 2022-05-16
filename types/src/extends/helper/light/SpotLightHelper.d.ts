import { Intersection, LineSegments, Raycaster, Sphere, SpotLight } from "three";
import { VisHelper } from "../common";
export declare class SpotLightHelper extends LineSegments implements VisHelper {
    sphere: Sphere;
    target: SpotLight;
    shape: LineSegments;
    type: string;
    private cacheVector3;
    private cacheColor;
    private cacheAngle;
    private cacheDistance;
    constructor(spotLight: SpotLight);
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
