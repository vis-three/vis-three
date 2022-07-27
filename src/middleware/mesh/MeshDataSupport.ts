import { Mesh } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
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

  constructor(data?: CompilerTarget<MeshConfig>, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(MeshRule, data, ignore);
  }
}
