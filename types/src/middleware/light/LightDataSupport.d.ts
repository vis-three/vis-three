import { Light } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/DataContainer";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { LightCompiler } from "./LightCompiler";
import { LightConfigAllType } from "./LightConfig";
export declare class LightDataSupport extends ObjectDataSupport<
  LightConfigAllType,
  Light,
  LightCompiler
> {
  MODULE: MODULETYPE;
  constructor(
    data?: CompilerTarget<LightConfigAllType>,
    ignore?: IgnoreAttribute
  );
}
