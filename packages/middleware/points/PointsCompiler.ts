import { Points } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../../core/middleware/MODULETYPE";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import { PointsConfig } from "./PointsConfig";
import PointsProcessor from "./PointsProcessor";

export class PointsCompiler extends SolidObjectCompiler<PointsConfig, Points> {
  MODULE: MODULETYPE = MODULETYPE.POINTS;

  constructor() {
    super();
  }
}

Compiler.processor(PointsProcessor);
