import { DataSupport, MODULETYPE } from "@vis-three/middleware";
import { Pass } from "three/examples/jsm/postprocessing/Pass";

import { PassCompiler } from "./PassCompiler";
import { PassConfigAllType } from "./PassConfig";
import { PassRule } from "./PassRule";

export class PassDataSupport extends DataSupport<
  PassConfigAllType,
  Pass,
  PassCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.PASS;

  constructor(data: Array<PassConfigAllType> = []) {
    super(PassRule, data);
  }
}
