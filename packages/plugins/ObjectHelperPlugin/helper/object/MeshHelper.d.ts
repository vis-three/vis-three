import { LineSegments, Mesh } from "three";
import { VisHelper } from "../common";
export declare class MeshHelper extends LineSegments implements VisHelper {
    target: Mesh;
    type: string;
    private cachaGeometryUUid;
    constructor(mesh: Mesh);
}
