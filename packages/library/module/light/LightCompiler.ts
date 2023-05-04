import { ObjectCompiler } from "@vis-three/module-object";
import { Light } from "three";
import { LightConfigAllType } from "./LightConfig";

export class LightCompiler extends ObjectCompiler<LightConfigAllType, Light> {
  constructor() {
    super();
  }
}
