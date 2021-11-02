import { Mesh, BufferGeometry, Material } from "three";
import { VisObject3DAttribute } from "./VisObject";
export declare class VisMesh<TGeometry extends BufferGeometry = BufferGeometry, TMaterial extends Material | Material[] = Material | Material[]> extends Mesh implements VisObject3DAttribute {
    vid: string;
    constructor(geometry?: TGeometry, material?: TMaterial);
}
//# sourceMappingURL=VisMesh.d.ts.map