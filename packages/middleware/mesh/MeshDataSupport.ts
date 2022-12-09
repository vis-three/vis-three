import { Mesh } from "three";
import { MODULETYPE } from "../../core/middleware/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { MeshCompiler } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";
import { MeshRule } from "./MeshRule";

export class MeshDataSupport extends SolidObjectDataSupport<
  MeshConfig,
  Mesh,
  MeshCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.MESH;

  constructor(data: Array<MeshConfig> = []) {
    super(MeshRule, data);
  }
}
