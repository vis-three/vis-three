import { Points } from "three";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import { PointsConfig } from "./PointsConfig";

export class PointsCompiler extends SolidObjectCompiler<PointsConfig, Points> {
  constructor() {
    super();
  }
}
