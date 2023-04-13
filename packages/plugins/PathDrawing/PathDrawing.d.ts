import { EventDispatcher } from "@vis-three/core";
import { OrthographicCamera, Plane, Vector3 } from "three";
export declare class PathDrawing extends EventDispatcher {
    camera: OrthographicCamera;
    plane: Plane;
    constructor();
    setDrawPlane(normal: Vector3, constant?: number): this;
}
