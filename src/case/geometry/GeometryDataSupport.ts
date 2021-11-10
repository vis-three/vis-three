import { DataSupport } from "../../middleware/DataSupport";
import { GeometryCompiler, GeometryCompilerTarget } from "./GeometryCompiler";
import { GeometryRule } from "./GeometryRule";

export class GeometryDataSupport extends DataSupport<GeometryCompilerTarget, GeometryCompiler> {
  constructor (data: GeometryCompilerTarget) {
    super(GeometryRule, data)
  }
}