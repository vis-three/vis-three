import { Light } from "three";
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

  constructor(data: Array<LightConfigAllType> = []) {
    super(LightRule, data);
  }
}
