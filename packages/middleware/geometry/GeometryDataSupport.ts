import { BufferGeometry } from "three";
import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../../core/middleware/MODULETYPE";
import { GeometryCompiler } from "./GeometryCompiler";
import { GeometryAllType } from "./GeometryInterface";
import { GeometryRule } from "./GeometryRule";

export class GeometryDataSupport extends DataSupport<
  GeometryAllType,
  BufferGeometry,
  GeometryCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.GEOMETRY;

  constructor(data: Array<GeometryAllType> = []) {
    super(GeometryRule, data);
  }
}
