import { DirectionalLight, Intersection, Line, LineSegments, Raycaster, Sphere } from "three";
import { VisHelper } from "../common";
export declare class DirectionalLightHelper extends LineSegments implements VisHelper {
    sphere: Sphere;
    target: DirectionalLight;
    shape: Line;
    type: string;
    private cacheColor;
    private cacheVector3;
    constructor(directionalLight: DirectionalLight);
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
