import { MODULETYPE } from "../constants";
import { DataSupport, Rule } from "../module";
import { SolidObject3D, SolidObjectCompiler } from "./SolidObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";

export class SolidObjectDataSupport<
  C extends SolidObjectConfig,
  O extends SolidObject3D,
  P extends SolidObjectCompiler<C, O>
> extends DataSupport<C, O, P> {
  MODULE: MODULETYPE = MODULETYPE.MESH;

  constructor(rule: Rule<SolidObjectCompiler<C, O>>, data: Array<C> = []) {
    super(rule, data);
  }
}
