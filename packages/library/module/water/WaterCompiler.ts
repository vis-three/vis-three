import { DeepWaterConfig } from "./WaterConfig";
import { Object3D } from "three";
import { ObjectCompiler } from "@vis-three/module-object";

export class WaterCompiler extends ObjectCompiler<DeepWaterConfig, Object3D> {
  constructor() {
    super();
  }
}
