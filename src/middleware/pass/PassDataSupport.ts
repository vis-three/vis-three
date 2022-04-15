import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { PassCompiler, PassCompilerTarget } from "./PassCompiler";
import { PassRule } from "./PassRule";

export class PassDataSupport extends DataSupport<
  PassCompilerTarget,
  PassCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.PASS;

  constructor(data?: PassCompilerTarget) {
    !data && (data = {});
    super(PassRule, data);
  }
}
