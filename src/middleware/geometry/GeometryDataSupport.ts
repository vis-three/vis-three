import { BufferGeometry } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { GeometryCompiler } from "./GeometryCompiler";
import { GeometryAllType } from "./GeometryInterface";
import { GeometryRule } from "./GeometryRule";

export class GeometryDataSupport extends DataSupport<
  GeometryAllType,
  BufferGeometry,
  GeometryCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.GEOMETRY;

  constructor(
    data?: CompilerTarget<GeometryAllType>,
    ignore?: IgnoreAttribute
  ) {
    !data && (data = {});
    super(GeometryRule, data, ignore);
  }
}
