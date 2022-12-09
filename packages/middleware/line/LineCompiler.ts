import { Line } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../../core/middleware/MODULETYPE";
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
