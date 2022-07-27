import { Material } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { MaterialCompiler } from "./MaterialCompiler";
import { MaterialAllType } from "./MaterialConfig";
import { MaterialRule } from "./MaterialRule";

export class MaterialDataSupport extends DataSupport<
  MaterialAllType,
  Material,
  MaterialCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.MATERIAL;

  constructor(
    data?: CompilerTarget<MaterialAllType>,
    ignore?: IgnoreAttribute
  ) {
    !data && (data = {});
    super(MaterialRule, data, ignore);
  }
}
