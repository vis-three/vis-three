import { Line } from "three";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import { LineConfig } from "./LineConfig";

export class LineCompiler extends SolidObjectCompiler<LineConfig, Line> {
  constructor() {
    super();
  }
}
