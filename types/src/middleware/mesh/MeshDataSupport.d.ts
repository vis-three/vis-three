import { Mesh } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/DataContainer";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { MeshCompiler } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";
export declare class MeshDataSupport extends SolidObjectDataSupport<
  MeshConfig,
  Mesh,
  MeshCompiler
> {
  MODULE: MODULETYPE;
  constructor(data?: CompilerTarget<MeshConfig>, ignore?: IgnoreAttribute);
}
