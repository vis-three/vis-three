import { Light } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { LightCompiler } from "./LightCompiler";
import { LightConfigAllType } from "./LightConfig";
import { LightRule } from "./LightRule";

export class LightDataSupport extends ObjectDataSupport<
  LightConfigAllType,
  Light,
  LightCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.LIGHT;

  constructor(
    data?: CompilerTarget<LightConfigAllType>,
    ignore?: IgnoreAttribute
  ) {
    !data && (data = {});
    super(LightRule, data, ignore);
  }
}
