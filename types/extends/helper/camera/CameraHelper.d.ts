import { Box3, Camera, CameraHelper as TCameraHelper, Intersection, LineSegments, Raycaster } from "three";
import { VisHelper } from "../common";
export declare class CameraHelper extends LineSegments implements VisHelper {
    box: Box3;
    shape: TCameraHelper;
    target: Camera;
    type: string;
    private cachaData;
    constructor(camera: Camera);
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
