import { Light } from "three";
import { LightConfigAllType } from "./LightConfig";
import { ObjectCompiler } from "../object/ObjectCompiler";
import AmbientLightProcessor from "./processor/AmbientLightProcessor";
import DirectionalLightProcessor from "./processor/DirectionalLightProcessor";
import PointLightProcessor from "./processor/PointLightProcessor";
import SpotLightProcessor from "./processor/SpotLightProcessor";
import HemisphereLightProcessor from "./processor/HemisphereLightProcessor";
import RectAreaLightProcessor from "./processor/RectAreaLightProcessor";
import { MODULETYPE } from "../constants";
import { Compiler } from "../module";

export class LightCompiler extends ObjectCompiler<LightConfigAllType, Light> {
  MODULE: MODULETYPE = MODULETYPE.LIGHT;

  constructor() {
    super();
  }
}

Compiler.processor(AmbientLightProcessor);
Compiler.processor(DirectionalLightProcessor);
Compiler.processor(PointLightProcessor);
Compiler.processor(SpotLightProcessor);
Compiler.processor(HemisphereLightProcessor);
Compiler.processor(RectAreaLightProcessor);
