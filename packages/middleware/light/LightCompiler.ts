import { AmbientLight, Light } from "three";
import { LightConfigAllType } from "./LightConfig";
import { ObjectCompiler } from "../object/ObjectCompiler";

export class LightCompiler extends ObjectCompiler<
  LightConfigAllType,
  Light | AmbientLight
> {
  constructor() {
    super();
  }
}
