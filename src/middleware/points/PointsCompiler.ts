import { Points } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  SolidObjectCompiler,
  SolidObjectCompilerTarget,
} from "../solidObject/SolidObjectCompiler";
import { PointsConfig } from "./PointsConfig";
import PointsProcessor from "./PointsProcessor";

export interface PointsCompilerTarget
  extends SolidObjectCompilerTarget<PointsConfig> {}

export class PointsCompiler extends SolidObjectCompiler<
  PointsConfig,
  PointsCompilerTarget,
  Points
> {
  MODULE: MODULETYPE = MODULETYPE.POINTS;

  constructor() {
    super();
  }
}

Compiler.processor(PointsProcessor);
