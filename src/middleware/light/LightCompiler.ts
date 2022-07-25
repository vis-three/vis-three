import { Light } from "three";
import { LightConfigAllType } from "./LightConfig";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { Compiler } from "../../core/Compiler";
import AmbientLightProcessor from "./processor/AmbientLightProcessor";
import DirectionalLightProcessor from "./processor/DirectionalLightProcessor";
import PointLightProcessor from "./processor/PointLightProcessor";
import SpotLightProcessor from "./processor/SpotLightProcessor";

export interface LightCompilerTarget
  extends ObjectCompilerTarget<LightConfigAllType> {}

export class LightCompiler extends ObjectCompiler<
  LightConfigAllType,
  LightCompilerTarget,
  Light
> {
  MODULE: MODULETYPE = MODULETYPE.LIGHT;

  constructor() {
    super();
  }
}

Compiler.processor(AmbientLightProcessor);
Compiler.processor(DirectionalLightProcessor);
Compiler.processor(PointLightProcessor);
Compiler.processor(SpotLightProcessor);
