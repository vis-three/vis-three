import { Mesh, BufferGeometry, Material } from "three";
import { VisObject3DAttribute } from "./VisObject";

// VisMesh TODO: VisMaterial
export class VisMesh<
  TGeometry extends BufferGeometry = BufferGeometry,
  TMaterial extends Material | Material[] = Material | Material[],
> extends Mesh implements VisObject3DAttribute {

  vid: string = ''

  constructor (geometry?: TGeometry, material?: TMaterial) {
    super(geometry, material)
  }
}