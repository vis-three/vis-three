import { Compiler } from "../module";
import { Line } from "three";
import { MODULETYPE } from "../constants";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import { LineConfig } from "./LineConfig";
import LineProcessor from "./LineProcessor";

export class LineCompiler extends SolidObjectCompiler<LineConfig, Line> {
  MODULE: MODULETYPE = MODULETYPE.LINE;

  constructor() {
    super();
  }
}

Compiler.processor(LineProcessor);
