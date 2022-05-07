import { Light } from "three";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { LightCompiler, LightCompilerTarget } from "./LightCompiler";
import { LightConfigAllType } from "./LightConfig";
import { LightRule } from "./LightRule";

export class LightDataSupport extends ObjectDataSupport<
  LightRule,
  LightCompiler,
  LightConfigAllType,
  LightCompilerTarget,
  Light
> {
  MODULE: MODULETYPE = MODULETYPE.LIGHT;

  constructor(data?: LightCompilerTarget, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(LightRule, data, ignore);
  }
}
