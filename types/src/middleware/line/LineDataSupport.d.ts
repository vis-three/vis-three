import { Line } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/DataContainer";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { LineCompiler } from "./LineCompiler";
import { LineConfig } from "./LineConfig";
export declare class LineDataSupport extends SolidObjectDataSupport<
  LineConfig,
  Line,
  LineCompiler
> {
  MODULE: MODULETYPE;
  constructor(data?: CompilerTarget<LineConfig>, ignore?: IgnoreAttribute);
}
