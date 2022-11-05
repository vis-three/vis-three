import { Material } from "three";
import { DataSupport } from "../../core/DataSupport";
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

  constructor(data: Array<MaterialAllType> = []) {
    super(MaterialRule, data);
  }
}
