import { Line } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  SolidObjectCompiler,
  SolidObjectCompilerTarget,
} from "../solidObject/SolidObjectCompiler";
import { LineConfig } from "./LineConfig";
import LineProcessor from "./LineProcessor";

export interface LineCompilerTarget
  extends SolidObjectCompilerTarget<LineConfig> {}

export class LineCompiler extends SolidObjectCompiler<
  LineConfig,
  LineCompilerTarget,
  Line
> {
  MODULE: MODULETYPE = MODULETYPE.LINE;

  constructor() {
    super();
  }
}

Compiler.processor(LineProcessor);
