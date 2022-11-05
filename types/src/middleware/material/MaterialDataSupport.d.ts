import { Material } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/DataContainer";
import { MODULETYPE } from "../constants/MODULETYPE";
import { MaterialCompiler } from "./MaterialCompiler";
import { MaterialAllType } from "./MaterialConfig";
export declare class MaterialDataSupport extends DataSupport<
  MaterialAllType,
  Material,
  MaterialCompiler
> {
  MODULE: MODULETYPE;
  constructor(data?: CompilerTarget<MaterialAllType>, ignore?: IgnoreAttribute);
}
