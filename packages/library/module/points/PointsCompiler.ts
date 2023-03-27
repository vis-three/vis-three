import { SolidObjectCompiler } from "@vis-three/module-solid-object";
import { Points } from "three";
import { PointsConfig } from "./PointsConfig";

export class PointsCompiler extends SolidObjectCompiler<PointsConfig, Points> {
  constructor() {
    super();
  }
}
