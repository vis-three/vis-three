import { DataSupport } from "../module";
import { Material } from "three";
import { MODULETYPE } from "../constants";
import { MaterialCompiler } from "./MaterialCompiler";
import { MaterialAllType } from "./MaterialConfig";
import { MaterialRule } from "./MaterialRule";

export class MaterialDataSupport extends DataSupport<
  MaterialAllType,
  Material,
  MaterialCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.MATERIAL;

  constructor(data: Array<MaterialAllType> = []) {
    super(MaterialRule, data);
  }
}
