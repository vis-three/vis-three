import { EventDispatcher } from "@vis-three/core";
import { Mesh, MeshBasicMaterial, OrthographicCamera, Plane, PlaneBufferGeometry, Vector3 } from "three";
export interface Face {
    a: Vector3;
    b: Vector3;
    c: Vector3;
}
export declare class PathSketcher extends EventDispatcher {
    camera: OrthographicCamera;
    plane: Plane;
    helper: Mesh<PlaneBufferGeometry, MeshBasicMaterial>;
    constructor();
    offsetCamera(offset: Vector3): void;
    setDrawPlane(normal: Vector3, constant?: number): this;
    setDrawPlaneByFace(face: Face): this;
    private setHelperMatrix;
    dispose(): void;
}
