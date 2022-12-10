import { Compiler } from "@vis-three/core";
import { Points } from "three";
import { MODULETYPE } from "../constants";
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
