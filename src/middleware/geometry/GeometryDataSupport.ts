import { DataSupport } from "../../core/DataSupport";
import { GeometryCompiler, GeometryCompilerTarget } from "./GeometryCompiler";
import { GeometryRule } from "./GeometryRule";

export class GeometryDataSupport extends DataSupport<GeometryCompilerTarget, GeometryCompiler> {
  constructor (data?: GeometryCompilerTarget) {
    !data && (data = {})
    super(GeometryRule, data)
  }
}