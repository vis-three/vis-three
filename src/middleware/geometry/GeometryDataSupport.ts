import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { GeometryCompiler, GeometryCompilerTarget } from "./GeometryCompiler";
import { GeometryRule } from "./GeometryRule";

export class GeometryDataSupport extends DataSupport<
  GeometryCompilerTarget,
  GeometryCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.GEOMETRY;

  constructor(data?: GeometryCompilerTarget, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(GeometryRule, data, ignore);
  }
}
